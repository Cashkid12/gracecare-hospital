import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Search,
  Person,
  Phone,
  Email,
  CalendarToday,
  MedicalServices,
  FileUpload,
  NoteAdd
} from '@mui/icons-material';

const DoctorPatients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    // Empty state - will be populated from API
    setPatients([]);
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setDetailsDialog(true);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
          Patients
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your patient records
        </Typography>
      </Box>

      {/* Search */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search by patient name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2 }
            }}
          />
        </CardContent>
      </Card>

      {/* Patient List */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <CardContent>
          {filteredPatients.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Person sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No patients found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchQuery ? 'Try adjusting your search' : 'Your patient list is empty'}
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {filteredPatients.map((patient, index) => (
                <React.Fragment key={patient.id}>
                  <ListItem
                    button
                    onClick={() => handlePatientClick(patient)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'rgba(20, 184, 166, 0.04)',
                        transform: 'translateX(4px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light', width: 50, height: 50 }}>
                        {patient.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {patient.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                          <Chip
                            label={`${patient.age} years, ${patient.gender}`}
                            size="small"
                            sx={{ height: 24 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            Last visit: {patient.lastVisit}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredPatients.length - 1 && <Divider sx={{ my: 1 }} />}
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Patient Details Dialog */}
      <Dialog
        open={detailsDialog}
        onClose={() => setDetailsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56 }}>
              {selectedPatient?.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {selectedPatient?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Patient ID: {selectedPatient?.id}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Tabs value={0} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Overview" />
            <Tab label="Medical History" />
            <Tab label="Documents" />
          </Tabs>

          {selectedPatient && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Person color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Age</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedPatient.age} years
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <MedicalServices color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Gender</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedPatient.gender}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Phone color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Phone</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedPatient.phone || 'Not provided'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <CalendarToday color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Last Visit</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedPatient.lastVisit}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<NoteAdd />}
                    sx={{
                      borderRadius: 2,
                      borderColor: 'primary.main',
                      color: 'primary.main'
                    }}
                  >
                    Add Notes
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FileUpload />}
                    sx={{
                      borderRadius: 2,
                      borderColor: 'primary.main',
                      color: 'primary.main'
                    }}
                  >
                    Upload Document
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorPatients;
