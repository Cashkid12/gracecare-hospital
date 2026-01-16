import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  PhotoCamera,
  Save,
  Lock
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';

const DoctorSettings = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialization: user?.specialization || '',
    licenseNumber: user?.licenseNumber || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    labResultAlerts: true
  });

  const handleProfileUpdate = () => {
    console.log('Updating profile:', profileData);
  };

  const handlePasswordUpdate = () => {
    console.log('Updating password');
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
        <Grid item xs={12} lg={8}>
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Profile Information
              </Typography>

              {/* Profile Photo */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Avatar
                  src="/doctoricon.jpg"
                  sx={{ width: 100, height: 100 }}
                />
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    component="label"
                    sx={{
                      borderRadius: 2,
                      borderColor: 'primary.main',
                      color: 'primary.main'
                    }}
                  >
                    Change Photo
                    <input type="file" hidden accept="image/*" />
                  </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    JPG, PNG or GIF, max 5MB
                  </Typography>
                </Box>
              </Box>

              {/* Profile Form */}
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Specialization"
                    value={profileData.specialization}
                    onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="License Number"
                    value={profileData.licenseNumber}
                    onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleProfileUpdate}
                sx={{
                  mt: 3,
                  background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
                  }
                }}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Password Settings */}
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Lock /> Password & Security
              </Typography>

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

              <Button
                variant="contained"
                onClick={handlePasswordUpdate}
                sx={{
                  mt: 3,
                  background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
                  }
                }}
              >
                Update Password
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Preferences */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Notification Preferences
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.emailNotifications}
                      onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                />
                <Divider />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.smsNotifications}
                      onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                      color="primary"
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
                      color="primary"
                    />
                  }
                  label="Appointment Reminders"
                />
                <Divider />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.labResultAlerts}
                      onChange={(e) => setNotifications({ ...notifications, labResultAlerts: e.target.checked })}
                      color="primary"
                    />
                  }
                  label="Lab Result Alerts"
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                Theme Preferences
              </Typography>

              <FormControl fullWidth>
                <InputLabel>Theme Mode</InputLabel>
                <Select defaultValue="light" label="Theme Mode">
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="auto">Auto</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorSettings;
