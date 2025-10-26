import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  alpha,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Groups as GroupsIcon,
  EmojiPeople as CareIcon,
  Science as ScienceIcon,
} from '@mui/icons-material';

const About = () => {
  const values = [
    {
      icon: <CareIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Compassionate Care',
      description: 'We treat every patient with empathy, respect, and kindness.',
    },
    {
      icon: <ScienceIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Medical Excellence',
      description: 'Using the latest technology and evidence-based practices.',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Teamwork',
      description: 'Collaborating across specialties for comprehensive care.',
    },
    {
      icon: <HospitalIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Innovation',
      description: 'Continuously improving our services and facilities.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha('#2B9ED8', 0.9)} 0%, ${alpha('#003B73', 0.9)} 100%), url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80') center/cover`,
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            About GraceCare Hospital
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto' }}>
            Delivering exceptional healthcare with compassion and innovation since 2010.
          </Typography>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
              Our Mission
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
              To provide comprehensive, compassionate, and accessible healthcare services 
              that improve the health and well-being of our community through clinical excellence, 
              innovative technology, and dedicated medical professionals.
            </Typography>
            
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main', mt: 4 }}>
              Our Vision
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              To be the leading healthcare institution recognized for exceptional patient care, 
              medical innovation, and community health improvement across the region.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                height: 400,
                background: `url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80') center/cover`,
                borderRadius: 4,
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Our Values */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" textAlign="center" gutterBottom sx={{ fontWeight: 600 }}>
            Our Values
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
            The principles that guide everything we do at GraceCare Hospital
          </Typography>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <CardContent>
                    {value.icon}
                    <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={6} md={3}>
            <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontWeight: 700 }}>
              14+
            </Typography>
            <Typography variant="h6">Years of Service</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontWeight: 700 }}>
              50+
            </Typography>
            <Typography variant="h6">Expert Doctors</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontWeight: 700 }}>
              100K+
            </Typography>
            <Typography variant="h6">Patients Treated</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontWeight: 700 }}>
              15+
            </Typography>
            <Typography variant="h6">Specialties</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;