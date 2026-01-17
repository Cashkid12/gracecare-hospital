import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, IconButton, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalHospital, Favorite, Security, People, ExpandMore } from '@mui/icons-material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import ServiceCard from '../components/ui/ServiceCard';

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
    <Box sx={{ bgcolor: '#FAFAFA', position: 'relative' }}>
      <Navbar />

      {/* Hero Section */}
      <Hero
        title="Welcome to GraceCare Hospital"
        subtitle="Premium Healthcare Services"
        description="Your health is our priority. Experience compassionate, world-class medical care with our team of expert healthcare professionals dedicated to your wellbeing."
        imageSrc="/doctor1.jpg"
        imageAlt="GraceCare Hospital"
        primaryButtonText="Book Appointment"
        primaryButtonOnClick={() => navigate('/book-appointment')}
        secondaryButtonText="Our Services"
        secondaryButtonOnClick={() => navigate('/services')}
        backgroundColor="gradient"
        minHeight={{ xs: 'auto', md: '85vh' }}
      />

      {/* Services Section */}
      <Section
        id="services"
        data-animate
        title="Our Services"
        subtitle="Comprehensive healthcare services designed for your wellbeing"
        backgroundColor="white"
        padding="section"
      >
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                variant="vertical"
                sx={{
                  height: '100%',
                  opacity: isVisible.services ? 1 : 1,
                  transform: isVisible.services ? 'translateY(0)' : 'translateY(0)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                }}
                onClick={() => setExpandedService(expandedService === index ? null : index)}
              >
                <Collapse in={expandedService === index}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748B',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      mt: 2,
                      textAlign: 'center'
                    }}
                  >
                    {service.description}
                  </Typography>
                </Collapse>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <IconButton
                    size="small"
                    sx={{
                      transform: expandedService === index ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                      color: '#14B8A6'
                    }}
                  >
                    <ExpandMore />
                  </IconButton>
                </Box>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Why Choose Us Section - Asymmetric Layout */}
      <Box 
        id="why-choose"
        data-animate
        sx={{ 
          bgcolor: '#F0FDFA', 
          py: { xs: 8, md: 12 }, 
          position: 'relative', 
          overflow: 'hidden' 
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', minHeight: { xs: '500px', md: '70vh' } }}>
            {/* Text Content - TOP LEFT */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: { xs: '100%', md: '55%' },
                zIndex: 3,
                mb: { xs: 6, md: 0 },
              }}
            >
              <Box 
                sx={{ 
                  px: { xs: 3, md: 5 },
                  py: { xs: 4, md: 6 },
                  bgcolor: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: 4,
                  boxShadow: '0 25px 60px rgba(20, 184, 166, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(20, 184, 166, 0.1)',
                }}
              >
                <Typography 
                  variant="h3" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#14B8A6', 
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    mb: 3
                  }}
                >
                  Why Choose GraceCare?
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 4, 
                    lineHeight: 1.8, 
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    color: '#64748B'
                  }}
                >
                  At GraceCare Hospital, we combine cutting-edge medical technology with compassionate care. Our team of board-certified physicians and healthcare professionals are dedicated to providing personalized treatment plans that prioritize your health and wellbeing.
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ 
                    lineHeight: 1.8, 
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    color: '#64748B'
                  }}
                >
                  With state-of-the-art facilities and a patient-first approach, we ensure every visit is comfortable, efficient, and focused on achieving the best possible outcomes for you and your family.
                </Typography>
              </Box>
            </Box>

            {/* Image - BOTTOM RIGHT (Overlapping) */}
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: '-20px', md: '-60px' },
                right: 0,
                width: { xs: '90%', md: '52%' },
                zIndex: 2,
                mt: { xs: -4, md: 0 },
                ml: 'auto',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 300, md: 500 },
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 30px 80px rgba(20, 184, 166, 0.25)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 40px 100px rgba(20, 184, 166, 0.35)',
                  },
                }}
              >
                <Box
                  component="img"
                  src="/service.jpg"
                  alt="Why Choose GraceCare"
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Section
        backgroundColor="linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)"
        padding="compact"
        sx={{
          textAlign: 'center',
          color: 'white',
          opacity: isVisible.cta ? 1 : 0,
          transform: isVisible.cta ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              color: 'white',
              mb: 3
            }}
          >
            Ready to Experience Quality Healthcare?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: 'rgba(255, 255, 255, 0.95)',
              mb: 4,
              px: { xs: 2, md: 0 }
            }}
          >
            Book your appointment today and take the first step towards better health
          </Typography>
          <Box
            component="button"
            onClick={() => navigate('/book-appointment')}
            sx={{
              bgcolor: 'white',
              color: '#14B8A6',
              px: { xs: 4, md: 6 },
              py: 2,
              fontSize: { xs: '1rem', md: '1.125rem' },
              borderRadius: '12px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)'
              }
            }}
          >
            Get Started Now
          </Box>
        </Box>
      </Section>

      <Footer />
    </Box>
  );
};

export default Home;