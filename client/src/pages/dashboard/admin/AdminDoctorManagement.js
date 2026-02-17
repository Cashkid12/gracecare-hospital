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
  Rating,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  LocalHospital as HospitalIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Star as StarIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const AdminDoctorManagement = () => {
  const theme = useTheme();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    department: '',
    consultationFee: '',
    bio: '',
    availability: {
      monday: { available: true, start: '09:00', end: '17:00' },
      tuesday: { available: true, start: '09:00', end: '17:00' },
      wednesday: { available: true, start: '09:00', end: '17:00' },
      thursday: { available: true, start: '09:00', end: '17:00' },
      friday: { available: true, start: '09:00', end: '17:00' },
      saturday: { available: false, start: '09:00', end: '13:00' },
      sunday: { available: false, start: '09:00', end: '17:00' }
    }
  });

  const specializations = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 
    'Dermatology', 'Ophthalmology', 'Gynecology', 'Psychiatry',
    'Radiology', 'Oncology', 'Surgery', 'Emergency Medicine'
  ];

  const departments = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 
    'Dermatology', 'Ophthalmology', 'Gynecology', 'Psychiatry',
    'Radiology', 'Oncology', 'Surgery', 'Emergency'
  ];

  // Empty state - no mock data
  useEffect(() => {
    setDoctors([]);
    setFilteredDoctors([]);
  }, []);

  // Filter doctors based on search term and specialization
  useEffect(() => {
    let filtered = doctors;
    
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterSpecialization) {
      filtered = filtered.filter(doctor => 
        doctor.specialization === filterSpecialization
      );
    }
    
    setFilteredDoctors(filtered);
  }, [searchTerm, filterSpecialization, doctors]);

  const handleOpenDialog = (doctor = null) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData({
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email,
        phone: doctor.phone,
        specialization: doctor.specialization,
        licenseNumber: doctor.licenseNumber,
        experience: doctor.experience.toString(),
        department: doctor.department,
        consultationFee: doctor.consultationFee.toString(),
        bio: doctor.bio,
        availability: doctor.availability
      });
    } else {
      setEditingDoctor(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialization: '',
        licenseNumber: '',
        experience: '',
        department: '',
        consultationFee: '',
        bio: '',
        availability: {
          monday: { available: true, start: '09:00', end: '17:00' },
          tuesday: { available: true, start: '09:00', end: '17:00' },
          wednesday: { available: true, start: '09:00', end: '17:00' },
          thursday: { available: true, start: '09:00', end: '17:00' },
          friday: { available: true, start: '09:00', end: '17:00' },
          saturday: { available: false, start: '09:00', end: '13:00' },
          sunday: { available: false, start: '09:00', end: '17:00' }
        }
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDoctor(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (editingDoctor) {
      // Update existing doctor
      setDoctors(doctors.map(doctor => 
        doctor.id === editingDoctor.id 
          ? { ...doctor, ...formData, experience: parseInt(formData.experience), consultationFee: parseInt(formData.consultationFee) }
          : doctor
      ));
    } else {
      // Add new doctor
      const newDoctor = {
        id: doctors.length + 1,
        ...formData,
        experience: parseInt(formData.experience),
        consultationFee: parseInt(formData.consultationFee),
        rating: 0,
        totalReviews: 0,
        patientsTreated: 0,
        dateJoined: new Date().toISOString()
      };
      setDoctors([...doctors, newDoctor]);
    }
    handleCloseDialog();
  };

  const handleDeleteDoctor = (doctorId) => {
    setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
  };

  const getSpecializationColor = (specialization) => {
    const colors = {
      'Cardiology': '#ef4444',
      'Neurology': '#3b82f6',
      'Orthopedics': '#10b981',
      'Pediatrics': '#f59e0b',
      'Dermatology': '#8b5cf6',
      'Ophthalmology': '#06b6d4',
      'Gynecology': '#ec4899',
      'Psychiatry': '#6366f1'
    };
    return colors[specialization] || '#6b7280';
  };

  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="700" color="#1E293B" gutterBottom>
          Doctor Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage doctors, their profiles, schedules, and specializations
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
                <HospitalIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {doctors.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Doctors
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
                <SchoolIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {Math.round(doctors.reduce((sum, doc) => sum + doc.experience, 0) / doctors.length)}+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg. Experience (Years)
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
                <StarIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {Math.round(doctors.reduce((sum, doc) => sum + doc.rating, 0) / doctors.length * 10) / 10}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg. Rating
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
                <WorkIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography variant="h4" fontWeight="700" color="#1E293B">
                {doctors.reduce((sum, doc) => sum + doc.patientsTreated, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Patients Treated
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
                placeholder="Search doctors..."
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
                <InputLabel>Specialization</InputLabel>
                <Select
                  value={filterSpecialization}
                  onChange={(e) => setFilterSpecialization(e.target.value)}
                  label="Specialization"
                >
                  <MenuItem value="">All Specializations</MenuItem>
                  {specializations.map(spec => (
                    <MenuItem key={spec} value={spec}>{spec}</MenuItem>
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
                  setFilterSpecialization('');
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
                Add Doctor
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Doctors Table */}
      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: 'none'
      }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Doctor</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Specialization</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Experience</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Fee</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Rating</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Patients</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow 
                    key={doctor.id} 
                    sx={{ 
                      '&:hover': { bgcolor: '#F8FAFC' },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: getSpecializationColor(doctor.specialization),
                          width: 40,
                          height: 40
                        }}>
                          <HospitalIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            {doctor.firstName} {doctor.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {doctor.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={doctor.specialization}
                        size="small"
                        sx={{
                          bgcolor: `${getSpecializationColor(doctor.specialization)}20`,
                          color: getSpecializationColor(doctor.specialization),
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{doctor.department}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WorkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">{doctor.experience} years</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">${doctor.consultationFee}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating 
                          value={doctor.rating} 
                          precision={0.1} 
                          size="small" 
                          readOnly 
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({doctor.totalReviews})
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {doctor.patientsTreated}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog(doctor)}
                            sx={{ color: '#14B8A6' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteDoctor(doctor.id)}
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

      {/* Add/Edit Doctor Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
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
              <FormControl fullWidth>
                <InputLabel>Specialization</InputLabel>
                <Select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                >
                  {specializations.map(spec => (
                    <MenuItem key={spec} value={spec}>{spec}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="License Number"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Experience (Years)"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleInputChange}
                required
              />
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              label="Consultation Fee ($)"
              name="consultationFee"
              type="number"
              value={formData.consultationFee}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              multiline
              rows={3}
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Doctor's biography and expertise..."
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
            {editingDoctor ? 'Update' : 'Add'} Doctor
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDoctorManagement;