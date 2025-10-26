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
  LinearProgress
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
  Pending
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [doctorStats, setDoctorStats] = useState({});
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    // Mock data - replace with API calls
    const mockTodayAppointments = [
      { id: 1, patientName: 'John Doe', time: '10:00 AM', type: 'Consultation', status: 'confirmed' },
      { id: 2, patientName: 'Sarah Wilson', time: '11:30 AM', type: 'Follow-up', status: 'confirmed' },
      { id: 3, patientName: 'Mike Johnson', time: '2:00 PM', type: 'Checkup', status: 'pending' },
      { id: 4, patientName: 'Emily Davis', time: '3:30 PM', type: 'Consultation', status: 'confirmed' }
    ];

    const mockUpcomingAppointments = [
      { id: 5, patientName: 'Robert Brown', date: 'Tomorrow', time: '9:00 AM', type: 'Surgery Follow-up' },
      { id: 6, patientName: 'Lisa Anderson', date: 'Tomorrow', time: '11:00 AM', type: 'Consultation' },
      { id: 7, patientName: 'David Miller', date: 'Day after', time: '10:30 AM', type: 'Checkup' }
    ];

    const mockStats = {
      totalAppointments: 156,
      completed: 134,
      pending: 12,
      cancellationRate: '3%',
      patientSatisfaction: '4.8/5'
    };

    setTodayAppointments(mockTodayAppointments);
    setUpcomingAppointments(mockUpcomingAppointments);
    setDoctorStats(mockStats);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const StatCard = ({ title, value, subtitle, color = 'primary' }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ color: `${color}.main`, fontWeight: 'bold' }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="textSecondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Welcome, Dr. {user?.firstName} {user?.lastName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your schedule and patient overview for today.
        </Typography>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Appointments"
            value={todayAppointments.length}
            subtitle="Scheduled visits"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={doctorStats.completed}
            subtitle="This month"
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={doctorStats.pending}
            subtitle="Awaiting review"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Satisfaction"
            value={doctorStats.patientSatisfaction}
            subtitle="Patient rating"
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Today's Schedule */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday /> Today's Schedule
              </Typography>
              
              {todayAppointments.length === 0 ? (
                <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
                  No appointments scheduled for today
                </Typography>
              ) : (
                <List>
                  {todayAppointments.map((appointment) => (
                    <ListItem 
                      key={appointment.id}
                      sx={{ 
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      <ListItemIcon>
                        <AccessTime color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">
                              {appointment.patientName}
                            </Typography>
                            <Chip 
                              label={appointment.status} 
                              color={getStatusColor(appointment.status)}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Time:</strong> {appointment.time}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Type:</strong> {appointment.type}
                            </Typography>
                          </Box>
                        }
                      />
                      <Button variant="outlined" size="small">
                        View
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="contained" startIcon={<People />}>
                    My Patients
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="contained" startIcon={<Schedule />}>
                    Set Availability
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="contained" startIcon={<MedicalServices />}>
                    Write Prescription
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="contained" startIcon={<Notifications />}>
                    Send Updates
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming & Recent Activity */}
        <Grid item xs={12} md={4}>
          {/* Upcoming Appointments */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Appointments
              </Typography>
              <List dense>
                {upcomingAppointments.map((appointment) => (
                  <ListItem key={appointment.id} divider>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <People sx={{ fontSize: 18 }} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={appointment.patientName}
                      secondary={`${appointment.date}, ${appointment.time} - ${appointment.type}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Patient Statistics */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Overview
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Appointment Completion
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={((doctorStats.completed / doctorStats.totalAppointments) * 100) || 0} 
                    color="success"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {doctorStats.completed} of {doctorStats.totalAppointments} completed
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Patient Satisfaction
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={96} 
                    color="info"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {doctorStats.patientSatisfaction} average rating
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;