import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  alpha,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Emergency as EmergencyIcon,
  Favorite as HeartIcon,
  ChildFriendly as ChildIcon,
  Psychology as BrainIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <HeartIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Cardiology',
      description: 'Comprehensive heart care with advanced diagnostic tools and treatment options.',
      link: '/departments#cardiology',
    },
    {
      icon: <ChildIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Pediatrics',
      description: 'Specialized care for children from infancy through adolescence.',
      link: '/departments#pediatrics',
    },
    {
      icon: <HospitalIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Dental Care',
      description: 'Complete dental services for maintaining optimal oral health.',
      link: '/departments#dental',
    },
    {
      icon: <BrainIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Neurology',
      description: 'Expert care for disorders of the nervous system and brain.',
      link: '/departments#neurology',
    },
  ];

  const handleBookAppointment = () => {
    navigate('/signup');
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:+1555123HELP';
  };

  const handleLearnMore = (link) => {
    navigate(link);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha('#2B9ED8', 0.9)} 0%, ${alpha('#003B73', 0.9)} 100%), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80') center/cover`,
          color: 'white',
          py: { xs: 10, md: 15 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Your Health, Our Priority
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.5rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Experience world-class healthcare with compassionate medical professionals dedicated to your well-being.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleBookAppointment}
              sx={{
                bgcolor: 'success.main',
                px: { xs: 4, md: 6 },
                py: 1.5,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'success.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(91, 212, 122, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Book Appointment
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/doctors')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: { xs: 4, md: 6 },
                py: 1.5,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'white',
                  color: 'primary.main',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Find a Doctor
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h2" 
          textAlign="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: 'secondary.main',
          }}
        >
          Our Services
        </Typography>
        <Typography 
          variant="h6" 
          textAlign="center" 
          color="text.secondary" 
          sx={{ 
            mb: 6,
            fontSize: { xs: '1rem', md: '1.25rem' },
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          Comprehensive healthcare services for you and your family
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  textAlign: 'center', 
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ 
                    display: 'inline-flex', 
                    p: 2, 
                    borderRadius: 3,
                    bgcolor: 'primary.light',
                    color: 'white',
                    mb: 2,
                  }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {service.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => handleLearnMore(service.link)}
                    sx={{ fontWeight: 600 }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Additional CTA */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/services')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            View All Services
          </Button>
        </Box>
      </Container>

      {/* Emergency Section */}
      <Paper
        sx={{
          bgcolor: 'error.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
          },
        }}
      >
        <Container maxWidth="md">
          <EmergencyIcon sx={{ fontSize: 64, mb: 3, position: 'relative', zIndex: 1 }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, position: 'relative', zIndex: 1 }}>
            Emergency Hotline
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, position: 'relative', zIndex: 1 }}>
            +1 (555) 123-HELP
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
            24/7 Emergency Medical Services
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleEmergencyCall}
            sx={{
              bgcolor: 'white',
              color: 'error.main',
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 700,
              '&:hover': {
                bgcolor: 'grey.100',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Call Now
          </Button>
        </Container>
      </Paper>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={6} sm={3}>
            <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontWeight: 700 }}>
              50+
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Expert Doctors</Typography>
            <Typography variant="body2" color="text.secondary">Qualified Professionals</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontWeight: 700 }}>
              10K+
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Happy Patients</Typography>
            <Typography variant="body2" color="text.secondary">Satisfied Customers</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontWeight: 700 }}>
              15+
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Departments</Typography>
            <Typography variant="body2" color="text.secondary">Medical Specialties</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontWeight: 700 }}>
              24/7
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Emergency Care</Typography>
            <Typography variant="body2" color="text.secondary">Always Available</Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
                Why Choose GraceCare Hospital?
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                We are committed to providing exceptional healthcare services with state-of-the-art technology, 
                experienced medical professionals, and a patient-centered approach.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  'Advanced Medical Technology',
                  'Experienced Healthcare Professionals',
                  'Patient-Centered Care Approach',
                  '24/7 Emergency Services',
                  'Comprehensive Medical Specialties',
                  'Affordable Healthcare Solutions'
                ].map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      bgcolor: 'success.main', 
                      borderRadius: '50%',
                      mr: 2,
                    }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: 400,
                  background: `url('https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80') center/cover`,
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;