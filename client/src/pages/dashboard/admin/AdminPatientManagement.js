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
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  LocalHospital as DoctorIcon,
  Bloodtype as BloodIcon,
  Height as HeightIcon,
  MonitorWeight as WeightIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const AdminPatientManagement = () => {
  const theme = useTheme();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    bloodGroup: '',
    height: '',
    weight: '',
    address: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    medicalHistory: [],
    allergies: [],
    currentMedications: []
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Empty state - no mock data
  useEffect(() => {
    setPatients([]);
    setFilteredPatients([]);
  }, []);

  // Filter patients based on search term and blood group
  useEffect(() => {
    let filtered = patients;
    
    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
      );
    }
    
    if (filterBloodGroup) {
      filtered = filtered.filter(patient => 
        patient.bloodGroup === filterBloodGroup
      );
    }
    
    setFilteredPatients(filtered);
  }, [searchTerm, filterBloodGroup, patients]);

  const handleOpenDialog = (patient = null) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData({
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth,
        bloodGroup: patient.bloodGroup,
        height: patient.height.toString(),
        weight: patient.weight.toString(),
        address: patient.address,
        emergencyContact: patient.emergencyContact,
        medicalHistory: patient.medicalHistory,
        allergies: patient.allergies,
        currentMedications: patient.currentMedications
      });
    } else {
      setEditingPatient(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        bloodGroup: '',
        height: '',
        weight: '',
        address: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        },
        medicalHistory: [],
        allergies: [],
        currentMedications: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPatient(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (editingPatient) {
      // Update existing patient
      setPatients(patients.map(patient => 
        patient.id === editingPatient.id 
          ? { ...patient, ...formData, height: parseInt(formData.height), weight: parseInt(formData.weight) }
          : patient
      ));
    } else {
      // Add new patient
      const newPatient = {
        id: patients.length + 1,
        ...formData,
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        assignedDoctor: 'Unassigned',
        lastVisit: null,
        nextAppointment: null,
        status: 'Active'
      };
      setPatients([...patients, newPatient]);
    }
    handleCloseDialog();
  };

  const handleDeletePatient = (patientId) => {
    setPatients(patients.filter(patient => patient.id !== patientId));
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? '#10b981' : '#ef4444';
  };

  const getAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="700" color="#1E293B" gutterBottom>
          Patient Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage patient records, medical history, and appointments
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
                <PersonIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {patients.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Patients
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
                <DoctorIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {patients.filter(p => p.assignedDoctor !== 'Unassigned').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assigned Patients
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
                <CalendarIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {patients.filter(p => p.nextAppointment).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Appointments
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
                <AssignmentIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {patients.reduce((sum, p) => sum + p.medicalHistory.length, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Medical Records
              </Typography>
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
                placeholder="Search patients..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: { xs: '100%', md: 300 } }}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              <FormControl size="small" sx={{ width: { xs: '100%', md: 200 } }}>
                <InputLabel>Blood Group</InputLabel>
                <Select
                  value={filterBloodGroup}
                  onChange={(e) => setFilterBloodGroup(e.target.value)}
                  label="Blood Group"
                >
                  <MenuItem value="">All Blood Groups</MenuItem>
                  {bloodGroups.map(group => (
                    <MenuItem key={group} value={group}>{group}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setFilterBloodGroup('');
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
                Add Patient
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Patients Table */}
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
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Age/Blood</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Doctor</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Last Visit</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Next Appointment</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Conditions</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow 
                    key={patient.id} 
                    sx={{ 
                      '&:hover': { bgcolor: '#F8FAFC' },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: '#14B8A6',
                          width: 40,
                          height: 40
                        }}>
                          <PersonIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            {patient.firstName} {patient.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: {patient.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2">{patient.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2">{patient.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="body2">
                          {getAge(patient.dateOfBirth)} years
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BloodIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Chip
                            label={patient.bloodGroup}
                            size="small"
                            sx={{
                              bgcolor: '#F0FDF4',
                              color: '#16A34A',
                              fontWeight: 500,
                              height: 20
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={patient.assignedDoctor}
                        size="small"
                        sx={{
                          bgcolor: patient.assignedDoctor === 'Unassigned' ? '#FEF2F2' : '#EFF6FF',
                          color: patient.assignedDoctor === 'Unassigned' ? '#DC2626' : '#2563EB',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'Never'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color={patient.nextAppointment ? 'primary' : 'text.secondary'}>
                        {patient.nextAppointment ? new Date(patient.nextAppointment).toLocaleDateString() : 'None'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {patient.medicalHistory.length} condition{patient.medicalHistory.length !== 1 ? 's' : ''}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog(patient)}
                            sx={{ color: '#14B8A6' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeletePatient(patient.id)}
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

      {/* Add/Edit Patient Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPatient ? 'Edit Patient' : 'Add New Patient'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
              <FormControl fullWidth>
                <InputLabel>Blood Group</InputLabel>
                <Select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  required
                >
                  {bloodGroups.map(group => (
                    <MenuItem key={group} value={group}>{group}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Height (cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleInputChange}
                required
              />
            </Box>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={2}
              value={formData.address}
              onChange={handleInputChange}
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
            {editingPatient ? 'Update' : 'Add'} Patient
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPatientManagement;