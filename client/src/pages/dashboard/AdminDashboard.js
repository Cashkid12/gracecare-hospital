import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useMediaQuery,
  useTheme,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as LocalHospitalIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  Assignment as RecordsIcon,
  Person as PatientIcon,
  Medication as RxIcon,
  Payments as BillingIcon,
  Web as ContentIcon,
  Message as MessageIcon,
  Group as DoctorIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 280;

const AdminDashboard = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin-dashboard' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/admin-users' },
    { text: 'Doctors', icon: <DoctorIcon />, path: '/admin-doctors' },
    { text: 'Patients', icon: <PatientIcon />, path: '/admin-patients' },
    { text: 'Appointments', icon: <CalendarIcon />, path: '/admin-appointments' },
    { text: 'Departments', icon: <LocalHospitalIcon />, path: '/admin-departments' },
    { text: 'Medical Records', icon: <RecordsIcon />, path: '/admin-medical-records' },
    { text: 'Prescriptions', icon: <RxIcon />, path: '/admin-prescriptions' },
    { text: 'Payments & Billing', icon: <BillingIcon />, path: '/admin-payments' },
    { text: 'Content Management', icon: <ContentIcon />, path: '/admin-content' },
    { text: 'Messages', icon: <MessageIcon />, path: '/admin-messages' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin-analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin-settings' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)', color: 'white' }}>
        <LocalHospitalIcon sx={{ fontSize: 32 }} />
        <Typography variant="h6" fontWeight="700" sx={{ letterSpacing: 0.5 }}>
          Admin Panel
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              borderRadius: 2,
              mb: 1,
              backgroundColor: location.pathname === item.path ? 'rgba(20, 184, 166, 0.08)' : 'transparent',
              color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(20, 184, 166, 0.04)',
                color: 'primary.main',
                '& .MuiListItemIcon-root': { color: 'primary.main' }
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? 'primary.main' : 'inherit',
              minWidth: 45 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: location.pathname === item.path ? 600 : 500,
                fontSize: '0.95rem'
              }} 
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: 'error.main',
            '&:hover': { backgroundColor: '#FEF2F2' }
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 45 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600 }} />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" fontWeight="600" color="text.primary">
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box 
              onClick={handleProfileMenuOpen}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5, 
                cursor: 'pointer',
                p: 0.5,
                borderRadius: 2,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
              }}
            >
              <Avatar sx={{ width: 35, height: 35, bgcolor: 'primary.main', fontSize: '1rem' }}>
                {user?.firstName?.charAt(0) || 'A'}
              </Avatar>
              {!isMobile && (
                <Box>
                  <Typography variant="subtitle2" fontWeight="600" lineHeight="1.2">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Hospital Admin
                  </Typography>
                </Box>
              )}
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 3,
                sx: { mt: 1.5, minWidth: 180, borderRadius: 2 }
              }}
            >
              <MenuItem onClick={() => { navigate('/admin-profile'); handleMenuClose(); }}>
                <ListItemIcon><AccountIcon fontSize="small" /></ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={() => { navigate('/admin-settings'); handleMenuClose(); }}>
                <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none', boxShadow: '1px 0 10px rgba(0,0,0,0.02)' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px'
        }}
      >
        <Container maxWidth="xl" sx={{ p: 0 }}>
          {children || <DefaultAdminContent />}
        </Container>
      </Box>
    </Box>
  );
};

// Moved original dashboard content here
const DefaultAdminContent = () => {
  const { user } = useAuth();
  
  const stats = {
    totalPatients: 1247,
    totalDoctors: 48,
    totalAppointments: 324,
    todayAppointments: 23,
    revenue: 45280
  };

  const recentActivity = [
    { id: 1, action: 'New patient registered', user: 'John Doe', time: '2 min ago', type: 'success' },
    { id: 2, action: 'Appointment booked', user: 'Sarah Wilson', time: '5 min ago', type: 'info' },
    { id: 3, action: 'Doctor added', user: 'Dr. Mike Johnson', time: '10 min ago', type: 'success' },
    { id: 4, action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'warning' }
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="700" color="secondary.main" gutterBottom>
            Welcome back, {user?.firstName || 'Admin'}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening at GraceCare Hospital today.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" startIcon={<MessageIcon />}>
            Broadcast
          </Button>
          <Button variant="outlined" color="primary" startIcon={<SettingsIcon />}>
            Quick Setup
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Total Patients', value: stats.totalPatients, icon: <PatientIcon />, color: '#14B8A6' },
          { title: 'Total Doctors', value: stats.totalDoctors, icon: <DoctorIcon />, color: '#06B6D4' },
          { title: 'Total Appointments', value: stats.totalAppointments, icon: <CalendarIcon />, color: '#6366F1' },
          { title: 'Today\'s Appointments', value: stats.todayAppointments, icon: <CalendarIcon />, color: '#8B5CF6' },
          { title: 'Monthly Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: <BillingIcon />, color: '#F59E0B' }
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
            <Card sx={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ textTransform: 'uppercase' }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="700">
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 4, mb: 3 }}>
            <Typography variant="h6" fontWeight="700" gutterBottom>Recent Activity</Typography>
            <List>
              {recentActivity.map((activity) => (
                <ListItem key={activity.id} divider sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: `${activity.type}.light`, color: `${activity.type}.main` }}>
                      {activity.type === 'success' ? '✓' : activity.type === 'warning' ? '!' : 'i'}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={activity.action} 
                    secondary={`${activity.user} • ${activity.time}`} 
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="700" gutterBottom color="error.main">System Alerts & Notifications</Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { severity: 'warning', message: 'Hospital storage reaching capacity (85%)', time: '1 hour ago' },
                { severity: 'error', message: 'Failed database connection attempt from unauthorized IP', time: '3 hours ago' },
                { severity: 'info', message: 'New system-wide update available', time: '5 hours ago' }
              ].map((alert, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2, p: 2, borderRadius: 2, bgcolor: `${alert.severity === 'error' ? '#FEF2F2' : alert.severity === 'warning' ? '#FFFBEB' : '#F0F9FF'}` }}>
                  <Box sx={{ color: `${alert.severity}.main`, mt: 0.5 }}>
                    <NotificationsIcon fontSize="small" />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="600">{alert.message}</Typography>
                    <Typography variant="caption" color="text.secondary">{alert.time}</Typography>
                  </Box>
                  <Button size="small" color={alert.severity}>View</Button>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, bgcolor: 'primary.main', color: 'white', mb: 3 }}>
            <Typography variant="h6" fontWeight="700" gutterBottom>System Health</Typography>
            <Box sx={{ mt: 2 }}>
              {['Database', 'API Server', 'Auth Service', 'Storage', 'Email SMTP'].map((service) => (
                <Box key={service} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">{service}</Typography>
                  <Badge color="success" variant="dot" sx={{ '& .MuiBadge-badge': { width: 10, height: 10, borderRadius: '50%' } }}>
                    <Typography variant="caption">Online</Typography>
                  </Badge>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="700" gutterBottom>Hospital Summary</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Active Doctors</Typography>
                <Typography variant="body2" fontWeight="600">42/48</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Bed Occupancy</Typography>
                <Typography variant="body2" fontWeight="600">78%</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Pending Approvals</Typography>
                <Typography variant="body2" fontWeight="600" color="warning.main">15</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;