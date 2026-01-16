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
  Alert,
  useMediaQuery,
  useTheme,
  CircularProgress,
  IconButton,
  Badge,
  Drawer,
  Divider,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  LocalHospital,
  CalendarToday,
  AccessTime,
  MedicalServices,
  Person,
  History,
  Download,
  Add,
  Info,
  Assignment,
  Notifications,
  Settings,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Description,
  Message,
  Science
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { patientService, appointmentService } from '../../services/apiService';

const PatientDashboard = ({ children }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [patientStats, setPatientStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerWidth = 240;

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [appointmentsRes, statsRes, historyRes] = await Promise.all([
        patientService.getPatientAppointments(),
        patientService.getPatientStats(),
        patientService.getMedicalHistory()
      ]);

      setUpcomingAppointments(appointmentsRes.data || []);
      setPatientStats(statsRes.data || {});
      setMedicalHistory(historyRes.data?.medicalHistory || []);
      
    } catch (error) {
      console.error('Error fetching patient data:', error);
      // Fallback to empty data for new patients
      setUpcomingAppointments([]);
      setMedicalHistory([]);
      setPatientStats({
        totalVisits: 0,
        upcomingAppointments: 0,
        prescriptions: 0,
        nextCheckup: null
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color = 'primary' }) => (
    <Card sx={{ 
      height: '100%', 
      transition: 'all 0.3s ease', 
      '&:hover': { transform: 'translateY(-4px)' },
      border: value === 0 ? '2px dashed' : 'none',
      borderColor: 'divider'
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant={isMobile ? "body2" : "body1"}>
              {title}
            </Typography>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ 
              color: value === 0 ? 'text.secondary' : `${color}.main`, 
              fontWeight: 'bold',
              fontStyle: value === 0 ? 'italic' : 'normal'
            }}>
              {value === 0 ? 'None' : value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ color: value === 0 ? 'text.secondary' : `${color}.main` }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  // Quick Actions Handlers
  const handleMyRecords = () => {
    navigate('/medical-records');
  };

  const handleDownloadReports = () => {
    navigate('/medical-records');
  };

  const handleUpdateProfile = () => {
    navigate('/patient-profile');
  };

  const handleViewHistory = () => {
    navigate('/medical-history');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/patient-dashboard' },
    { text: 'Appointments', icon: <CalendarToday />, path: '/patient-appointments' },
    { text: 'Medical Records', icon: <Description />, path: '/patient-records' },
    { text: 'Lab Results', icon: <Science />, path: '/patient-lab-results' },
    { text: 'Prescriptions', icon: <Assignment />, path: '/patient-prescriptions' },
    { text: 'Billing', icon: <Assignment />, path: '/patient-billing' },
    { text: 'Messages', icon: <Message />, path: '/patient-messages' },
    { text: 'Settings', icon: <Settings />, path: '/patient-settings' }
  ];

  const drawer = (
    <Box>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box
          component="img"
          src="/sickicon.jpg"
          alt="Patient"
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
        {menuItems.map((item) => (
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading your dashboard...
        </Typography>
      </Box>
    );
  }

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
                {user?.firstName} {user?.lastName}
              </Typography>
              <IconButton>
                <Badge badgeContent={0} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton onClick={() => navigate('/patient-settings')}>
                <Settings />
              </IconButton>
              <Avatar 
                src="/sickicon.jpg" 
                alt={user?.firstName}
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
          {children ? children : (
            <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Welcome to GraceCare, {user?.firstName}! 👋
        </Typography>
        <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary">
          {upcomingAppointments.length === 0 
            ? "Get started by booking your first appointment"
            : "Manage your healthcare journey with us"
          }
        </Typography>
      </Box>

      {/* Welcome Alert for New Patients */}
      {upcomingAppointments.length === 0 && medicalHistory.length === 0 && (
        <Alert 
          severity="info" 
          sx={{ mb: 3 }}
          icon={<Info />}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Welcome to GraceCare Hospital! 🏥
          </Typography>
          <Typography variant="body2">
            Book your first appointment to get started with your healthcare journey. 
            Your dashboard will show appointments, medical records, and health insights here.
          </Typography>
        </Alert>
      )}

      {/* Quick Stats */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Total Visits"
            value={patientStats.totalVisits}
            subtitle="All time"
            icon={<LocalHospital />}
            color="primary"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Upcoming"
            value={patientStats.upcomingAppointments}
            subtitle="Appointments"
            icon={<CalendarToday />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Prescriptions"
            value={patientStats.prescriptions}
            subtitle="Active"
            icon={<MedicalServices />}
            color="success"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Next Checkup"
            value={patientStats.nextCheckup ? new Date(patientStats.nextCheckup).toLocaleDateString() : 'Not scheduled'}
            subtitle="Recommended"
            icon={<AccessTime />}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Upcoming Appointments */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: isMobile ? 'flex-start' : 'center', 
                mb: 2,
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 2 : 0
              }}>
                <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  mb: isMobile ? 0 : 2
                }}>
                  <CalendarToday /> Upcoming Appointments
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={() => navigate('/book-appointment')}
                  size={isMobile ? "small" : "medium"}
                  fullWidth={isMobile}
                >
                  Book First Appointment
                </Button>
              </Box>

              {upcomingAppointments.length === 0 ? (
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4,
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2
                }}>
                  <CalendarToday sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    No Appointments Scheduled
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Book your first appointment to get started with your healthcare journey
                  </Typography>
                  <Button 
                    variant="outlined" 
                    onClick={() => navigate('/book-appointment')}
                    startIcon={<Add />}
                  >
                    Book Your First Visit
                  </Button>
                </Box>
              ) : (
                <List>
                  {upcomingAppointments.map((appointment) => (
                    <ListItem 
                      key={appointment._id}
                      sx={{ 
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        mb: 1
                      }}
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <Person />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={`${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {appointment.type} • {appointment.doctor.department}
                            </Typography>
                          </Box>
                        }
                      />
                      <Chip 
                        label={appointment.status === 'scheduled' ? 'Confirmed' : appointment.status} 
                        color={appointment.status === 'scheduled' ? 'success' : 'default'} 
                        size="small" 
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assignment /> Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<MedicalServices />}
                    onClick={handleMyRecords}
                    size={isMobile ? "small" : "medium"}
                  >
                    My Records
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<Download />}
                    onClick={handleDownloadReports}
                    size={isMobile ? "small" : "medium"}
                  >
                    Download Reports
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<Person />}
                    onClick={handleUpdateProfile}
                    size={isMobile ? "small" : "medium"}
                  >
                    Update Profile
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<History />}
                    onClick={handleViewHistory}
                    size={isMobile ? "small" : "medium"}
                  >
                    View History
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Medical History */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1 
              }}>
                <History /> Medical History
              </Typography>
              
              {medicalHistory.length === 0 ? (
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4,
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2
                }}>
                  <LocalHospital sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    No Medical History
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Your medical records and visit history will appear here after your first appointment
                  </Typography>
                  <Button 
                    variant="outlined" 
                    onClick={() => navigate('/book-appointment')}
                    startIcon={<Add />}
                  >
                    Start Your Health Journey
                  </Button>
                </Box>
              ) : (
                <List>
                  {medicalHistory.slice(0, 4).map((record, index) => (
                    <ListItem key={index} divider>
                      <ListItemIcon>
                        <LocalHospital color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1">
                              {record.condition}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {new Date(record.diagnosedDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              <strong>Status:</strong> {record.status}
                            </Typography>
                            {record.notes && (
                              <Typography variant="body2">
                                <strong>Notes:</strong> {record.notes}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Health Tips for New Patients */}
          {medicalHistory.length === 0 && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Info color="primary" /> Getting Started
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24 }}>
                        1
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Book your first appointment with a specialist" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24 }}>
                        2
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Complete your medical profile for better care" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24 }}>
                        3
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="View your appointments and medical records here" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PatientDashboard;