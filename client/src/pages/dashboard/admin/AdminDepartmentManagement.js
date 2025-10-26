// src/pages/dashboard/admin/AdminDepartmentManagement.js
import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent,
  Button, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel,
  Select, MenuItem
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const AdminDepartmentManagement = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1, name: 'Cardiology', head: 'Dr. Sarah Smith',
      doctors: 8, patients: 324, status: 'active'
    },
    {
      id: 2, name: 'Pediatrics', head: 'Dr. Mike Johnson',
      doctors: 6, patients: 289, status: 'active'
    },
    {
      id: 3, name: 'Dental Care', head: 'Dr. Emily Brown',
      doctors: 5, patients: 156, status: 'active'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);

  const DepartmentCard = ({ department }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {department.name}
          </Typography>
          <Chip 
            label={department.status} 
            color={department.status === 'active' ? 'success' : 'default'}
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Head: {department.head}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Doctors</Typography>
            <Typography variant="h6">{department.doctors}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Patients</Typography>
            <Typography variant="h6">{department.patients}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button size="small" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button size="small" color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Department Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Department
        </Button>
      </Box>

      <Grid container spacing={3}>
        {departments.map((department) => (
          <Grid item xs={12} sm={6} md={4} key={department.id}>
            <DepartmentCard department={department} />
          </Grid>
        ))}
      </Grid>

      {/* Add Department Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Department</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Department Name" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Department Head</InputLabel>
                <Select label="Department Head">
                  <MenuItem value="dr_smith">Dr. Sarah Smith</MenuItem>
                  <MenuItem value="dr_johnson">Dr. Mike Johnson</MenuItem>
                  <MenuItem value="dr_brown">Dr. Emily Brown</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={3} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained">Create Department</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDepartmentManagement;