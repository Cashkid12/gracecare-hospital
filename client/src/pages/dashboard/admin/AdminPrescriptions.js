import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
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
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Assignment as PrescriptionIcon,
  Person as PersonIcon,
  LocalHospital as DoctorIcon,
  Medication as MedicationIcon,
  CalendarToday as CalendarIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Print as PrintIcon
} from '@mui/icons-material';

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    status: 'Active'
  });

  const statuses = ['Active', 'Completed', 'Cancelled'];

  // Empty state - no mock data
  useEffect(() => {
    setPrescriptions([]);
    setFilteredPrescriptions([]);
  }, []);

  useEffect(() => {
    let filtered = prescriptions;
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus) {
      filtered = filtered.filter(p => p.status === filterStatus);
    }
    setFilteredPrescriptions(filtered);
  }, [searchTerm, filterStatus, prescriptions]);

  const handleOpenDialog = (prescription = null) => {
    if (prescription) {
      setEditingPrescription(prescription);
      setFormData({ ...prescription });
    } else {
      setEditingPrescription(null);
      setFormData({
        patientName: '',
        doctorName: '',
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        status: 'Active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPrescription(null);
  };

  const handleSubmit = () => {
    if (editingPrescription) {
      setPrescriptions(prescriptions.map(p =>
        p.id === editingPrescription.id ? { ...p, ...formData } : p
      ));
    } else {
      const newPrescription = {
        id: `RX-2024-${String(prescriptions.length + 1).padStart(3, '0')}`,
        patient: { name: formData.patientName, id: prescriptions.length + 1 },
        doctor: { name: formData.doctorName, specialization: 'General' },
        ...formData,
        date: new Date().toISOString().split('T')[0],
        refills: 0
      };
      setPrescriptions([...prescriptions, newPrescription]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const getStatusColor = (status) => {
    const colors = { Active: '#10B981', Completed: '#3B82F6', Cancelled: '#EF4444' };
    return colors[status] || '#6B7280';
  };

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="700" color="#1E293B" gutterBottom>
          Prescription Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage prescriptions, medications, and treatment plans
        </Typography>
      </Box>

      {/* 12-Column Grid Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        {/* Stats Cards - 3 columns each */}
        {[
          { title: 'Active Prescriptions', value: prescriptions.filter(p => p.status === 'Active').length, color: '#14B8A6', bgColor: '#F0FDFA' },
          { title: 'Completed', value: prescriptions.filter(p => p.status === 'Completed').length, color: '#3B82F6', bgColor: '#EFF6FF' },
          { title: 'Total Medications', value: prescriptions.length, color: '#8B5CF6', bgColor: '#F5F3FF' },
          { title: 'Pending Refills', value: prescriptions.filter(p => p.refills > 0).length, color: '#F59E0B', bgColor: '#FFFBEB' }
        ].map((stat, index) => (
          <Box key={index} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: stat.bgColor, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PrescriptionIcon sx={{ fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="700" color="#1E293B" sx={{ fontSize: '1.5rem' }}>
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}

        {/* Search and Filters - Full Width */}
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { md: 'center' }, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, width: { xs: '100%', md: 'auto' } }}>
                  <TextField
                    placeholder="Search prescriptions..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: { xs: '100%', md: 300 } }}
                    InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
                  />
                  <FormControl size="small" sx={{ width: { xs: '100%', md: 150 } }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
                      <MenuItem value="">All</MenuItem>
                      {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => { setSearchTerm(''); setFilterStatus(''); }}>
                    Reset
                  </Button>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' }, borderRadius: 2 }}>
                    New Prescription
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Prescriptions Table - Full Width */}
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 0 }}>
              <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table sx={{ minWidth: 900 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Prescription ID</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Patient</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Medication</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Dosage</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Doctor</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPrescriptions.map((prescription) => (
                      <TableRow key={prescription.id} sx={{ '&:hover': { bgcolor: '#F8FAFC' } }}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="500">{prescription.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#14B8A6' }}>
                              <PersonIcon sx={{ fontSize: 16 }} />
                            </Avatar>
                            <Typography variant="body2">{prescription.patient.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MedicationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" fontWeight="500">{prescription.medication}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{prescription.dosage}</Typography>
                          <Typography variant="caption" color="text.secondary">{prescription.frequency}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{prescription.doctor.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{prescription.doctor.specialization}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{prescription.date}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={prescription.status} size="small" sx={{ bgcolor: `${getStatusColor(prescription.status)}20`, color: getStatusColor(prescription.status), fontWeight: 500 }} />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title="Print"><IconButton size="small" sx={{ color: '#64748B' }}><PrintIcon /></IconButton></Tooltip>
                            <Tooltip title="Edit"><IconButton size="small" onClick={() => handleOpenDialog(prescription)} sx={{ color: '#14B8A6' }}><EditIcon /></IconButton></Tooltip>
                            <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDelete(prescription.id)} sx={{ color: '#EF4444' }}><DeleteIcon /></IconButton></Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingPrescription ? 'Edit Prescription' : 'New Prescription'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField fullWidth label="Patient Name" value={formData.patientName} onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} />
            <TextField fullWidth label="Doctor Name" value={formData.doctorName} onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })} />
            <TextField fullWidth label="Medication" value={formData.medication} onChange={(e) => setFormData({ ...formData, medication: e.target.value })} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="Dosage" value={formData.dosage} onChange={(e) => setFormData({ ...formData, dosage: e.target.value })} />
              <TextField fullWidth label="Frequency" value={formData.frequency} onChange={(e) => setFormData({ ...formData, frequency: e.target.value })} />
            </Box>
            <TextField fullWidth label="Duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
            <TextField fullWidth label="Instructions" multiline rows={2} value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} label="Status">
                {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' } }}>
            {editingPrescription ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPrescriptions;
