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
} from '@mui/material';
import { 
  LocalHospital as HospitalIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { doctorService, appointmentService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const BookAppointment = () => {
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
  const [loading, setLoading] = useState(false);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    // Filter doctors when department changes
    if (formData.department && doctors.length > 0) {
      const filtered = doctors.filter(doctor => 
        doctor.department === formData.department
      );
      setFilteredDoctors(filtered);
      
      // Auto-select first doctor if none selected
      if (!formData.doctorId && filtered.length > 0) {
        setFormData(prev => ({ ...prev, doctorId: filtered[0]._id }));
      }
    } else {
      setFilteredDoctors(doctors);
    }
  }, [formData.department, doctors]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!user) {
      setError('Please log in to book an appointment');
      setLoading(false);
      navigate('/login');
      return;
    }

    // Validation
    if (!formData.doctorId || !formData.department || !formData.appointmentDate || !formData.appointmentTime || !formData.reason) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      await appointmentService.createAppointment(formData);
      setSuccess('Appointment booked successfully! A confirmation email has been sent to your email address.');
      setFormData({
        doctorId: '',
        department: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: '',
        symptoms: '',
      });
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/patient-dashboard');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    }
    setLoading(false);
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', 
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const departments = [
    'Cardiology',
    'Pediatrics', 
    'Dental Care',
    'Neurology',
    'Orthopedics',
    'Emergency Medicine'
  ];

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <HospitalIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
            Book an Appointment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Schedule your visit with our expert medical professionals
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Department Selection */}
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

            {/* Doctor Selection */}
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
                        </Box>
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No doctors available in this department</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Date Selection */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Appointment Date"
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: today }}
                required
                InputProps={{
                  startAdornment: <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>

            {/* Time Slot Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Time Slot</InputLabel>
                <Select
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  label="Time Slot"
                  onChange={handleChange}
                  startAdornment={<TimeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                >
                  {timeSlots.map((time) => (
                    <MenuItem key={time} value={time}>{time}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Reason for Visit */}
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

            {/* Symptoms */}
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

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ 
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={24} sx={{ mr: 2 }} />
                    Booking Appointment...
                  </Box>
                ) : (
                  'Book Appointment'
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Available Doctors Preview */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
            Our Medical Team
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Meet some of our expert healthcare professionals
          </Typography>

          {doctorsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {doctors.slice(0, 3).map((doctor) => (
                <Grid item xs={12} md={4} key={doctor._id}>
                  <Card sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    }
                  }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <PersonIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Dr. {doctor.user.firstName} {doctor.user.lastName}
                      </Typography>
                      <Typography variant="body2" color="primary.main" gutterBottom>
                        {doctor.specialization}
                      </Typography>
                      <Chip 
                        label={doctor.department} 
                        size="small" 
                        color="secondary"
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {doctor.experience} years experience
                      </Typography>
                      <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                        Consultation: ${doctor.consultationFee}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default BookAppointment;