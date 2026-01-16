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
  alpha,
} from '@mui/material';
import {
  Favorite as HeartIcon,
  ChildFriendly as ChildIcon,
  LocalHospital as ToothIcon,
  Psychology as BrainIcon,
  Accessibility as BoneIcon,
  Emergency as EmergencyIcon,
} from '@mui/icons-material';

const Departments = () => {
  const departments = [
    {
      icon: <HeartIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Cardiology',
      description: 'Comprehensive heart care with advanced diagnostic tools and treatment.',
    },
    {
      icon: <ChildIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Pediatrics',
      description: 'Specialized care for children from infancy through adolescence.',
    },
    {
      icon: <ToothIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Dental Care',
      description: 'Complete dental services for optimal oral health and beautiful smiles.',
    },
    {
      icon: <BrainIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Neurology',
      description: 'Expert care for disorders of the nervous system and brain.',
    },
    {
      icon: <BoneIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Orthopedics',
      description: 'Specialized care for bones, joints, and musculoskeletal disorders.',
    },
    {
      icon: <EmergencyIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Emergency Medicine',
      description: '24/7 emergency care for critical conditions and trauma cases.',
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
            MEDICAL SPECIALTIES
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main', mb: 2 }}>
            Our Departments
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: 'text.secondary' }}>
            Comprehensive medical specialties under one roof, providing integrated healthcare solutions.
          </Typography>
        </Container>
      </Box>

      {/* Departments Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid 
          container 
          spacing={4}
          justifyContent="center"
        >
          {departments.map((dept, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={index}
              sx={{ display: 'flex' }}
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
                    '& .dept-icon': {
                      transform: 'scale(1.15) rotate(5deg)',
                      background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                    },
                  },
                }}
              >
                {/* Icon */}
                <Box 
                  className="dept-icon"
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
                  {dept.icon}
                </Box>
                
                {/* Department Name */}
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'secondary.main',
                    mb: 2,
                    fontSize: '1.5rem',
                  }}
                >
                  {dept.name}
                </Typography>
                
                {/* Description */}
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                  }}
                >
                  {dept.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Departments;