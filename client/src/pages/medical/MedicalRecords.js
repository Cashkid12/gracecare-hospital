import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LocalHospital,
  Download,
  CalendarToday,
  Person,
  Assignment,
  MedicalServices,
  Info
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    // Empty records for new patients
    setTimeout(() => {
      setMedicalRecords([]);
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
          <Typography variant="h6">Loading medical records...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: isMobile ? 'center' : 'left' }}>
            <MedicalServices sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Medical Records
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Complete Health History & Documents
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
                color: 'primary.main',
              },
            }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Paper>

      {medicalRecords.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <LocalHospital sx={{ fontSize: 80, color: 'text.secondary', mb: 3, opacity: 0.5 }} />
          <Typography variant="h5" gutterBottom color="textSecondary">
            No Medical Records Available
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            Your medical records, test results, and health documents will appear here after your first appointment and medical consultations.
          </Typography>
          <Alert severity="info" sx={{ maxWidth: 500, mx: 'auto', mb: 3 }}>
            <Typography variant="body2">
              <strong>What you'll see here:</strong> Lab results, doctor's notes, prescriptions, medical reports, and health summaries.
            </Typography>
          </Alert>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/book-appointment')}
            startIcon={<CalendarToday />}
          >
            Book Your First Appointment
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Medical Documents */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Assignment /> Medical Documents
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <List>
                  {medicalRecords.map((record, index) => (
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
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="h6">
                              {record.documentType}
                            </Typography>
                            <Chip 
                              label={record.status} 
                              color={record.status === 'Completed' ? 'success' : 'warning'}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" gutterBottom>
                              <strong>Date:</strong> {new Date(record.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              <strong>Doctor:</strong> {record.doctor}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              <strong>Description:</strong> {record.description}
                            </Typography>
                            {record.results && (
                              <Typography variant="body2">
                                <strong>Results:</strong> {record.results}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      <Button 
                        variant="outlined" 
                        startIcon={<Download />}
                        sx={{ ml: 2 }}
                      >
                        Download
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Stats Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 100 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Info color="primary" /> Records Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      {medicalRecords.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Records
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Document Types:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      <Chip label="Lab Results" size="small" color="primary" variant="outlined" />
                      <Chip label="Prescriptions" size="small" color="secondary" variant="outlined" />
                      <Chip label="Reports" size="small" color="success" variant="outlined" />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default MedicalRecords;