import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const AdminUsers = () => {
  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>User Management</Typography>
        <Typography>Manage all users (patients, doctors, staff) from here.</Typography>
      </Paper>
    </Container>
  );
};

export default AdminUsers;