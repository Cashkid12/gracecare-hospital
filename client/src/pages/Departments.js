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
      description: 'Comprehensive heart care with advanced diagnostic tools and treatment options for all cardiac conditions.',
      services: ['Echocardiography', 'Cardiac Catheterization', 'Pacemaker Implantation'],
      contact: 'cardiology@gracecare.com',
    },
    {
      icon: <ChildIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Pediatrics',
      description: 'Specialized care for children from infancy through adolescence with child-friendly environment.',
      services: ['Well-child Visits', 'Vaccinations', 'Developmental Assessments'],
      contact: 'pediatrics@gracecare.com',
    },
    {
      icon: <ToothIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Dental Care',
      description: 'Complete dental services for maintaining optimal oral health and beautiful smiles.',
      services: ['Teeth Cleaning', 'Root Canal Treatment', 'Dental Implants'],
      contact: 'dental@gracecare.com',
    },
    {
      icon: <BrainIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Neurology',
      description: 'Expert care for disorders of the nervous system, brain, and spinal cord.',
      services: ['EEG Testing', 'Neurological Consultation', 'Stroke Treatment'],
      contact: 'neurology@gracecare.com',
    },
    {
      icon: <BoneIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Orthopedics',
      description: 'Specialized care for bones, joints, and musculoskeletal system disorders.',
      services: ['Joint Replacement', 'Fracture Care', 'Sports Medicine'],
      contact: 'orthopedics@gracecare.com',
    },
    {
      icon: <EmergencyIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      name: 'Emergency Medicine',
      description: '24/7 emergency care for critical conditions and trauma cases.',
      services: ['Trauma Care', 'Critical Care', 'Emergency Surgery'],
      contact: 'emergency@gracecare.com',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha('#2B9ED8', 0.9)} 0%, ${alpha('#003B73', 0.9)} 100%), url('https://images.unsplash.com/photo-1584467735871-8db9ac8b15b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80') center/cover`,
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Our Departments
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto' }}>
            Comprehensive medical specialties under one roof, providing integrated healthcare solutions.
          </Typography>
        </Container>
      </Box>

      {/* Departments Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {departments.map((dept, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                  {dept.icon}
                  <Typography variant="h5" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                    {dept.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {dept.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    {dept.services.map((service, serviceIndex) => (
                      <Chip
                        key={serviceIndex}
                        label={service}
                        size="small"
                        sx={{ m: 0.5, bgcolor: 'primary.light', color: 'white' }}
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    📧 {dept.contact}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button variant="contained" size="small">
                    View Details
                  </Button>
                  <Button variant="outlined" size="small">
                    Book Appointment
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Departments;