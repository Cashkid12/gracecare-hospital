import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const AdminAppointments = () => {
  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Appointment Management</Typography>
        <Typography>View and manage all hospital appointments.</Typography>
      </Paper>
    </Container>
  );
};

export default AdminAppointments;