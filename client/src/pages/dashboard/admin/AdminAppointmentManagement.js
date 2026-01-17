import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, Card, CardContent, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Chip, Button, TextField, FormControl, InputLabel,
  Select, MenuItem, IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, Avatar, Divider, Alert, CircularProgress,
  Snackbar
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreIcon,
  CheckCircle as ApproveIcon,
  Cancel as CancelIcon,
  Schedule as RescheduleIcon,
  LocalHospital as DoctorIcon,
  Person as PatientIcon,
  Assignment as RecordsIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { adminService } from '../../../services/apiService';
import { format } from 'date-fns';

const AdminAppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    today: 0,
    cancelled: 0
  });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [assignDoctor, setAssignDoctor] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [updating, setUpdating] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadData();
    loadDoctors();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [appointmentsRes, statsRes] = await Promise.all([
        adminService.getAppointments(),
        adminService.getDashboardStats()
      ]);

      if (appointmentsRes.data.success) {
        setAppointments(appointmentsRes.data.data);
      }
      
      if (statsRes.data.success) {
        const s = statsRes.data.data;
        setStats({
          total: s.totalAppointments,
          pending: s.pendingAppointments,
          today: s.todayAppointments,
          cancelled: 0 // Backend doesn't provide this yet
        });
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
      showNotification('Error loading data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadDoctors = async () => {
    try {
      const res = await adminService.getDoctors();
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return 'success';
      case 'scheduled': return 'primary';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  const handleOpenAction = (appointment) => {
    setSelectedAppointment(appointment);
    setAssignDoctor(appointment.doctor?._id || '');
    setRescheduleDate(appointment.appointmentDate ? appointment.appointmentDate.split('T')[0] : '');
    setRescheduleTime(appointment.appointmentTime || '');
    setOpenDialog(true);
  };

  const handleUpdateAppointment = async (updateData) => {
    setUpdating(true);
    try {
      const res = await adminService.updateAppointment(selectedAppointment._id, updateData);
      if (res.data.message) {
        showNotification(res.data.message);
        loadData();
        setOpenDialog(false);
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      showNotification(error.response?.data?.message || 'Update failed', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleQuickApprove = async (id) => {
    try {
      const res = await adminService.updateAppointment(id, { status: 'confirmed' });
      if (res.data.message) {
        showNotification('Appointment confirmed');
        loadData();
      }
    } catch (error) {
      showNotification('Failed to approve', 'error');
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const patientName = `${app.patient?.user?.firstName || ''} ${app.patient?.user?.lastName || ''}`.toLowerCase();
    const doctorName = `${app.doctor?.user?.firstName || ''} ${app.doctor?.user?.lastName || ''}`.toLowerCase();
    
    return (patientName.includes(searchTerm.toLowerCase()) || 
            doctorName.includes(searchTerm.toLowerCase())) &&
           (filterStatus === 'all' || app.status === filterStatus);
  });

  if (loading && appointments.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="secondary.main">
          Appointment Management
        </Typography>
        <Button startIcon={<RefreshIcon />} onClick={loadData} variant="outlined" size="small">
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Appointments', value: stats.total, color: '#6366F1' },
          { label: 'Pending Approval', value: stats.pending, color: '#F59E0B' },
          { label: 'Today\'s Visits', value: stats.today, color: '#14B8A6' },
          { label: 'Cancelled (Monthly)', value: stats.cancelled, color: '#EF4444' }
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', borderRadius: 2 }}>
              <CardContent>
                <Typography color="textSecondary" variant="caption" fontWeight="600" sx={{ textTransform: 'uppercase' }}>{stat.label}</Typography>
                <Typography variant="h4" fontWeight="700" color={stat.color}>{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Search by patient or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<FilterIcon />} sx={{ flexGrow: 1, borderRadius: 2 }}>Filters</Button>
              <Button variant="contained" color="primary" sx={{ flexGrow: 1, borderRadius: 2 }}>New Booking</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Doctor / Dept</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment._id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.light', fontSize: '0.8rem' }}>
                      {appointment.patient?.user?.firstName?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {appointment.patient?.user?.firstName} {appointment.patient?.user?.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">{appointment.reason}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {appointment.doctor ? `Dr. ${appointment.doctor.user?.firstName} ${appointment.doctor.user?.lastName}` : 'Unassigned'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">{appointment.department}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="500">
                    {appointment.appointmentDate ? format(new Date(appointment.appointmentDate), 'MMM dd, yyyy') : 'N/A'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">{appointment.appointmentTime}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={appointment.priority || 'medium'} 
                    size="small"
                    variant="outlined"
                    color={appointment.priority === 'emergency' || appointment.priority === 'high' ? 'error' : appointment.priority === 'medium' ? 'warning' : 'default'}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={appointment.status} 
                    color={getStatusColor(appointment.status)}
                    size="small"
                    sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Quick Approve">
                      <span>
                        <IconButton 
                          size="small" 
                          color="success" 
                          disabled={appointment.status !== 'scheduled' && appointment.status !== 'pending'}
                          onClick={() => handleQuickApprove(appointment._id)}
                        >
                          <ApproveIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Manage">
                      <IconButton size="small" onClick={() => handleOpenAction(appointment)}>
                        <MoreIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filteredAppointments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">No appointments found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Appointment Action Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Manage Appointment
          <Chip label={selectedAppointment?.status} color={getStatusColor(selectedAppointment?.status)} size="small" sx={{ textTransform: 'capitalize' }} />
        </DialogTitle>
        <DialogContent dividers>
          {selectedAppointment && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}><PatientIcon /></Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {selectedAppointment.patient?.user?.firstName} {selectedAppointment.patient?.user?.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{selectedAppointment.patient?.user?.email}</Typography>
                  </Box>
                </Box>
                <Button size="small" startIcon={<RecordsIcon />}>History</Button>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">Assign Doctor</Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Doctor</InputLabel>
                  <Select
                    value={assignDoctor}
                    label="Select Doctor"
                    onChange={(e) => setAssignDoctor(e.target.value)}
                  >
                    {doctors.map(doc => (
                      <MenuItem key={doc._id} value={doc._id}>
                        Dr. {doc.user?.firstName} {doc.user?.lastName} ({doc.specialization})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">Reschedule Date</Typography>
                  <TextField 
                    fullWidth 
                    type="date" 
                    size="small" 
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">Time Slot</Typography>
                  <TextField 
                    fullWidth 
                    size="small" 
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                  />
                </Box>
              </Box>

              {selectedAppointment.notes && (
                <Alert severity="info">
                  {selectedAppointment.notes}
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button 
            color="error" 
            startIcon={<CancelIcon />} 
            disabled={updating}
            onClick={() => handleUpdateAppointment({ status: 'cancelled' })}
          >
            Cancel Appt
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>Close</Button>
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<ApproveIcon />}
            loading={updating}
            onClick={() => handleUpdateAppointment({ 
              status: 'confirmed',
              doctorId: assignDoctor,
              appointmentDate: rescheduleDate,
              appointmentTime: rescheduleTime
            })}
          >
            Confirm & Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
      />
    </Box>
  );
};

export default AdminAppointmentManagement;