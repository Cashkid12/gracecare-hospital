import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Tooltip,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Event as EventIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  LocalHospital as DoctorIcon,
  CheckCircle as ConfirmedIcon,
  Schedule as PendingIcon,
  Block as CancelledIcon,
  Done as CompletedIcon,
  Payment as PaymentIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

const AdminAppointmentManagement = () => {
  const theme = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: 'Consultation',
    notes: '',
    status: 'Pending',
    paymentStatus: 'Pending'
  });

  const appointmentTypes = ['Consultation', 'Follow-up', 'Emergency', 'Check-up'];
  const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
  const paymentStatuses = ['Pending', 'Paid', 'Partial', 'Overdue'];

  // Empty state - no mock data
  useEffect(() => {
    setAppointments([]);
    setFilteredAppointments([]);
  }, []);

  // Filter appointments based on search term, status, and date
  useEffect(() => {
    let filtered = appointments;
    
    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus) {
      filtered = filtered.filter(appointment => 
        appointment.status === filterStatus
      );
    }
    
    if (filterDate) {
      filtered = filtered.filter(appointment => 
        appointment.date === filterDate
      );
    }
    
    setFilteredAppointments(filtered);
  }, [searchTerm, filterStatus, filterDate, appointments]);

  const handleOpenDialog = (appointment = null) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setFormData({
        patientId: appointment.patient.id,
        doctorId: appointment.doctor.id,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        notes: appointment.notes,
        status: appointment.status,
        paymentStatus: appointment.paymentStatus
      });
    } else {
      setEditingAppointment(null);
      setFormData({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        type: 'Consultation',
        notes: '',
        status: 'Pending',
        paymentStatus: 'Pending'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAppointment(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (editingAppointment) {
      // Update existing appointment
      setAppointments(appointments.map(appointment => 
        appointment.id === editingAppointment.id 
          ? { ...appointment, ...formData }
          : appointment
      ));
    } else {
      // Add new appointment
      const newAppointment = {
        id: appointments.length + 1,
        patient: { id: 1, name: 'New Patient', email: 'new@email.com' },
        doctor: { id: 1, name: 'Dr. New Doctor', specialization: 'General' },
        ...formData,
        createdAt: new Date().toISOString(),
        amount: 150
      };
      setAppointments([...appointments, newAppointment]);
    }
    handleCloseDialog();
  };

  const handleDeleteAppointment = (appointmentId) => {
    setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#f59e0b',
      'Confirmed': '#3b82f6',
      'Completed': '#10b981',
      'Cancelled': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      'Pending': '#f59e0b',
      'Paid': '#10b981',
      'Partial': '#8b5cf6',
      'Overdue': '#ef4444',
      'Cancelled': '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <PendingIcon />;
      case 'Confirmed': return <ConfirmedIcon />;
      case 'Completed': return <CompletedIcon />;
      case 'Cancelled': return <CancelledIcon />;
      default: return <EventIcon />;
    }
  };

  // Get today's appointments
  const todayAppointments = appointments.filter(app => 
    isSameDay(new Date(app.date), new Date())
  );

  // Get upcoming appointments
  const upcomingAppointments = appointments.filter(app => 
    new Date(app.date) > new Date() && app.status !== 'Cancelled'
  ).slice(0, 5);

  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="700" color="#1E293B" gutterBottom>
          Appointment Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage all appointments, schedules, and booking systems
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: 'none',
            height: '100%'
          }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                bgcolor: '#F0FDFA', 
                color: '#14B8A6', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 2,
                mx: 'auto'
              }}>
                <EventIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {appointments.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Appointments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: 'none',
            height: '100%'
          }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                bgcolor: '#EFF6FF', 
                color: '#3B82F6', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 2,
                mx: 'auto'
              }}>
                <CalendarIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {todayAppointments.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Today's Appointments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: 'none',
            height: '100%'
          }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                bgcolor: '#F0FDF4', 
                color: '#10B981', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 2,
                mx: 'auto'
              }}>
                <PaymentIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                ${appointments.filter(a => a.paymentStatus === 'Paid').reduce((sum, a) => sum + a.amount, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Revenue Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: 'none',
            height: '100%'
          }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                bgcolor: '#FFFBEB', 
                color: '#F59E0B', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 2,
                mx: 'auto'
              }}>
                <PendingIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {appointments.filter(a => a.status === 'Pending').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Confirmations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: 'none' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" color="#1E293B" gutterBottom>
                Today's Appointments ({todayAppointments.length})
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {todayAppointments.length > 0 ? (
                  todayAppointments.map(app => (
                    <Box key={app.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#F8FAFC', borderRadius: 2 }}>
                      <Avatar sx={{ bgcolor: getStatusColor(app.status), width: 32, height: 32 }}>
                        {getStatusIcon(app.status)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight="500">
                          {app.patient.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {app.time} with {app.doctor.name}
                        </Typography>
                      </Box>
                      <Chip
                        label={app.status}
                        size="small"
                        sx={{
                          bgcolor: `${getStatusColor(app.status)}20`,
                          color: getStatusColor(app.status),
                          fontWeight: 500
                        }}
                      />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
                    No appointments scheduled for today
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: 'none' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" color="#1E293B" gutterBottom>
                Upcoming Appointments
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map(app => (
                    <Box key={app.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#F8FAFC', borderRadius: 2 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" fontWeight="600">
                          {new Date(app.date).getDate()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(app.date).toLocaleString('default', { month: 'short' })}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight="500">
                          {app.patient.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {app.time} with {app.doctor.name}
                        </Typography>
                      </Box>
                      <Chip
                        label={app.type}
                        size="small"
                        sx={{
                          bgcolor: '#EFF6FF',
                          color: '#3B82F6',
                          fontWeight: 500
                        }}
                      />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
                    No upcoming appointments
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: 'none',
        mb: 4
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: { md: 'center' },
            justifyContent: 'space-between'
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              width: { xs: '100%', md: 'auto' }
            }}>
              <TextField
                placeholder="Search appointments..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: { xs: '100%', md: 300 } }}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              <FormControl size="small" sx={{ width: { xs: '100%', md: 150 } }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="">All Status</MenuItem>
                  {statuses.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type="date"
                size="small"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                sx={{ width: { xs: '100%', md: 150 } }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('');
                  setFilterDate('');
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{
                  bgcolor: '#14B8A6',
                  '&:hover': { bgcolor: '#0D9488' },
                  borderRadius: 2,
                  px: 3
                }}
              >
                New Appointment
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: 'none'
      }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Appointment</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Doctor</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Payment</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow 
                    key={appointment.id} 
                    sx={{ 
                      '&:hover': { bgcolor: '#F8FAFC' },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: getStatusColor(appointment.status),
                          width: 36,
                          height: 36
                        }}>
                          {getStatusIcon(appointment.status)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            #{appointment.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(appointment.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body1" fontWeight="500">
                          {appointment.patient.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {appointment.patient.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body1" fontWeight="500">
                          {appointment.doctor.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {appointment.doctor.specialization}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {new Date(appointment.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2">{appointment.time}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={appointment.type}
                        size="small"
                        sx={{
                          bgcolor: '#EFF6FF',
                          color: '#3B82F6',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={appointment.status}
                        size="small"
                        sx={{
                          bgcolor: `${getStatusColor(appointment.status)}20`,
                          color: getStatusColor(appointment.status),
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={appointment.paymentStatus}
                        size="small"
                        sx={{
                          bgcolor: `${getPaymentStatusColor(appointment.paymentStatus)}20`,
                          color: getPaymentStatusColor(appointment.paymentStatus),
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        ${appointment.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog(appointment)}
                            sx={{ color: '#14B8A6' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            sx={{ color: '#ef4444' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Appointment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAppointment ? 'Edit Appointment' : 'New Appointment'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Patient ID"
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Doctor ID"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                fullWidth
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Appointment Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  {appointmentTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  {statuses.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <FormControl fullWidth>
              <InputLabel>Payment Status</InputLabel>
              <Select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleInputChange}
                required
              >
                {paymentStatuses.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Appointment notes..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' } }}
          >
            {editingAppointment ? 'Update' : 'Create'} Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminAppointmentManagement;