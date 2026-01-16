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
  alpha,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  VideoCall as VideoIcon,
  FolderShared as FolderIcon,
  Description as ReportIcon,
  MonitorHeart as MonitorIcon,
  SmartToy as AIIcon,
  Emergency as EmergencyIcon,
  LocalPharmacy as PharmacyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <CalendarIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Online Appointment Booking',
      description: 'Easy and fast doctor appointment scheduling system. Book your appointments online 24/7 with instant confirmation and reminders.',
      link: '/book-appointment',
    },
    {
      icon: <VideoIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Virtual Consultation',
      description: 'Secure video and chat consultations with doctors. Get professional medical advice from the comfort of your home.',
      link: '/services',
    },
    {
      icon: <FolderIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Patient Management System',
      description: 'Comprehensive digital records, profiles, and visit history management. Access your complete medical information anytime.',
      link: '/services',
    },
    {
      icon: <ReportIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Medical Reports & Records',
      description: 'Access, upload, and download medical reports online. Keep all your health documents organized in one secure place.',
      link: '/services',
    },
    {
      icon: <MonitorIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Health Monitoring',
      description: 'Track vitals, symptoms, and health progress over time. Get insights and alerts about your health metrics.',
      link: '/services',
    },
    {
      icon: <AIIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'AI Health Assistance',
      description: 'AI-powered symptom checking and personalized health recommendations. Smart healthcare at your fingertips.',
      link: '/services',
    },
    {
      icon: <EmergencyIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Emergency Support',
      description: 'Quick access to emergency contacts and 24/7 emergency medical services. Help is always just a click away.',
      link: '/contact',
    },
    {
      icon: <PharmacyIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Prescription Management',
      description: 'View and manage prescriptions digitally. Track medications, refills, and get reminders for your medicines.',
      link: '/services',
    },
  ];

  const handleLearnMore = (link) => {
    navigate(link);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
          py: 6,
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
            HEALTHCARE SERVICES
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Our Services
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: 'text.secondary', fontWeight: 400 }}>
            Comprehensive healthcare services designed to meet all your medical needs with excellence and compassion.
          </Typography>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid 
          container 
          spacing={3} 
          alignItems="stretch"
          justifyContent="center"
        >
          {services.map((service, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={6} 
              lg={6} 
              key={index}
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Card 
                sx={{ 
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center', 
                  p: 3,
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
                    '& .service-icon': {
                      transform: 'scale(1.15) rotate(5deg)',
                      background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                    },
                  },
                }}
              >
                {/* Icon - Fixed Size */}
                <Box 
                  className="service-icon"
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
                  {service.icon}
                </Box>
                
                {/* Title - Fixed Height */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'secondary.main',
                    mb: 2,
                    fontSize: '1.1rem',
                    height: '2.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {service.title}
                </Typography>
                
                {/* Description - Flexible Height */}
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                  }}
                >
                  {service.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;