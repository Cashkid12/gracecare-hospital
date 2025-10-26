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
  CalendarToday,
  AccessTime,
  MedicalServices,
  Person,
  History,
  Download,
  Add
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [patientStats, setPatientStats] = useState({});
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    // Mock data - replace with API calls
    const mockUpcomingAppointments = [
      { id: 1, doctor: 'Dr. Sarah Smith', date: '2024-01-20', time: '10:00 AM', type: 'Consultation', department: 'Cardiology' },
      { id: 2, doctor: 'Dr. Mike Johnson', date: '2024-01-25', time: '2:30 PM', type: 'Follow-up', department: 'General Medicine' }
    ];

    const mockMedicalHistory = [
      { id: 1, date: '2024-01-15', doctor: 'Dr. Sarah Smith', diagnosis: 'Routine Checkup', prescription: 'Vitamin D' },
      { id: 2, date: '2023-12-10', doctor: 'Dr. Mike Johnson', diagnosis: 'Flu', prescription: 'Antibiotics' },
      { id: 3, date: '2023-11-05', doctor: 'Dr. Emily Brown', diagnosis: 'Dental Cleaning', prescription: 'None' }
    ];

    const mockStats = {
      totalVisits: 12,
      upcomingAppointments: 2,
      prescriptions: 3,
      nextCheckup: '2024-02-15'
    };

    setUpcomingAppointments(mockUpcomingAppointments);
    setMedicalHistory(mockMedicalHistory);
    setPatientStats(mockStats);
  };

  const StatCard = ({ title, value, subtitle, icon, color = 'primary' }) => (
    <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
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
          </Box>
          <Box sx={{ color: `${color}.main` }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Welcome back, {user?.firstName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your healthcare journey with us.
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Visits"
            value={patientStats.totalVisits}
            subtitle="All time"
            icon={<LocalHospital />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming"
            value={patientStats.upcomingAppointments}
            subtitle="Appointments"
            icon={<CalendarToday />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Prescriptions"
            value={patientStats.prescriptions}
            subtitle="Active"
            icon={<MedicalServices />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Next Checkup"
            value={patientStats.nextCheckup ? new Date(patientStats.nextCheckup).toLocaleDateString() : 'Not scheduled'}
            subtitle="Recommended"
            icon={<AccessTime />}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Upcoming Appointments */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday /> Upcoming Appointments
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={() => navigate('/book-appointment')}
                >
                  Book New
                </Button>
              </Box>

              {upcomingAppointments.length === 0 ? (
                <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
                  No upcoming appointments
                </Typography>
              ) : (
                <List>
                  {upcomingAppointments.map((appointment) => (
                    <ListItem 
                      key={appointment.id}
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
                        primary={appointment.doctor}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {appointment.type} • {appointment.department}
                            </Typography>
                          </Box>
                        }
                      />
                      <Chip label="Confirmed" color="success" size="small" />
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
                  <Button fullWidth variant="outlined" startIcon={<MedicalServices />}>
                    My Records
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="outlined" startIcon={<Download />}>
                    Download Reports
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="outlined" startIcon={<Person />}>
                    Update Profile
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="outlined" startIcon={<History />}>
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
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <History /> Recent Medical History
              </Typography>
              
              {medicalHistory.length === 0 ? (
                <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
                  No medical history available
                </Typography>
              ) : (
                <List>
                  {medicalHistory.slice(0, 4).map((record) => (
                    <ListItem key={record.id} divider>
                      <ListItemIcon>
                        <LocalHospital color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1">
                              {record.doctor}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {new Date(record.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              <strong>Diagnosis:</strong> {record.diagnosis}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Prescription:</strong> {record.prescription}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
              
              {medicalHistory.length > 4 && (
                <Button fullWidth sx={{ mt: 2 }}>
                  View Full History
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Health Summary */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Health Summary
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Appointment Attendance
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={95} 
                    color="success"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    95% attendance rate
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Prescription Adherence
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={88} 
                    color="info"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    88% medication adherence
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

export default PatientDashboard;