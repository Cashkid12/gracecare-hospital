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
  Description as DescriptionIcon,
  Person as PersonIcon,
  LocalHospital as DoctorIcon,
  CalendarToday as CalendarIcon,
  AttachFile as AttachmentIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const AdminMedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    visitDate: '',
    diagnosis: '',
    symptoms: '',
    treatment: '',
    notes: '',
    status: 'Active'
  });

  // Empty state - no mock data
  useEffect(() => {
    setRecords([]);
    setFilteredRecords([]);
  }, []);

  // Filter records
  useEffect(() => {
    let filtered = records;
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus) {
      filtered = filtered.filter(record => record.status === filterStatus);
    }
    setFilteredRecords(filtered);
  }, [searchTerm, filterStatus, records]);

  const handleOpenDialog = (record = null) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        patientId: record.patient.id,
        doctorId: record.doctor.id,
        visitDate: record.visitDate,
        diagnosis: record.diagnosis,
        symptoms: record.symptoms,
        treatment: record.treatment,
        notes: record.notes,
        status: record.status
      });
    } else {
      setEditingRecord(null);
      setFormData({ patientId: '', doctorId: '', visitDate: '', diagnosis: '', symptoms: '', treatment: '', notes: '', status: 'Active' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRecord(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingRecord) {
      setRecords(records.map(record => record.id === editingRecord.id ? { ...record, ...formData } : record));
    } else {
      const newRecord = { id: records.length + 1, patient: { id: 1, name: 'New Patient', age: 30, bloodGroup: 'O+' }, doctor: { id: 1, name: 'Dr. New Doctor', specialization: 'General' }, ...formData, attachments: 0 };
      setRecords([...records, newRecord]);
    }
    handleCloseDialog();
  };

  const handleDeleteRecord = (recordId) => {
    setRecords(records.filter(record => record.id !== recordId));
    if (selectedRecord?.id === recordId) setSelectedRecord(null);
  };

  const getStatusColor = (status) => {
    const colors = { 'Active': '#10b981', 'Completed': '#3b82f6', 'Archived': '#6b7280' };
    return colors[status] || '#6b7280';
  };

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" color="#1E293B" gutterBottom>Medical Records</Typography>
          <Typography variant="body2" color="text.secondary">Manage patient medical records, documents, and health information</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' }, borderRadius: 2 }}>Add Record</Button>
      </Box>

      {/* 12-Column Grid Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        {/* Stats Cards - 3 columns each */}
        {[
          { title: 'Total Records', value: records.length, icon: <DescriptionIcon />, color: '#14B8A6', bgColor: '#F0FDFA' },
          { title: 'Unique Patients', value: new Set(records.map(r => r.patient.id)).size, icon: <PersonIcon />, color: '#3B82F6', bgColor: '#EFF6FF' },
          { title: 'Treating Doctors', value: new Set(records.map(r => r.doctor.id)).size, icon: <DoctorIcon />, color: '#10B981', bgColor: '#F0FDF4' },
          { title: 'Attachments', value: records.reduce((sum, r) => sum + r.attachments, 0), icon: <AttachmentIcon />, color: '#F59E0B', bgColor: '#FFFBEB' }
        ].map((stat, index) => (
          <Box key={index} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: stat.bgColor, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.cloneElement(stat.icon, { sx: { fontSize: 24 } })}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.title}</Typography>
                  <Typography variant="h5" fontWeight="700" color="#1E293B" sx={{ fontSize: '1.5rem' }}>{stat.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}

        {/* Search Bar - Full Width */}
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' } }}>
                <TextField placeholder="Search medical records..." variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ flex: 1 }} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }} />
                <FormControl size="small" sx={{ width: { xs: '100%', sm: 200 } }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Archived">Archived</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => { setSearchTerm(''); setFilterStatus(''); }} size="small">Reset</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Records List - 5 columns */}
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 5' } }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Patient</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Diagnosis</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow key={record.id} onClick={() => setSelectedRecord(record)} sx={{ cursor: 'pointer', bgcolor: selectedRecord?.id === record.id ? '#F0FDFA' : 'transparent', '&:hover': { bgcolor: selectedRecord?.id === record.id ? '#F0FDFA' : '#F8FAFC' } }}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="500">{record.patient.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{record.patient.age} yrs | {record.patient.bloodGroup}</Typography>
                        </TableCell>
                        <TableCell><Typography variant="body2">{record.diagnosis}</Typography></TableCell>
                        <TableCell><Chip label={record.status} size="small" sx={{ bgcolor: `${getStatusColor(record.status)}20`, color: getStatusColor(record.status), fontWeight: 500 }} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Record Details - 7 columns */}
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 7' } }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
            {selectedRecord ? (
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ bgcolor: '#14B8A6', width: 48, height: 48 }}><DescriptionIcon sx={{ fontSize: 24 }} /></Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="600">Record #{selectedRecord.id}</Typography>
                    <Typography variant="body2" color="text.secondary">{new Date(selectedRecord.visitDate).toLocaleDateString()}</Typography>
                  </Box>
                  <Chip label={selectedRecord.status} size="small" sx={{ bgcolor: `${getStatusColor(selectedRecord.status)}20`, color: getStatusColor(selectedRecord.status), fontWeight: 500 }} />
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Patient</Typography>
                  <Typography variant="body1" fontWeight="600">{selectedRecord.patient.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Age: {selectedRecord.patient.age} | Blood: {selectedRecord.patient.bloodGroup}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Doctor</Typography>
                  <Typography variant="body1" fontWeight="600">{selectedRecord.doctor.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedRecord.doctor.specialization}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Diagnosis</Typography>
                  <Typography variant="body1">{selectedRecord.diagnosis}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Symptoms</Typography>
                  <Typography variant="body2">{selectedRecord.symptoms}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Treatment</Typography>
                  <Typography variant="body2">{selectedRecord.treatment}</Typography>
                </Box>
                {selectedRecord.notes && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Notes</Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#6B7280' }}>{selectedRecord.notes}</Typography>
                  </Box>
                )}
                <Box sx={{ pt: 2, borderTop: '1px solid #E5E7EB', display: 'flex', gap: 2 }}>
                  <Button variant="outlined" startIcon={<ViewIcon />} size="small">View Full</Button>
                  <Button variant="outlined" startIcon={<DownloadIcon />} size="small">Download</Button>
                  <Button variant="outlined" color="error" startIcon={<DeleteIcon />} size="small" onClick={() => handleDeleteRecord(selectedRecord.id)}>Delete</Button>
                </Box>
              </CardContent>
            ) : (
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 400 }}>
                <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#F0FDFA', color: '#14B8A6', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}><DescriptionIcon sx={{ fontSize: 32 }} /></Box>
                <Typography variant="h6" fontWeight="600" color="#1E293B" gutterBottom>Select a Record</Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">Click on a medical record from the list to view details</Typography>
              </CardContent>
            )}
          </Card>
        </Box>
      </Box>

      {/* Add/Edit Medical Record Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingRecord ? 'Edit Medical Record' : 'Add New Medical Record'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="Patient ID" name="patientId" value={formData.patientId} onChange={handleInputChange} required />
              <TextField fullWidth label="Doctor ID" name="doctorId" value={formData.doctorId} onChange={handleInputChange} required />
            </Box>
            <TextField fullWidth label="Visit Date" name="visitDate" type="date" value={formData.visitDate} onChange={handleInputChange} InputLabelProps={{ shrink: true }} required />
            <TextField fullWidth label="Diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} required />
            <TextField fullWidth label="Symptoms" name="symptoms" value={formData.symptoms} onChange={handleInputChange} multiline rows={2} />
            <TextField fullWidth label="Treatment" name="treatment" value={formData.treatment} onChange={handleInputChange} multiline rows={3} required />
            <TextField fullWidth label="Notes" name="notes" value={formData.notes} onChange={handleInputChange} multiline rows={3} />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={formData.status} onChange={handleInputChange} required>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' } }}>{editingRecord ? 'Update' : 'Add'} Record</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminMedicalRecords;
