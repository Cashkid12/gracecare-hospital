import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const AdminAnalytics = () => {
  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Analytics & Reports</Typography>
        <Typography>View hospital analytics and generate reports.</Typography>
      </Paper>
    </Container>
  );
};

export default AdminAnalytics;