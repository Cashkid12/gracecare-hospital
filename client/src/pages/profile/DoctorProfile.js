import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
  Switch,
  FormControlLabel,
  Tab,
  Tabs
} from '@mui/material';
import {
  Person,
  CalendarToday,
  MedicalServices,
  Schedule,
  Edit,
  Save,
  LocalHospital
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const DoctorProfile = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    department: '',
    experience: '',
    licenseNumber: '',
    consultationFee: '',
    bio: ''
  });

  const [availability, setAvailability] = useState({
    Monday: { available: true, start: "09:00", end: "17:00" },
    Tuesday: { available: true, start: "09:00", end: "17:00" },
    Wednesday: { available: true, start: "09:00", end: "17:00" },
    Thursday: { available: true, start: "09:00", end: "17:00" },
    Friday: { available: true, start: "09:00", end: "17:00" },
    Saturday: { available: false, start: "09:00", end: "13:00" },
    Sunday: { available: false, start: "09:00", end: "17:00" }
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    // Mock data - replace with API call
    setProfileData({
      firstName: user?.firstName || 'Sarah',
      lastName: user?.lastName || 'Smith',
      email: user?.email || 'sarah.smith@gracecare.com',
      phone: '+1 (555) 123-4567',
      address: '123 Medical Center Drive, Healthcare City',
      specialization: 'Cardiology',
      department: 'Cardiology',
      experience: '8',
      licenseNumber: 'MED123456',
      consultationFee: '75',
      bio: 'Experienced cardiologist with 8 years of practice. Specialized in heart diseases and cardiovascular treatments.'
    });
  };

  const handleSave = async () => {
    try {
      // Save profile data - replace with API call
      console.log('Saving profile:', profileData);
      setIsEditing(false);
      // Add success notification
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleAvailabilityChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const ProfileSection = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main'
              }}
            >
              <Person sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Dr. {profileData.firstName} {profileData.lastName}
            </Typography>
            <Chip 
              label={profileData.specialization} 
              color="primary" 
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {profileData.department} Department
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profileData.experience} years experience
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Personal Information</Typography>
              <Button
                startIcon={isEditing ? <Save /> : <Edit />}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                variant={isEditing ? "contained" : "outlined"}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={profileData.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>Professional Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Specialization"
                  value={profileData.specialization}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  value={profileData.department}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="License Number"
                  value={profileData.licenseNumber}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Consultation Fee ($)"
                  value={profileData.consultationFee}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const AvailabilitySection = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Working Hours & Availability
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Set your available hours for each day of the week
        </Typography>

        <Grid container spacing={2}>
          {Object.entries(availability).map(([day, schedule]) => (
            <Grid item xs={12} key={day}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" sx={{ minWidth: 100 }}>
                    {day}
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={schedule.available}
                        onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={schedule.available ? "Available" : "Not Available"}
                  />

                  {schedule.available && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <TextField
                        label="Start Time"
                        type="time"
                        value={schedule.start}
                        onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                        size="small"
                      />
                      <Typography variant="body2">to</Typography>
                      <TextField
                        label="End Time"
                        type="time"
                        value={schedule.end}
                        onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                        size="small"
                      />
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Save Availability
          </Button>
          <Button variant="outlined">
            Reset to Default
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Doctor Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your profile information and availability
        </Typography>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<Person />} label="Profile Information" />
          <Tab icon={<Schedule />} label="Availability" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tabValue === 0 && <ProfileSection />}
          {tabValue === 1 && <AvailabilitySection />}
        </Box>
      </Paper>
    </Container>
  );
};

export default DoctorProfile;