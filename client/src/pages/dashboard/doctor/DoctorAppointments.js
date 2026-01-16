import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem
} from '@mui/material';
import {
  CalendarToday,
  Search,
  FilterList,
  MoreVert,
  Check,
  Close,
  Schedule,
  Person
} from '@mui/icons-material';

const DoctorAppointments = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduleDialog, setRescheduleDialog] = useState(false);

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

  const handleMenuClick = (event, appointment) => {
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(appointment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAppointment(null);
  };

  const handleReschedule = () => {
    setRescheduleDialog(true);
    handleMenuClose();
  };

  const filteredAppointments = appointments.filter(apt =>
    apt.patientName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
          Appointments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your appointments and schedule
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
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
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
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
                Filter
              </Button>
            </Grid>
          </Grid>
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
            },
            '& .Mui-selected': {
              color: 'primary.main'
            }
          }}
        >
          <Tab label="Today's Schedule" />
          <Tab label="Upcoming" />
          <Tab label="Past" />
        </Tabs>

        <CardContent>
          {filteredAppointments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CalendarToday sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No appointments found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 0 && "You don't have any appointments scheduled for today"}
                {tabValue === 1 && "No upcoming appointments"}
                {tabValue === 2 && "No past appointments"}
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Patient</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.light' }}>
                            {appointment.patientName.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {appointment.patientName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>
                        <Chip
                          label={appointment.status}
                          color={getStatusColor(appointment.status)}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuClick(e, appointment)}
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleReschedule}>
          <Schedule sx={{ mr: 1 }} /> Reschedule
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Check sx={{ mr: 1 }} /> Mark Complete
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Close sx={{ mr: 1 }} /> Cancel
        </MenuItem>
      </Menu>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleDialog} onClose={() => setRescheduleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reschedule Appointment</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="New Date"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="time"
              label="New Time"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRescheduleDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
              }
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorAppointments;
