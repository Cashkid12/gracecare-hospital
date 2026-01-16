import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, IconButton, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalHospital, Favorite, Security, People, ExpandMore } from '@mui/icons-material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [expandedService, setExpandedService] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <LocalHospital sx={{ fontSize: 40, color: '#14B8A6' }} />,
      title: '24/7 Emergency Care',
      description: 'Round-the-clock emergency services with experienced medical professionals ready to handle any critical situation.'
    },
    {
      icon: <Favorite sx={{ fontSize: 40, color: '#14B8A6' }} />,
      title: 'Specialized Departments',
      description: 'Expert care across Cardiology, Pediatrics, Orthopedics, Neurology, and more with state-of-the-art facilities.'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#14B8A6' }} />,
      title: 'Advanced Diagnostics',
      description: 'Cutting-edge diagnostic technology including MRI, CT scans, and comprehensive laboratory services.'
    },
    {
      icon: <People sx={{ fontSize: 40, color: '#14B8A6' }} />,
      title: 'Patient-Centered Care',
      description: 'Compassionate, personalized treatment plans tailored to each patient\'s unique needs and circumstances.'
    }
  ];

  return (
    <Box sx={{ bgcolor: '#FAFAFA' }}>
      <Navbar />

      {/* Hero Section */}
      <Box
        id="hero"
        data-animate
        sx={{
          minHeight: { xs: 'auto', md: '85vh' },
          py: { xs: 6, md: 10 },
          background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 50%, #FFFFFF 100%)',
          position: 'relative',
          overflow: 'hidden',
          opacity: isVisible.hero ? 1 : 0,
          transform: isVisible.hero ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
          <Grid container spacing={{ xs: 3, md: 4, lg: 6 }} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, px: { xs: 2, md: 0 } }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                    fontWeight: 800,
                    color: '#14B8A6',
                    mb: 2,
                    lineHeight: 1.2
                  }}
                >
                  Welcome to GraceCare Hospital
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    color: '#666',
                    mb: 4,
                    lineHeight: 1.6
                  }}
                >
                  Your health is our priority. Experience compassionate, world-class medical care with our team of expert healthcare professionals.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/book-appointment')}
                    sx={{
                      background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                      px: 4,
                      py: 1.5,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: '0 8px 20px rgba(20, 184, 166, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 30px rgba(20, 184, 166, 0.4)'
                      }
                    }}
                  >
                    Book Appointment
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/services')}
                    sx={{
                      borderColor: '#14B8A6',
                      color: '#14B8A6',
                      px: 4,
                      py: 1.5,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                      borderWidth: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderWidth: 2,
                        borderColor: '#14B8A6',
                        bgcolor: 'rgba(20, 184, 166, 0.05)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Our Services
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'center', mt: { xs: 3, md: 0 } }}>
                <Box
                  component="img"
                  src="/logo.jpg"
                  alt="GraceCare Hospital"
                  sx={{
                    width: { xs: '220px', sm: '280px', md: '350px', lg: '450px' },
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(20, 184, 166, 0.2)',
                    animation: 'float 3s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-10px)' }
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box
        id="services"
        data-animate
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: 'white',
          opacity: isVisible.services ? 1 : 0,
          transform: isVisible.services ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out 0.2s'
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
              color: '#14B8A6',
              mb: 2
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: '#666',
              mb: { xs: 4, md: 6 },
              maxWidth: 600,
              mx: 'auto',
              px: 2
            }}
          >
            Comprehensive healthcare services designed for your wellbeing
          </Typography>

          <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(20, 184, 166, 0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    opacity: isVisible.services ? 1 : 0,
                    transform: isVisible.services ? 'scale(1)' : 'scale(0.9)',
                    transitionDelay: `${index * 0.1}s`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(20, 184, 166, 0.15)'
                    }
                  }}
                  onClick={() => setExpandedService(expandedService === index ? null : index)}
                >
                  <CardContent sx={{ p: { xs: 2.5, md: 3 }, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>{service.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        fontWeight: 600,
                        color: '#333',
                        mb: 1
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Collapse in={expandedService === index}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          fontSize: { xs: '0.85rem', md: '0.9rem' },
                          lineHeight: 1.6
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Collapse>
                    <IconButton
                      size="small"
                      sx={{
                        mt: 1,
                        transform: expandedService === index ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <ExpandMore sx={{ color: '#14B8A6' }} />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box
        id="why-choose"
        data-animate
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: '#F0FDFA',
          opacity: isVisible['why-choose'] ? 1 : 0,
          transform: isVisible['why-choose'] ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
          <Grid container spacing={{ xs: 3, md: 4, lg: 6 }} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  fontWeight: 700,
                  color: '#14B8A6',
                  mb: 3,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Why Choose GraceCare?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  color: '#555',
                  lineHeight: 1.8,
                  mb: 2,
                  textAlign: { xs: 'center', md: 'left' },
                  px: { xs: 1, md: 0 }
                }}
              >
                At GraceCare Hospital, we combine cutting-edge medical technology with compassionate care. Our team of board-certified physicians and healthcare professionals are dedicated to providing personalized treatment plans that prioritize your health and wellbeing.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  color: '#555',
                  lineHeight: 1.8,
                  textAlign: { xs: 'center', md: 'left' },
                  px: { xs: 1, md: 0 }
                }}
              >
                With state-of-the-art facilities and a patient-first approach, we ensure every visit is comfortable, efficient, and focused on achieving the best possible outcomes for you and your family.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, md: 0 } }}>
                <Box
                  component="img"
                  src="/service.jpg"
                  alt="Why Choose Us"
                  sx={{
                    width: { xs: '80%', sm: '70%', md: '100%' },
                    maxWidth: 350,
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(20, 184, 166, 0.2)'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        id="cta"
        data-animate
        sx={{
          py: { xs: 6, md: 8 },
          background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
          textAlign: 'center',
          opacity: isVisible.cta ? 1 : 0,
          transform: isVisible.cta ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 700,
              color: 'white',
              mb: 2
            }}
          >
            Ready to Experience Quality Healthcare?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              color: 'rgba(255, 255, 255, 0.95)',
              mb: 4,
              px: { xs: 2, md: 0 }
            }}
          >
            Book your appointment today and take the first step towards better health
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/book-appointment')}
            sx={{
              bgcolor: 'white',
              color: '#14B8A6',
              px: 5,
              py: 1.5,
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'white',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)'
              }
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
