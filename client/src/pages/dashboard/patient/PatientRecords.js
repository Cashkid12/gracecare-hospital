import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  Description,
  Upload,
  Download,
  Print,
  LocalHospital,
  Favorite,
  Person,
  CalendarToday,
  Warning,
  Close
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';

const PatientRecords = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    // Empty state - will be populated from API
    setDocuments([]);
  };

  const patientInfo = {
    name: `${user?.firstName} ${user?.lastName}`,
    age: user?.age || 'N/A',
    gender: user?.gender || 'N/A',
    bloodType: user?.bloodType || 'N/A',
    allergies: [],
    chronicConditions: []
  };

  const handleUpload = () => {
    // Handle file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf,image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Uploading:', file.name);
        // API call to upload file
      }
    };
    input.click();
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
          Medical Records
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View your medical history and documents
        </Typography>
      </Box>

      {/* Patient Profile Summary */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Patient Profile Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Name</Typography>
                  <Typography variant="body1" fontWeight={600}>{patientInfo.name}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Age</Typography>
                  <Typography variant="body1" fontWeight={600}>{patientInfo.age}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Gender</Typography>
                  <Typography variant="body1" fontWeight={600}>{patientInfo.gender}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Favorite color="error" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Blood Type</Typography>
                  <Typography variant="body1" fontWeight={600}>{patientInfo.bloodType}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Warning color="warning" />
                Allergies
              </Typography>
              {patientInfo.allergies.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  No known allergies
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', ml: 4 }}>
                  {patientInfo.allergies.map((allergy, index) => (
                    <Chip key={index} label={allergy} color="warning" size="small" />
                  ))}
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalHospital color="primary" />
                Chronic Conditions
              </Typography>
              {patientInfo.chronicConditions.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  No chronic conditions recorded
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', ml: 4 }}>
                  {patientInfo.chronicConditions.map((condition, index) => (
                    <Chip key={index} label={condition} color="info" size="small" />
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Uploaded Documents */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Uploaded Documents
            </Typography>
            <Button
              variant="contained"
              startIcon={<Upload />}
              onClick={handleUpload}
              sx={{
                background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
                }
              }}
            >
              Upload Document
            </Button>
          </Box>

          {documents.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Description sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No documents uploaded
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Upload your medical reports, scans, or prescriptions
              </Typography>
              <Button
                variant="contained"
                startIcon={<Upload />}
                onClick={handleUpload}
                sx={{
                  background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
                  }
                }}
              >
                Upload Document
              </Button>
            </Box>
          ) : (
            <List>
              {documents.map((doc) => (
                <React.Fragment key={doc.id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton edge="end" sx={{ mr: 1 }}>
                          <Download />
                        </IconButton>
                        <IconButton edge="end">
                          <Print />
                        </IconButton>
                      </Box>
                    }
                    sx={{ '&:hover': { bgcolor: 'rgba(20, 184, 166, 0.04)' } }}
                  >
                    <ListItemIcon>
                      <Description color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={`Uploaded: ${doc.date}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientRecords;
