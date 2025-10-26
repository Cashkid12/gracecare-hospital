import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
} from '@mui/material';
import {
  Check as CheckIcon,
  LocalHospital as HospitalIcon,
} from '@mui/icons-material';

const Services = () => {
  const services = [
    {
      title: 'Emergency Care',
      description: '24/7 emergency medical services with state-of-the-art trauma care.',
      features: ['Trauma Center', 'Critical Care', 'Emergency Surgery', 'Ambulance Service'],
      icon: <HospitalIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    },
    {
      title: 'Surgical Services',
      description: 'Advanced surgical procedures across all major specialties.',
      features: ['Minimally Invasive Surgery', 'Robotic Surgery', 'Day Surgery', 'Post-op Care'],
      icon: <HospitalIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    },
    {
      title: 'Diagnostic Imaging',
      description: 'Comprehensive imaging services for accurate diagnosis.',
      features: ['MRI & CT Scan', 'X-ray & Ultrasound', 'Mammography', 'Nuclear Medicine'],
      icon: <HospitalIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    },
    {
      title: 'Maternity Care',
      description: 'Complete care for mothers and babies throughout pregnancy.',
      features: ['Prenatal Care', 'Labor & Delivery', 'Postpartum Care', 'Neonatal ICU'],
      icon: <HospitalIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    },
    {
      title: 'Rehabilitation',
      description: 'Physical and occupational therapy for recovery and wellness.',
      features: ['Physical Therapy', 'Occupational Therapy', 'Speech Therapy', 'Sports Medicine'],
      icon: <HospitalIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    },
    {
      title: 'Preventive Care',
      description: 'Health screenings and preventive services for lifelong wellness.',
      features: ['Health Check-ups', 'Vaccinations', 'Cancer Screenings', 'Health Education'],
      icon: <HospitalIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha('#2B9ED8', 0.9)} 0%, ${alpha('#003B73', 0.9)} 100%), url('https://images.unsplash.com/photo-1516549655669-dfbf54c5a709?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80') center/cover`,
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Our Services
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto' }}>
            Comprehensive healthcare services designed to meet all your medical needs with excellence and compassion.
          </Typography>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  {service.icon}
                  <Box sx={{ ml: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {service.description}
                    </Typography>
                  </Box>
                </Box>
                
                <List dense>
                  {service.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckIcon sx={{ color: 'success.main', fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;