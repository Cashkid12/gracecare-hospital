import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Switch,
  FormControlLabel,
  Divider,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  PhotoCamera,
  Lock,
  Notifications,
  Palette,
  Person,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';

const PatientSettings = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    labResultsAlerts: true,
    prescriptionReminders: true,
    messageNotifications: true
  });

  const [themePreferences, setThemePreferences] = useState({
    mode: 'light',
    language: 'en'
  });

  const handleProfileUpdate = () => {
    console.log('Updating profile:', profileData);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Changing password');
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Uploading photo:', file.name);
      }
    };
    input.click();
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account settings and preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Profile Settings
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar
                  src="/sickicon.jpg"
                  sx={{ width: 80, height: 80, mr: 3 }}
                />
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    component="label"
                    onClick={handlePhotoUpload}
                  >
                    Change Photo
                  </Button>
                  <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                    JPG, PNG. Max size 2MB
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={profileData.gender}
                      label="Gender"
                      onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleProfileUpdate}
                  sx={{
                    background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
                    }
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Lock sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Security Settings
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Current Password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable Two-Factor Authentication (2FA)"
                />
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handlePasswordChange}
                  sx={{
                    background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
                    }
                  }}
                >
                  Change Password
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Preferences */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Notifications sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Notification Preferences
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.emailNotifications}
                      onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.smsNotifications}
                      onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                    />
                  }
                  label="SMS Notifications"
                />
                <Divider />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.appointmentReminders}
                      onChange={(e) => setNotifications({ ...notifications, appointmentReminders: e.target.checked })}
                    />
                  }
                  label="Appointment Reminders"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.labResultsAlerts}
                      onChange={(e) => setNotifications({ ...notifications, labResultsAlerts: e.target.checked })}
                    />
                  }
                  label="Lab Results Alerts"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.prescriptionReminders}
                      onChange={(e) => setNotifications({ ...notifications, prescriptionReminders: e.target.checked })}
                    />
                  }
                  label="Prescription Reminders"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.messageNotifications}
                      onChange={(e) => setNotifications({ ...notifications, messageNotifications: e.target.checked })}
                    />
                  }
                  label="Message Notifications"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Theme Preferences */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Palette sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Theme & UI Preferences
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Theme Mode</InputLabel>
                    <Select
                      value={themePreferences.mode}
                      label="Theme Mode"
                      onChange={(e) => setThemePreferences({ ...themePreferences, mode: e.target.value })}
                    >
                      <MenuItem value="light">Light Mode</MenuItem>
                      <MenuItem value="dark">Dark Mode</MenuItem>
                      <MenuItem value="auto">Auto (System)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={themePreferences.language}
                      label="Language"
                      onChange={(e) => setThemePreferences({ ...themePreferences, language: e.target.value })}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientSettings;
