// src/pages/dashboard/admin/AdminUserManagement.js
import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Grid,
  Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination,
  Chip, IconButton, Menu, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl, InputLabel,
  Select, Switch, FormControlLabel, Avatar, Tooltip,
  Divider, Alert, ListItemIcon
} from '@mui/material';
import {
  Search as SearchIcon,
  People as PeopleIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  Person as PersonIcon,
  LocalHospital as DoctorIcon,
  AdminPanelSettings as AdminIcon,
  Block as BlockIcon,
  CheckCircle as ActiveIcon,
  Shield as ShieldIcon,
  Business as DeptIcon
} from '@mui/icons-material';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add', 'edit', 'block'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'patient',
    department: '',
    status: 'active'
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const mockUsers = [
      { id: 1, name: 'John Patient', email: 'john@email.com', role: 'patient', status: 'active', joinDate: '2024-01-15', phone: '+1234567890', department: '-' },
      { id: 2, name: 'Dr. Sarah Smith', email: 'sarah@gracecare.com', role: 'doctor', status: 'active', joinDate: '2023-11-20', phone: '+1987654321', department: 'Cardiology' },
      { id: 3, name: 'Admin User', email: 'admin@gracecare.com', role: 'admin', status: 'active', joinDate: '2023-08-10', phone: '+1555000999', department: 'Administration' },
      { id: 4, name: 'Dr. Mike Johnson', email: 'mike@gracecare.com', role: 'doctor', status: 'inactive', joinDate: '2023-12-05', phone: '+1444333222', department: 'Pediatrics' },
      { id: 5, name: 'Banned Patient', email: 'banned@email.com', role: 'patient', status: 'blocked', joinDate: '2024-01-02', phone: '+1666777888', department: '-' },
    ];
    setUsers(mockUsers);
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = (mode, user = null) => {
    setDialogMode(mode);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        status: user.status
      });
      setSelectedUser(user);
    } else {
      setFormData({ name: '', email: '', role: 'patient', department: '', status: 'active' });
    }
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleAction = (action) => {
    console.log(`${action} user:`, selectedUser);
    handleMenuClose();
  };

  const filteredUsers = users.filter(user =>
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole === 'all' || user.role === filterRole)
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="secondary.main">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('add')}
          sx={{ borderRadius: 2 }}
        >
          Add New User
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Total Users', count: users.length, icon: <PeopleIcon />, color: '#6366F1' },
          { title: 'Active Doctors', count: users.filter(u => u.role === 'doctor' && u.status === 'active').length, icon: <DoctorIcon />, color: '#14B8A6' },
          { title: 'Active Patients', count: users.filter(u => u.role === 'patient' && u.status === 'active').length, icon: <PersonIcon />, color: '#06B6D4' },
          { title: 'System Admins', count: users.filter(u => u.role === 'admin').length, icon: <ShieldIcon />, color: '#F59E0B' }
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ border: 'none', bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${stat.color}15`, color: stat.color }}>{stat.icon}</Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="600">{stat.title}</Typography>
                  <Typography variant="h5" fontWeight="700">{stat.count}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name or email..."
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
                <InputLabel>Filter Role</InputLabel>
                <Select
                  value={filterRole}
                  label="Filter Role"
                  onChange={(e) => setFilterRole(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="admin">Administrators</MenuItem>
                  <MenuItem value="doctor">Doctors</MenuItem>
                  <MenuItem value="patient">Patients</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Export Users">
                  <Button variant="outlined" sx={{ borderRadius: 2, flexGrow: 1 }}>Export</Button>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>User Info</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Role & Dept</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Join Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: user.role === 'admin' ? '#F59E0B' : user.role === 'doctor' ? '#14B8A6' : '#06B6D4' }}>
                      {user.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">{user.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Chip 
                      label={user.role} 
                      size="small" 
                      color={user.role === 'admin' ? 'warning' : user.role === 'doctor' ? 'primary' : 'secondary'}
                      sx={{ width: 'fit-content', textTransform: 'capitalize', fontWeight: 'bold' }}
                    />
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <DeptIcon sx={{ fontSize: 12 }} /> {user.department}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.status} 
                    size="small"
                    variant="outlined"
                    icon={user.status === 'active' ? <ActiveIcon /> : <BlockIcon />}
                    color={user.status === 'active' ? 'success' : user.status === 'blocked' ? 'error' : 'default'}
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.joinDate}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                    <MoreIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* User Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { minWidth: 150, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' } }}
      >
        <MenuItem onClick={() => handleOpenDialog('edit', selectedUser)}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          Edit User
        </MenuItem>
        {selectedUser?.role === 'doctor' && (
          <MenuItem onClick={() => handleAction('toggle_status')}>
            <ListItemIcon><ActiveIcon fontSize="small" /></ListItemIcon>
            {selectedUser?.status === 'active' ? 'Deactivate' : 'Activate'}
          </MenuItem>
        )}
        <Divider />
        {selectedUser?.status !== 'blocked' ? (
          <MenuItem onClick={() => handleAction('block')} sx={{ color: 'error.main' }}>
            <ListItemIcon><BlockIcon fontSize="small" color="error" /></ListItemIcon>
            Block User
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleAction('unblock')} sx={{ color: 'success.main' }}>
            <ListItemIcon><ActiveIcon fontSize="small" color="success" /></ListItemIcon>
            Unblock User
          </MenuItem>
        )}
        <MenuItem onClick={() => handleAction('delete')} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          Delete User
        </MenuItem>
      </Menu>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {dialogMode === 'add' ? 'Add New User' : 'Edit User Details'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>User Role</InputLabel>
                  <Select
                    label="User Role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <MenuItem value="patient">Patient</MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="admin">Administrator</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth disabled={formData.role === 'patient'}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    label="Department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <MenuItem value="Administration">Administration</MenuItem>
                    <MenuItem value="Cardiology">Cardiology</MenuItem>
                    <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                    <MenuItem value="Neurology">Neurology</MenuItem>
                    <MenuItem value="Dental">Dental Care</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {dialogMode === 'edit' && (
              <Alert severity="info">
                Last login: 2 hours ago from Chrome (Windows)
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {dialogMode === 'add' ? 'Create User' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUserManagement;