import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Badge,
  Drawer,
  Divider,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocalHospital,
  People,
  CalendarToday,
  AccessTime,
  MedicalServices,
  Notifications,
  Schedule,
  CheckCircle,
  Pending,
  Settings,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment,
  Science,
  Message,
  EventNote,
  TrendingUp,
  PersonAdd
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = ({ children }) => {
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [doctorStats, setDoctorStats] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerWidth = 240;

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    // Initialize with empty data - will be populated from API
    setTodayAppointments([]);
    setUpcomingAppointments([]);
    setDoctorStats({
      todayAppointments: 0,
      pendingApprovals: 0,
      patientsSeen: 0,
      upcomingProcedures: 0,
      totalAppointments: 0,
      completed: 0,
      pending: 0,
      cancellationRate: '0%',
      patientSatisfaction: '0/5'
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/doctor-dashboard' },
    { text: 'Appointments', icon: <CalendarToday />, path: '/doctor-appointments' },
    { text: 'Patients', icon: <People />, path: '/doctor-patients' },
    { text: 'Lab Results', icon: <Science />, path: '/doctor-lab-results' },
    { text: 'Prescriptions', icon: <Assignment />, path: '/doctor-prescriptions' },
    { text: 'Messages', icon: <Message />, path: '/doctor-messages' },
    { text: 'Settings', icon: <Settings />, path: '/doctor-settings' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color = 'primary' }) => (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(20, 184, 166, 0.15)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography color="text.secondary" variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const drawer = (
    <Box>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box
          component="img"
          src="/doctoricon.jpg"
          alt="Doctor"
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          GraceCare
        </Typography>
      </Box>
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                bgcolor: 'rgba(20, 184, 166, 0.08)',
              },
              ...(window.location.pathname === item.path && {
                bgcolor: 'rgba(20, 184, 166, 0.12)',
                '&:hover': {
                  bgcolor: 'rgba(20, 184, 166, 0.16)',
                }
              })
            }}
          >
            <ListItemIcon sx={{ color: window.location.pathname === item.path ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontWeight: window.location.pathname === item.path ? 600 : 400,
                color: window.location.pathname === item.path ? 'primary.main' : 'text.primary'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F9FAFB' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                bgcolor: 'white'
              }
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                borderRight: '1px solid',
                borderColor: 'divider',
                bgcolor: 'white',
                position: 'relative'
              }
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Top Bar */}
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{ 
            bgcolor: 'white',
            borderBottom: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            width: '100%'
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Dashboard
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 600 }}>
                Dr. {user?.firstName} {user?.lastName}
              </Typography>
              <IconButton>
                <Badge badgeContent={0} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton onClick={() => navigate('/doctor-settings')}>
                <Settings />
              </IconButton>
              <Avatar 
                src="/doctoricon.jpg" 
                alt={`Dr. ${user?.firstName}`}
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
          {children ? children : (
            <>
              {/* Welcome Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  Welcome back, Dr. {user?.firstName} {user?.lastName}!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Here's your schedule and patient overview for today.
                </Typography>
              </Box>

          {/* Overview Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Today's Appointments"
                value={doctorStats.todayAppointments || 0}
                subtitle="Scheduled visits"
                icon={<CalendarToday sx={{ fontSize: 28 }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Pending Approvals"
                value={doctorStats.pendingApprovals || 0}
                subtitle="Awaiting review"
                icon={<Pending sx={{ fontSize: 28 }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Patients Seen"
                value={doctorStats.patientsSeen || 0}
                subtitle="This month"
                icon={<People sx={{ fontSize: 28 }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Upcoming Procedures"
                value={doctorStats.upcomingProcedures || 0}
                subtitle="This week"
                icon={<MedicalServices sx={{ fontSize: 28 }} />}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Today's Schedule */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventNote sx={{ color: 'primary.main' }} /> Today's Schedule
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{
                        borderRadius: 2,
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': {
                          borderColor: 'primary.dark',
                          bgcolor: 'rgba(20, 184, 166, 0.08)'
                        }
                      }}
                    >
                      View All
                    </Button>
                  </Box>
                  
                  {todayAppointments.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <CalendarToday sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No appointments scheduled for today
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Your schedule is clear. Enjoy your day!
                      </Typography>
                    </Box>
                  ) : (
                    <List sx={{ p: 0 }}>
                      {todayAppointments.map((appointment, index) => (
                        <ListItem 
                          key={appointment.id}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            mb: index < todayAppointments.length - 1 ? 2 : 0,
                            transition: 'all 0.3s ease',
                            '&:hover': { 
                              bgcolor: 'rgba(20, 184, 166, 0.04)',
                              transform: 'translateX(4px)',
                              boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)'
                            }
                          }}
                        >
                          <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'primary.light', color: 'white' }}>
                              {appointment.patientName.charAt(0)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {appointment.patientName}
                                </Typography>
                                <Chip 
                                  label={appointment.status} 
                                  color={getStatusColor(appointment.status)}
                                  size="small"
                                  sx={{ fontWeight: 600 }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                                <Typography variant="body2" color="text.secondary">
                                  <AccessTime sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                                  {appointment.time}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  <MedicalServices sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                                  {appointment.type}
                                </Typography>
                              </Box>
                            }
                          />
                          <Button 
                            variant="contained" 
                            size="small"
                            sx={{
                              ml: 2,
                              background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
                              }
                            }}
                          >
                            View
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card sx={{ mt: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="outlined"
                        startIcon={<People />}
                        sx={{
                          py: 2,
                          borderRadius: 2,
                          flexDirection: 'column',
                          gap: 1,
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.dark',
                            bgcolor: 'rgba(20, 184, 166, 0.08)'
                          }
                        }}
                      >
                        Patients
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="outlined"
                        startIcon={<Schedule />}
                        sx={{
                          py: 2,
                          borderRadius: 2,
                          flexDirection: 'column',
                          gap: 1,
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.dark',
                            bgcolor: 'rgba(20, 184, 166, 0.08)'
                          }
                        }}
                      >
                        Schedule
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="outlined"
                        startIcon={<Assignment />}
                        sx={{
                          py: 2,
                          borderRadius: 2,
                          flexDirection: 'column',
                          gap: 1,
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.dark',
                            bgcolor: 'rgba(20, 184, 166, 0.08)'
                          }
                        }}
                      >
                        Records
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <Button 
                        fullWidth 
                        variant="outlined"
                        startIcon={<Message />}
                        sx={{
                          py: 2,
                          borderRadius: 2,
                          flexDirection: 'column',
                          gap: 1,
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.dark',
                            bgcolor: 'rgba(20, 184, 166, 0.08)'
                          }
                        }}
                      >
                        Messages
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Sidebar */}
            <Grid item xs={12} lg={4}>
              {/* Upcoming Appointments */}
              <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                    Upcoming Appointments
                  </Typography>
                  {upcomingAppointments.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Schedule sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        No upcoming appointments
                      </Typography>
                    </Box>
                  ) : (
                    <List dense sx={{ p: 0 }}>
                      {upcomingAppointments.map((appointment, index) => (
                        <ListItem 
                          key={appointment.id} 
                          sx={{
                            mb: index < upcomingAppointments.length - 1 ? 2 : 0,
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: 'rgba(20, 184, 166, 0.04)',
                              transform: 'translateX(4px)'
                            }
                          }}
                        >
                          <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'primary.light', width: 36, height: 36 }}>
                              {appointment.patientName.charAt(0)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {appointment.patientName}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography variant="body2" color="text.secondary">
                                  {appointment.date}, {appointment.time}
                                </Typography>
                                <Chip 
                                  label={appointment.type} 
                                  size="small" 
                                  sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }}
                                />
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>

              {/* Recent Patients */}
              <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                    Recent Patients
                  </Typography>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <People sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      No recent patients
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Performance */}
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                    This Month's Performance
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Appointment Completion
                        </Typography>
                        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                          {((doctorStats.completed / doctorStats.totalAppointments) * 100).toFixed(0) || 0}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={((doctorStats.completed / doctorStats.totalAppointments) * 100) || 0} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: 'rgba(20, 184, 166, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #14B8A6 0%, #6EE7B7 100%)'
                          }
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {doctorStats.completed > 0 ? `${doctorStats.completed} of ${doctorStats.totalAppointments} completed` : 'No completed appointments yet'}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Patient Satisfaction
                        </Typography>
                        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                          {doctorStats.patientSatisfaction}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={96} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: 'rgba(20, 184, 166, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #14B8A6 0%, #6EE7B7 100%)'
                          }
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {doctorStats.patientSatisfaction !== '0/5' ? 'Excellent rating from patients' : 'No ratings yet'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;