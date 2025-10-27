import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Person,
  Assignment,
  CheckCircle,
  LocalHospital,
  MedicalServices
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const steps = ['Account Type', 'Account Information', 'Personal Details', 'Confirmation'];

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Role selection
    role: 'patient',
    
    // Account Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Professional Details (Doctor specific)
    specialization: '',
    licenseNumber: '',
    experience: '',
    department: '',
    consultationFee: '',
    
    // Personal Details (Both patient and doctor)
    address: '',
    dateOfBirth: '',
    
    // Patient specific fields
    bloodType: '',
    allergies: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    insuranceProvider: '',
    insuranceNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const departments = [
    'Cardiology',
    'Pediatrics',
    'Dental Care',
    'Neurology',
    'Orthopedics',
    'Emergency Medicine',
    'General Medicine',
    'Dermatology',
    'Ophthalmology',
    'Psychiatry'
  ];

  const specializations = [
    'Cardiologist',
    'Pediatrician',
    'Dentist',
    'Neurologist',
    'Orthopedic Surgeon',
    'Emergency Medicine Specialist',
    'General Practitioner',
    'Dermatologist',
    'Ophthalmologist',
    'Psychiatrist',
    'Surgeon',
    'Gynecologist',
    'Oncologist'
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleNext = () => {
    setError('');

    // Validation for each step
    if (activeStep === 0) {
      if (!formData.role) {
        setError('Please select an account type');
        return;
      }
    }

    if (activeStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all account information fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
    }

    if (activeStep === 2 && formData.role === 'doctor') {
      if (!formData.specialization || !formData.licenseNumber || !formData.experience || !formData.department) {
        setError('Please fill in all professional details');
        return;
      }
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

    try {
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
      };

      // Add role-specific fields
      if (formData.role === 'doctor') {
        registrationData.specialization = formData.specialization;
        registrationData.licenseNumber = formData.licenseNumber;
        registrationData.experience = formData.experience;
        registrationData.department = formData.department;
        registrationData.consultationFee = formData.consultationFee || 50;
      } else {
        // Patient specific fields
        registrationData.bloodType = formData.bloodType;
        registrationData.allergies = formData.allergies;
        registrationData.emergencyContact = {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone
        };
        registrationData.insuranceProvider = formData.insuranceProvider;
        registrationData.insuranceNumber = formData.insuranceNumber;
      }

      await register(registrationData);
      
      // Redirect based on role
      if (formData.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
      
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
              Choose Your Account Type
            </Typography>
            
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                sx={{ gap: 2 }}
              >
                <Card 
                  variant={formData.role === 'patient' ? 'outlined' : 'elevation'}
                  sx={{ 
                    p: isMobile ? 2 : 3, 
                    border: formData.role === 'patient' ? 2 : 1,
                    borderColor: formData.role === 'patient' ? 'primary.main' : 'divider',
                    backgroundColor: formData.role === 'patient' ? 'primary.50' : 'background.paper',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.50'
                    }
                  }}
                  onClick={() => setFormData({...formData, role: 'patient'})}
                >
                  <FormControlLabel 
                    value="patient" 
                    control={<Radio />} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                        <Person sx={{ fontSize: isMobile ? 30 : 40, color: 'primary.main' }} />
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant={isMobile ? "body1" : "h6"} sx={{ fontWeight: 'bold' }}>
                            Patient Account
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Book appointments, view medical records, and manage your healthcare
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{ width: '100%', m: 0 }}
                  />
                </Card>

                <Card 
                  variant={formData.role === 'doctor' ? 'outlined' : 'elevation'}
                  sx={{ 
                    p: isMobile ? 2 : 3, 
                    border: formData.role === 'doctor' ? 2 : 1,
                    borderColor: formData.role === 'doctor' ? 'primary.main' : 'divider',
                    backgroundColor: formData.role === 'doctor' ? 'primary.50' : 'background.paper',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.50'
                    }
                  }}
                  onClick={() => setFormData({...formData, role: 'doctor'})}
                >
                  <FormControlLabel 
                    value="doctor" 
                    control={<Radio />} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                        <LocalHospital sx={{ fontSize: isMobile ? 30 : 40, color: 'primary.main' }} />
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant={isMobile ? "body1" : "h6"} sx={{ fontWeight: 'bold' }}>
                            Doctor Account
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Manage appointments, view patients, and provide medical care
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{ width: '100%', m: 0 }}
                  />
                </Card>
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Grid container spacing={isMobile ? 2 : 3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="password"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
          </Grid>
        );

      case 2:
        if (formData.role === 'doctor') {
          return (
            <Grid container spacing={isMobile ? 2 : 3}>
              <Grid item xs={12}>
                <Typography variant={isMobile ? "body1" : "h6"} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalHospital color="primary" />
                  Professional Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
                  <InputLabel>Specialization</InputLabel>
                  <Select
                    value={formData.specialization}
                    label="Specialization"
                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                  >
                    {specializations.map((spec) => (
                      <MenuItem key={spec} value={spec}>{spec}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={formData.department}
                    label="Department"
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Medical License Number"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                  placeholder="e.g., MED123456"
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Years of Experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  inputProps={{ min: 0, max: 50 }}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Consultation Fee ($)"
                  value={formData.consultationFee}
                  onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
                  placeholder="50"
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={isMobile ? 2 : 3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
            </Grid>
          );
        } else {
          return (
            <Grid container spacing={isMobile ? 2 : 3}>
              <Grid item xs={12}>
                <Typography variant={isMobile ? "body1" : "h6"} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MedicalServices color="primary" />
                  Patient Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                  <InputLabel>Blood Type</InputLabel>
                  <Select
                    value={formData.bloodType}
                    label="Blood Type"
                    onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                  >
                    {bloodTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={isMobile ? 2 : 3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Allergies (if any)"
                  multiline
                  rows={isMobile ? 2 : 3}
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  placeholder="List any allergies separated by commas"
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant={isMobile ? "body1" : "h6"} gutterBottom sx={{ mt: 2 }}>
                  Emergency Contact
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Emergency Contact Name"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Emergency Contact Phone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant={isMobile ? "body1" : "h6"} gutterBottom sx={{ mt: 2 }}>
                  Insurance Information (Optional)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Insurance Provider"
                  value={formData.insuranceProvider}
                  onChange={(e) => setFormData({...formData, insuranceProvider: e.target.value})}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Insurance Number"
                  value={formData.insuranceNumber}
                  onChange={(e) => setFormData({...formData, insuranceNumber: e.target.value})}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
            </Grid>
          );
        }

      case 3:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              {formData.role === 'doctor' 
                ? 'For doctor registration, please provide: specialization, licenseNumber, experience, department'
                : 'Please review your patient information before completing registration'
              }
            </Alert>
            
            <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ fontWeight: 'bold' }}>
              Ready to Join GraceCare Hospital!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Please review your information and click "Complete Registration" to create your account.
            </Typography>

            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant={isMobile ? "body1" : "h6"} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Assignment color="primary" />
                  Account Summary
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Name</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {formData.firstName} {formData.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {formData.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Role</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                      {formData.role === 'doctor' ? 'Doctor' : 'Patient'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {formData.phone || 'Not provided'}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {formData.role === 'doctor' ? (
                  <>
                    <Typography variant={isMobile ? "body1" : "h6"} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                      <LocalHospital color="primary" />
                      Professional Information
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Specialization</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {formData.specialization}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Department</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {formData.department}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">License Number</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {formData.licenseNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Experience</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {formData.experience} years
                        </Typography>
                      </Grid>
                      {formData.consultationFee && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">Consultation Fee</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            ${formData.consultationFee}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Typography variant={isMobile ? "body1" : "h6"} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                      <MedicalServices color="primary" />
                      Patient Information
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {formData.bloodType && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">Blood Type</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {formData.bloodType}
                          </Typography>
                        </Grid>
                      )}
                      {formData.allergies && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">Allergies</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {formData.allergies}
                          </Typography>
                        </Grid>
                      )}
                      {formData.emergencyContactName && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">Emergency Contact</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {formData.emergencyContactName} ({formData.emergencyContactPhone})
                          </Typography>
                        </Grid>
                      )}
                      {formData.insuranceProvider && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">Insurance</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {formData.insuranceProvider} - {formData.insuranceNumber}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ py: isMobile ? 2 : 4 }}>
      <Paper elevation={isMobile ? 1 : 3} sx={{ p: isMobile ? 2 : { xs: 3, md: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <LocalHospital sx={{ fontSize: isMobile ? 48 : 64, color: 'primary.main', mb: 2 }} />
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
            Join our healthcare community
          </Typography>
          <Typography variant={isMobile ? "body1" : "h6"} color="text.secondary">
            in {steps.length} simple steps
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 6 }} orientation={isMobile ? "vertical" : "horizontal"}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                {index === 0 && <Person sx={{ mr: 1 }} />}
                {index === 1 && <Assignment sx={{ mr: 1 }} />}
                {index === 2 && formData.role === 'doctor' ? <LocalHospital sx={{ mr: 1 }} /> : <MedicalServices sx={{ mr: 1 }} />}
                {index === 3 && <CheckCircle sx={{ mr: 1 }} />}
                {isMobile ? label.split(' ')[0] : label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form">
          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 0 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0 || loading}
              sx={{ 
                visibility: activeStep === 0 ? 'hidden' : 'visible',
                width: isMobile ? '100%' : 'auto'
              }}
              size={isMobile ? "large" : "medium"}
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={<CheckCircle />}
                sx={{ 
                  px: 4,
                  width: isMobile ? '100%' : 'auto'
                }}
                size={isMobile ? "large" : "medium"}
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ 
                  px: 4,
                  width: isMobile ? '100%' : 'auto'
                }}
                size={isMobile ? "large" : "medium"}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
