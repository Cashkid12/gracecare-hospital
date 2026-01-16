import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  alpha,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
} from '@mui/icons-material';

const Doctors = () => {
  const doctors = [];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="overline" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 700, 
              fontSize: '0.85rem',
              letterSpacing: '2px',
              display: 'block',
              mb: 1
            }}
          >
            OUR MEDICAL TEAM
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
            Our Medical Experts
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: 'text.secondary' }}>
            Meet our team of highly qualified and experienced healthcare professionals dedicated to your well-being.
          </Typography>
        </Container>
      </Box>

      {/* Coming Soon Message */}
      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Box
          sx={{
            p: 8,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '2px dashed',
            borderColor: 'primary.light',
          }}
        >
          <HospitalIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
            Coming Soon
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            Our medical experts section is currently under development. Check back soon to meet our team of qualified healthcare professionals.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0F766E 0%, #34D399 100%)',
              },
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Doctors;