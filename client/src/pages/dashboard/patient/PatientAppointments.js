import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  CalendarToday,
  Search,
  Add,
  AccessTime,
  Person
} from '@mui/icons-material';

const PatientAppointments = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [bookDialog, setBookDialog] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, [tabValue]);

  const fetchAppointments = () => {
    // Empty state - will be populated from API
    setAppointments([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  const filteredAppointments = appointments.filter(apt =>
    apt.doctor?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
            My Appointments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your appointments
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setBookDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
            }
          }}
        >
          Book Appointment
        </Button>
      </Box>

      {/* Search */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search by doctor name..."
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

      {/* Tabs */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem'
            }
          }}
        >
          <Tab label="Upcoming" />
          <Tab label="History" />
        </Tabs>

        <CardContent>
          {filteredAppointments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CalendarToday sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No appointments found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 0 ? 'Book your first appointment to get started' : 'No past appointments'}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setBookDialog(true)}
                sx={{
                  mt: 3,
                  background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
                  }
                }}
              >
                Book Appointment
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Doctor</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id} hover>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.department}</TableCell>
                      <TableCell>
                        <Chip
                          label={appointment.status}
                          color={getStatusColor(appointment.status)}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Book Appointment Dialog */}
      <Dialog open={bookDialog} onClose={() => setBookDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book New Appointment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={formData.department}
                  label="Department"
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <MenuItem value="cardiology">Cardiology</MenuItem>
                  <MenuItem value="pediatrics">Pediatrics</MenuItem>
                  <MenuItem value="dental">Dental Care</MenuItem>
                  <MenuItem value="neurology">Neurology</MenuItem>
                  <MenuItem value="orthopedics">Orthopedics</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={formData.doctor}
                  label="Doctor"
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                >
                  <MenuItem value="dr1">Dr. John Smith</MenuItem>
                  <MenuItem value="dr2">Dr. Sarah Johnson</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label="Time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Reason for Visit"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Describe your symptoms or reason for appointment..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
              }
            }}
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientAppointments;
