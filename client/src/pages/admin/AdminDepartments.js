import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const AdminDepartments = () => {
  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Department Management</Typography>
        <Typography>Manage hospital departments and services.</Typography>
      </Paper>
    </Container>
  );
};

export default AdminDepartments;