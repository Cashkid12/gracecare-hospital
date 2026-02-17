import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import {
  Save as SaveIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Email as EmailIcon,
  Storage as StorageIcon,
  Language as LanguageIcon,
  Person as PersonIcon,
  PhotoCamera as CameraIcon
} from '@mui/icons-material';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [saved, setSaved] = useState(false);
  
  const [generalSettings, setGeneralSettings] = useState({
    hospitalName: 'GraceCare Hospital',
    email: 'admin@gracecare.com',
    phone: '+1 (555) 123-4567',
    address: '123 Healthcare Ave, Medical City, MC 12345',
    timezone: 'America/New_York',
    language: 'en'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    appointmentReminders: true,
    systemUpdates: true,
    marketingEmails: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const TabPanel = ({ children, value, index }) => (
    value === index && <Box sx={{ pt: 3 }}>{children}</Box>
  );

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="700" color="#1E293B" gutterBottom>
          System Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure system preferences, notifications, and security settings
        </Typography>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      {/* 12-Column Grid Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        {/* Profile Card - 4 columns */}
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar sx={{ width: 100, height: 100, bgcolor: '#14B8A6', fontSize: '2.5rem' }}>
                  <PersonIcon sx={{ fontSize: 50 }} />
                </Avatar>
                <Box sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: '#14B8A6', borderRadius: '50%', p: 0.5 }}>
                  <CameraIcon sx={{ fontSize: 20, color: 'white' }} />
                </Box>
              </Box>
              <Typography variant="h6" fontWeight="600" color="#1E293B">Admin User</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>System Administrator</Typography>
              <Chip label="Active" size="small" sx={{ bgcolor: '#F0FDF4', color: '#10B981', fontWeight: 500 }} />
            </CardContent>
          </Card>
        </Box>

        {/* Settings Tabs - 8 columns */}
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 8' } }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1 }}>
                <Tab icon={<SettingsIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="General" />
                <Tab icon={<NotificationsIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Notifications" />
                <Tab icon={<SecurityIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Security" />
              </Tabs>

              <Box sx={{ p: 3 }}>
                <TabPanel value={activeTab} index={0}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <TextField fullWidth label="Hospital Name" value={generalSettings.hospitalName} onChange={(e) => setGeneralSettings({ ...generalSettings, hospitalName: e.target.value })} size="small" />
                    <TextField fullWidth label="Email Address" value={generalSettings.email} onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })} size="small" />
                    <TextField fullWidth label="Phone Number" value={generalSettings.phone} onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })} size="small" />
                    <TextField fullWidth label="Address" multiline rows={2} value={generalSettings.address} onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })} size="small" />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Timezone</InputLabel>
                        <Select value={generalSettings.timezone} onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })} label="Timezone">
                          <MenuItem value="America/New_York">Eastern Time</MenuItem>
                          <MenuItem value="America/Chicago">Central Time</MenuItem>
                          <MenuItem value="America/Denver">Mountain Time</MenuItem>
                          <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth size="small">
                        <InputLabel>Language</InputLabel>
                        <Select value={generalSettings.language} onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })} label="Language">
                          <MenuItem value="en">English</MenuItem>
                          <MenuItem value="es">Spanish</MenuItem>
                          <MenuItem value="fr">French</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </TabPanel>

                <TabPanel value={activeTab} index={1}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive email notifications for important updates' },
                      { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive text messages for urgent notifications' },
                      { key: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Get notified about upcoming appointments' },
                      { key: 'systemUpdates', label: 'System Updates', desc: 'Receive notifications about system maintenance' },
                      { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional content and newsletters' }
                    ].map((item) => (
                      <Box key={item.key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                        <Box>
                          <Typography variant="body2" fontWeight="500">{item.label}</Typography>
                          <Typography variant="caption" color="text.secondary">{item.desc}</Typography>
                        </Box>
                        <Switch checked={notificationSettings[item.key]} onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })} />
                      </Box>
                    ))}
                  </Box>
                </TabPanel>

                <TabPanel value={activeTab} index={2}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#F8FAFC', borderRadius: 2 }}>
                      <Box>
                        <Typography variant="body2" fontWeight="500">Two-Factor Authentication</Typography>
                        <Typography variant="caption" color="text.secondary">Add an extra layer of security</Typography>
                      </Box>
                      <Switch checked={securitySettings.twoFactorAuth} onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })} />
                    </Box>
                    <FormControl fullWidth size="small">
                      <InputLabel>Session Timeout (minutes)</InputLabel>
                      <Select value={securitySettings.sessionTimeout} onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })} label="Session Timeout (minutes)">
                        <MenuItem value={15}>15 minutes</MenuItem>
                        <MenuItem value={30}>30 minutes</MenuItem>
                        <MenuItem value={60}>1 hour</MenuItem>
                        <MenuItem value={120}>2 hours</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                      <InputLabel>Password Expiry (days)</InputLabel>
                      <Select value={securitySettings.passwordExpiry} onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })} label="Password Expiry (days)">
                        <MenuItem value={30}>30 days</MenuItem>
                        <MenuItem value={60}>60 days</MenuItem>
                        <MenuItem value={90}>90 days</MenuItem>
                        <MenuItem value={180}>180 days</MenuItem>
                      </Select>
                    </FormControl>
                    <Button variant="outlined" color="error" sx={{ mt: 1 }}>Change Password</Button>
                  </Box>
                </TabPanel>

                <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' }, borderRadius: 2 }}>
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Quick Stats - 12 columns */}
        {[
          { icon: <StorageIcon />, label: 'Storage Used', value: '68%', color: '#3B82F6', bgColor: '#EFF6FF' },
          { icon: <EmailIcon />, label: 'Emails Sent', value: '1,234', color: '#10B981', bgColor: '#F0FDF4' },
          { icon: <LanguageIcon />, label: 'Active Users', value: '89', color: '#8B5CF6', bgColor: '#F5F3FF' },
          { icon: <PaletteIcon />, label: 'Theme', value: 'Light', color: '#F59E0B', bgColor: '#FFFBEB' }
        ].map((stat, index) => (
          <Box key={index} sx={{ gridColumn: { xs: 'span 6', md: 'span 3' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: stat.bgColor, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.cloneElement(stat.icon, { sx: { fontSize: 22 } })}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h6" fontWeight="700" color="#1E293B">
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AdminSettings;
