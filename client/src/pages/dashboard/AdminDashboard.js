import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  LocalHospital as LocalHospitalIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Tab Panel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    revenue: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemStatus, setSystemStatus] = useState({});
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockStats = {
        totalPatients: 1247,
        totalDoctors: 48,
        totalAppointments: 324,
        pendingAppointments: 23,
        revenue: 45280
      };
      
      const mockActivity = [
        { id: 1, action: 'New patient registered', user: 'John Doe', time: '2 min ago', type: 'success' },
        { id: 2, action: 'Appointment booked', user: 'Sarah Wilson', time: '5 min ago', type: 'info' },
        { id: 3, action: 'Doctor added', user: 'Dr. Mike Johnson', time: '10 min ago', type: 'success' },
        { id: 4, action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'warning' }
      ];
      
      const mockSystemStatus = {
        database: { status: 'online', message: 'All systems operational' },
        api: { status: 'online', message: 'Response time 120ms' },
        email: { status: 'online', message: 'SMTP server connected' },
        storage: { status: 'warning', message: '85% storage used' }
      };

      setStats(mockStats);
      setRecentActivity(mockActivity);
      setSystemStatus(mockSystemStatus);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const StatCard = ({ title, value, icon, change, changeType, subtitle }) => (
    <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
            {change && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {changeType === 'increase' ? (
                  <ArrowUpIcon sx={{ color: 'success.main', fontSize: 16 }} />
                ) : (
                  <ArrowDownIcon sx={{ color: 'error.main', fontSize: 16 }} />
                )}
                <Typography
                  variant="body2"
                  sx={{ 
                    color: changeType === 'increase' ? 'success.main' : 'error.main',
                    ml: 0.5 
                  }}
                >
                  {change}% from last month
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: 'primary.light',
              borderRadius: '50%',
              p: 2,
              color: 'white'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const QuickActions = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DashboardIcon /> Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PeopleIcon />}
              onClick={() => navigate('/admin-users')}
            >
              Manage Users
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<CalendarIcon />}
              onClick={() => navigate('/admin-appointments')}
            >
              View Appointments
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<LocalHospitalIcon />}
              onClick={() => navigate('/admin-departments')}
            >
              Departments
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AnalyticsIcon />}
              onClick={() => navigate('/admin-analytics')}
            >
              Analytics
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const RecentActivityList = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <List>
          {recentActivity.map((activity) => (
            <ListItem key={activity.id} divider>
              <ListItemIcon>
                {activity.type === 'success' ? (
                  <CheckCircleIcon color="success" />
                ) : activity.type === 'warning' ? (
                  <WarningIcon color="warning" />
                ) : (
                  <ScheduleIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={activity.action}
                secondary={`By ${activity.user} • ${activity.time}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const SystemStatusCard = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          System Status
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.entries(systemStatus).map(([key, status]) => (
            <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                {key}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  label={status.status} 
                  color={status.status === 'online' ? 'success' : 'warning'}
                  size="small" 
                />
                <Typography variant="body2" color="textSecondary">
                  {status.message}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <LocalHospitalIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Admin Dashboard
          </Typography>
          
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          
          <IconButton color="inherit">
            <AccountIcon />
          </IconButton>
          
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Welcome back, {user?.firstName || 'Admin'}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening at GraceCare Hospital today.
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Patients"
              value={stats.totalPatients.toLocaleString()}
              icon={<PeopleIcon />}
              change="12"
              changeType="increase"
              subtitle="Active patients"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Doctors"
              value={stats.totalDoctors}
              icon={<LocalHospitalIcon />}
              change="5"
              changeType="increase"
              subtitle="Medical staff"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Today's Appointments"
              value={stats.totalAppointments}
              icon={<CalendarIcon />}
              change="8"
              changeType="increase"
              subtitle="Scheduled visits"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Monthly Revenue"
              value={`$${stats.revenue.toLocaleString()}`}
              icon={<AnalyticsIcon />}
              change="15"
              changeType="increase"
              subtitle="This month"
            />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <QuickActions />

        {/* Dashboard Content */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <RecentActivityList />
          </Grid>
          <Grid item xs={12} md={4}>
            <SystemStatusCard />
          </Grid>
        </Grid>

        {/* Pending Actions */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Pending Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                  <Typography variant="h4" color="warning.dark">5</Typography>
                  <Typography variant="body2">Doctor Approvals</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                  <Typography variant="h4" color="info.dark">12</Typography>
                  <Typography variant="body2">Patient Reviews</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                  <Typography variant="h4" color="success.dark">23</Typography>
                  <Typography variant="body2">New Appointments</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'error.light', borderRadius: 2 }}>
                  <Typography variant="h4" color="error.dark">3</Typography>
                  <Typography variant="body2">System Alerts</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;