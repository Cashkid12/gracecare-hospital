import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Button,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LocalHospital,
  CalendarToday,
  Person,
  History,
  AccessTime,
  Info,
  MedicalServices
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MedicalHistory = () => {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    // Empty history for new patients
    setTimeout(() => {
      setMedicalHistory([]);
      setLoading(false);
    }, 1000);
  };

  const handleBackToDashboard = () => {
    navigate('/patient-dashboard');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography variant="h6">Loading medical history...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'secondary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: isMobile ? 'center' : 'left' }}>
            <History sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Medical History
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Past Visits, Treatments & Health Journey
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            onClick={handleBackToDashboard}
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                bgcolor: 'white',
                color: 'secondary.main',
              },
            }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Paper>

      {medicalHistory.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <History sx={{ fontSize: 80, color: 'text.secondary', mb: 3, opacity: 0.5 }} />
          <Typography variant="h5" gutterBottom color="textSecondary">
            No Medical History Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            Your complete medical history including past visits, diagnoses, treatments, and health milestones will appear here after your appointments.
          </Typography>
          
          <Alert severity="info" sx={{ maxWidth: 500, mx: 'auto', mb: 3 }}>
            <Typography variant="body2">
              <strong>Your history will include:</strong> Doctor visits, diagnoses, treatments, medications, procedures, and health progress over time.
            </Typography>
          </Alert>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/book-appointment')}
              startIcon={<CalendarToday />}
            >
              Schedule First Visit
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/patient-profile')}
              startIcon={<Person />}
            >
              Complete Profile
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <MedicalServices /> Visit History
              </Typography>
              
              <List>
                {medicalHistory.map((visit, index) => (
                  <ListItem 
                    key={index}
                    sx={{ 
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 2,
                      p: 3
                    }}
                  >
                    <ListItemIcon>
                      <LocalHospital color="primary" sx={{ fontSize: 40 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              {visit.doctor}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {visit.department} • {visit.type}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: isMobile ? 'left' : 'right' }}>
                            <Chip 
                              label={visit.status} 
                              color={
                                visit.status === 'Completed' ? 'success' : 
                                visit.status === 'Scheduled' ? 'warning' : 'primary'
                              }
                              size="small"
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {new Date(visit.date).toLocaleDateString()} at {visit.time}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 2 }}>
                          {visit.diagnosis && (
                            <Typography variant="body2" gutterBottom>
                              <strong>Diagnosis:</strong> {visit.diagnosis}
                            </Typography>
                          )}
                          {visit.treatment && (
                            <Typography variant="body2" gutterBottom>
                              <strong>Treatment:</strong> {visit.treatment}
                            </Typography>
                          )}
                          {visit.notes && (
                            <Typography variant="body2">
                              <strong>Notes:</strong> {visit.notes}
                            </Typography>
                          )}
                          {visit.prescriptions && visit.prescriptions.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" gutterBottom>
                                <strong>Prescriptions:</strong>
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {visit.prescriptions.map((med, medIndex) => (
                                  <Chip key={medIndex} label={med} size="small" variant="outlined" />
                                ))}
                              </Box>
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* History Summary */}
          <Card sx={{ mt: 4, bgcolor: 'primary.50' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime /> History Summary
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: 2 }}>
                <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    {medicalHistory.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Visits
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                  <Typography variant="h4" color="secondary.main" fontWeight="bold">
                    {medicalHistory.filter(v => v.status === 'Completed').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    {new Set(medicalHistory.map(v => v.doctor)).size}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Doctors Seen
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                  <Typography variant="h4" color="info.main" fontWeight="bold">
                    {new Set(medicalHistory.map(v => v.department)).size}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Departments
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default MedicalHistory;