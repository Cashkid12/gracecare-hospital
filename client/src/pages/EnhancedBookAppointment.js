import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { 
  LocalHospital as HospitalIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { doctorService, appointmentService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const steps = ['Select Doctor', 'Choose Date & Time', 'Confirm Details'];

const EnhancedBookAppointment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    doctorId: '',
    department: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    symptoms: '',
  });
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (formData.department && doctors.length > 0) {
      const filtered = doctors.filter(doctor => 
        doctor.department === formData.department
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [formData.department, doctors]);

  useEffect(() => {
    if (formData.doctorId && formData.appointmentDate) {
      fetchAvailableSlots();
    }
  }, [formData.doctorId, formData.appointmentDate]);

  const fetchDoctors = async () => {
    try {
      setDoctorsLoading(true);
      const response = await doctorService.getDoctors();
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors. Please try again.');
    } finally {
      setDoctorsLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      setSlotsLoading(true);
      // This would call the new available-slots endpoint
      // For now, we'll use mock slots
      const mockSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', 
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
      ];
      setAvailableSlots(mockSlots);
    } catch (err) {
      console.error('Error fetching available slots:', err);
      setAvailableSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update selected doctor when doctor is selected
    if (name === 'doctorId') {
      const doctor = doctors.find(d => d._id === value);
      setSelectedDoctor(doctor);
    }
  };

  const handleNext = () => {
    setError('');
    
    // Validation for each step
    if (activeStep === 0 && (!formData.doctorId || !formData.department)) {
      setError('Please select a doctor and department');
      return;
    }
    
    if (activeStep === 1 && (!formData.appointmentDate || !formData.appointmentTime)) {
      setError('Please select a date and time');
      return;
    }
    
    if (activeStep === 2 && !formData.reason) {
      setError('Please provide a reason for the appointment');
      return;
    }
    
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    if (!user) {
      setError('Please log in to book an appointment');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      await appointmentService.createAppointment(formData);
      setSuccess('Appointment booked successfully! A confirmation has been sent to your email.');
      setConfirmationOpen(true);
      
      // Reset form
      setFormData({
        doctorId: '',
        department: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: '',
        symptoms: '',
      });
      setActiveStep(0);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    navigate('/patient-dashboard');
  };

  const departments = [
    'Cardiology',
    'Pediatrics', 
    'Dental Care',
    'Neurology',
    'Orthopedics',
    'Emergency Medicine'
  ];

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3); // 3 months in advance
  const maxDateString = maxDate.toISOString().split('T')[0];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  label="Department"
                  onChange={handleChange}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required disabled={!formData.department || doctorsLoading}>
                <InputLabel>Select Doctor</InputLabel>
                <Select
                  name="doctorId"
                  value={formData.doctorId}
                  label="Select Doctor"
                  onChange={handleChange}
                >
                  {doctorsLoading ? (
                    <MenuItem disabled>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size={20} sx={{ mr: 2 }} />
                        Loading doctors...
                      </Box>
                    </MenuItem>
                  ) : filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                      <MenuItem key={doctor._id} value={doctor._id}>
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            Dr. {doctor.user.firstName} {doctor.user.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {doctor.specialization} • {doctor.experience} years exp
                          </Typography>
                          <Typography variant="body2" color="success.main">
                            ${doctor.consultationFee} consultation
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No doctors available in this department</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            {selectedDoctor && (
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Selected Doctor
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="600">
                          Dr. {selectedDoctor.user.firstName} {selectedDoctor.user.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedDoctor.specialization} • {selectedDoctor.department}
                        </Typography>
                        <Typography variant="body2">
                          Experience: {selectedDoctor.experience} years
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Appointment Date"
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 
                  min: today,
                  max: maxDateString
                }}
                required
                InputProps={{
                  startAdornment: <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Time Slot</InputLabel>
                <Select
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  label="Time Slot"
                  onChange={handleChange}
                  disabled={!formData.appointmentDate || slotsLoading}
                >
                  {slotsLoading ? (
                    <MenuItem disabled>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size={20} sx={{ mr: 2 }} />
                        Loading available slots...
                      </Box>
                    </MenuItem>
                  ) : availableSlots.length > 0 ? (
                    availableSlots.map((time) => (
                      <MenuItem key={time} value={time}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TimeIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
                          {time}
                        </Box>
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      No available slots for selected date
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            {formData.appointmentDate && formData.appointmentTime && (
              <Grid item xs={12}>
                <Alert severity="info">
                  Selected: {new Date(formData.appointmentDate).toLocaleDateString()} at {formData.appointmentTime}
                </Alert>
              </Grid>
            )}
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason for Visit"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                multiline
                rows={3}
                required
                placeholder="Please describe the reason for your appointment in detail..."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Symptoms (Optional)"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                multiline
                rows={2}
                placeholder="Describe any symptoms you're experiencing (fever, pain, etc.)..."
              />
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Appointment Summary
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography>
                      <strong>Doctor:</strong> Dr. {selectedDoctor?.user?.firstName} {selectedDoctor?.user?.lastName}
                    </Typography>
                    <Typography>
                      <strong>Department:</strong> {formData.department}
                    </Typography>
                    <Typography>
                      <strong>Date:</strong> {new Date(formData.appointmentDate).toLocaleDateString()}
                    </Typography>
                    <Typography>
                      <strong>Time:</strong> {formData.appointmentTime}
                    </Typography>
                    <Typography>
                      <strong>Consultation Fee:</strong> ${selectedDoctor?.consultationFee}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <HospitalIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
            Book an Appointment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Schedule your visit in 3 simple steps
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

        <Box component="form">
          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0 || loading}
              sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={<CheckIcon />}
                sx={{ px: 4 }}
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ px: 4 }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <CheckIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Appointment Confirmed!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your appointment has been successfully booked.
          </Typography>
          <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Dr. {selectedDoctor?.user?.firstName} {selectedDoctor?.user?.lastName}</strong>
            </Typography>
            <Typography variant="body2">
              {formData.department} • {new Date(formData.appointmentDate).toLocaleDateString()} at {formData.appointmentTime}
            </Typography>
          </Box>
          <Alert severity="info" sx={{ mt: 2 }}>
            A confirmation email has been sent to your registered email address.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button variant="contained" onClick={handleConfirmationClose} size="large">
            View Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EnhancedBookAppointment;