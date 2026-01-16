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
            ABOUT US
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
            About GraceCare Hospital
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: 'text.secondary' }}>
            Delivering exceptional healthcare with compassion and innovation since 2010.
          </Typography>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* Text Content - LEFT */}
            <Grid item xs={12} md={7}>
              <Box sx={{ px: { xs: 2, md: 0 } }}>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                  To provide comprehensive, compassionate, and accessible healthcare services 
                  that improve the health and well-being of our community through clinical excellence, 
                  innovative technology, and dedicated medical professionals.
                </Typography>
                
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  To be the leading healthcare institution recognized for exceptional patient care, 
                  medical innovation, and community health improvement across the region.
                </Typography>
              </Box>
            </Grid>

            {/* Image - RIGHT */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  opacity: 0,
                  transform: 'translateX(30px)',
                  animation: 'slideInRight 1s ease-out 0.3s forwards',
                  '@keyframes slideInRight': {
                    to: {
                      opacity: 1,
                      transform: 'translateX(0)'
                    }
                  }
                }}
              >
                <Box
                  component="img"
                  src="/About.jpg"
                  alt="GraceCare Hospital Team"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div style="color: white; text-align: center; padding: 60px 20px; background: linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%); height: 400px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 600; border-radius: 16px;">GraceCare Hospital</div>';
                  }}
                  sx={{
                    width: '100%',
                    maxWidth: 450,
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 30px 80px rgba(20, 184, 166, 0.25)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Values */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="overline" 
            textAlign="center"
            sx={{ 
              color: 'primary.main', 
              fontWeight: 700, 
              fontSize: '0.85rem',
              letterSpacing: '2px',
              display: 'block',
              mb: 1
            }}
          >
            OUR CORE VALUES
          </Typography>
          <Typography variant="h2" textAlign="center" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
            Our Values
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
            The principles that guide everything we do at GraceCare Hospital
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={6} key={index} sx={{ display: 'flex' }}>
                <Card 
                  sx={{ 
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    p: 4,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #14B8A6 0%, #6EE7B7 100%)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(20, 184, 166, 0.2)',
                      borderColor: 'primary.main',
                      '&::before': {
                        transform: 'scaleX(1)',
                      },
                      '& .value-icon': {
                        transform: 'scale(1.15) rotate(5deg)',
                        background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                      },
                    },
                  }}
                >
                  <Box 
                    className="value-icon"
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      margin: '0 auto',
                      p: 2, 
                      borderRadius: '16px',
                      bgcolor: 'primary.light',
                      color: 'white',
                      mb: 3,
                      transition: 'all 0.4s ease',
                      boxShadow: '0 8px 20px rgba(20, 184, 166, 0.3)',
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {value.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={6} md={3}>
              <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                14+
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>Years of Service</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                50+
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>Expert Doctors</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                100K+
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>Patients Treated</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                15+
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>Specialties</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;