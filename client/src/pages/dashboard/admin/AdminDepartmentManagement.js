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
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  LocalHospital as DoctorIcon,
  Assignment as AssignmentIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const AdminDepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHead, setFilterHead] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    head: '',
    phone: '',
    email: '',
    location: '',
    status: 'Active'
  });

  // Empty state - no mock data
  useEffect(() => {
    setDepartments([]);
    setFilteredDepartments([]);
  }, []);

  // Filter departments
  useEffect(() => {
    let filtered = departments;
    
    if (searchTerm) {
      filtered = filtered.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.head.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterHead) {
      filtered = filtered.filter(dept => 
        dept.head === filterHead
      );
    }
    
    setFilteredDepartments(filtered);
  }, [searchTerm, filterHead, departments]);

  const handleOpenDialog = (department = null) => {
    if (department) {
      setEditingDepartment(department);
      setFormData({
        name: department.name,
        description: department.description,
        head: department.head,
        phone: department.phone,
        email: department.email,
        location: department.location,
        status: department.status
      });
    } else {
      setEditingDepartment(null);
      setFormData({
        name: '',
        description: '',
        head: '',
        phone: '',
        email: '',
        location: '',
        status: 'Active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDepartment(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (editingDepartment) {
      setDepartments(departments.map(dept => 
        dept.id === editingDepartment.id 
          ? { ...dept, ...formData }
          : dept
      ));
    } else {
      const newDepartment = {
        id: departments.length + 1,
        ...formData,
        doctors: 0,
        patients: 0
      };
      setDepartments([...departments, newDepartment]);
    }
    handleCloseDialog();
  };

  const handleDeleteDepartment = (deptId) => {
    setDepartments(departments.filter(dept => dept.id !== deptId));
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? '#10b981' : '#ef4444';
  };

  const getDepartmentColor = (name) => {
    const colors = {
      'Cardiology': '#ef4444',
      'Orthopedics': '#3b82f6',
      'Pediatrics': '#10b981',
      'Neurology': '#8b5cf6'
    };
    return colors[name] || '#6b7280';
  };

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" color="#1E293B" gutterBottom>
            Department Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage hospital departments, services, and organizational structure
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' }, borderRadius: 2 }}>
          Add Department
        </Button>
      </Box>

      {/* 12-Column Grid Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        {/* Stats Cards - 3 columns each */}
        {[
          { title: 'Total Departments', value: departments.length, icon: <BusinessIcon />, color: '#14B8A6', bgColor: '#F0FDFA' },
          { title: 'Total Doctors', value: departments.reduce((sum, dept) => sum + dept.doctors, 0), icon: <DoctorIcon />, color: '#3B82F6', bgColor: '#EFF6FF' },
          { title: 'Total Patients', value: departments.reduce((sum, dept) => sum + dept.patients, 0), icon: <PeopleIcon />, color: '#10B981', bgColor: '#F0FDF4' },
          { title: 'Active Departments', value: departments.filter(d => d.status === 'Active').length, icon: <AssignmentIcon />, color: '#F59E0B', bgColor: '#FFFBEB' }
        ].map((stat, index) => (
          <Box key={index} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: stat.bgColor, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.cloneElement(stat.icon, { sx: { fontSize: 24 } })}
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

        {/* Search Bar - Full Width */}
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' } }}>
                <TextField placeholder="Search departments..." variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ flex: 1 }} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }} />
                <FormControl size="small" sx={{ width: { xs: '100%', sm: 200 } }}>
                  <InputLabel>Department Head</InputLabel>
                  <Select value={filterHead} onChange={(e) => setFilterHead(e.target.value)} label="Department Head">
                    <MenuItem value="">All Heads</MenuItem>
                    {[...new Set(departments.map(d => d.head))].map(head => (<MenuItem key={head} value={head}>{head}</MenuItem>))}
                  </Select>
                </FormControl>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => { setSearchTerm(''); setFilterHead(''); }} size="small">Reset</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Departments Table - Full Width */}
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 0 }}>
              <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Head</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Doctors</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Patients</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDepartments.map((department) => (
                  <TableRow 
                    key={department.id} 
                    sx={{ 
                      '&:hover': { bgcolor: '#F8FAFC' },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: getDepartmentColor(department.name),
                          width: 40,
                          height: 40
                        }}>
                          <BusinessIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            {department.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {department.description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {department.head}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2">{department.phone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2">{department.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="body2">{department.location}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500" color="#3B82F6">
                        {department.doctors}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500" color="#10B981">
                        {department.patients}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={department.status}
                        size="small"
                        sx={{
                          bgcolor: `${getStatusColor(department.status)}20`,
                          color: getStatusColor(department.status),
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog(department)}
                            sx={{ color: '#14B8A6' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteDepartment(department.id)}
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
    </Box>

    </Box>

      {/* Add/Edit Department Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingDepartment ? 'Edit Department' : 'Add New Department'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              fullWidth
              label="Department Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Department Head"
              name="head"
              value={formData.head}
              onChange={handleInputChange}
              required
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Box>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' } }}
          >
            {editingDepartment ? 'Update' : 'Add'} Department
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDepartmentManagement;