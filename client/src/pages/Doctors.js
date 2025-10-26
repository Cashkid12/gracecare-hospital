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
  const doctors = [
    {
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      department: 'Cardiology',
      experience: 12,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      education: 'MD, Cardiology',
      languages: ['English', 'French'],
      consultationFee: 150,
    },
    {
      name: 'Dr. Michael Chen',
      specialization: 'Pediatrician',
      department: 'Pediatrics',
      experience: 8,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      education: 'MD, Pediatrics',
      languages: ['English', 'Spanish'],
      consultationFee: 120,
    },
    {
      name: 'Dr. Amina Diallo',
      specialization: 'Dentist',
      department: 'Dental Care',
      experience: 6,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      education: 'DDS, Cosmetic Dentistry',
      languages: ['English', 'French', 'Arabic'],
      consultationFee: 100,
    },
    {
      name: 'Dr. James Wilson',
      specialization: 'Neurologist',
      department: 'Neurology',
      experience: 15,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      education: 'MD, Neurology',
      languages: ['English'],
      consultationFee: 180,
    },
    {
      name: 'Dr. Maria Rodriguez',
      specialization: 'Orthopedic Surgeon',
      department: 'Orthopedics',
      experience: 10,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      education: 'MD, Orthopedic Surgery',
      languages: ['English', 'Spanish'],
      consultationFee: 160,
    },
    {
      name: 'Dr. David Kim',
      specialization: 'Emergency Medicine',
      department: 'Emergency',
      experience: 7,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      education: 'MD, Emergency Medicine',
      languages: ['English', 'Korean'],
      consultationFee: 130,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha('#2B9ED8', 0.9)} 0%, ${alpha('#003B73', 0.9)} 100%), url('https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80') center/cover`,
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Our Medical Experts
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto' }}>
            Meet our team of highly qualified and experienced healthcare professionals dedicated to your well-being.
          </Typography>
        </Container>
      </Box>

      {/* Doctors Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {doctors.map((doctor, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    height: 200,
                    background: `url('${doctor.image}') center/cover`,
                    position: 'relative',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {doctor.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary.main" gutterBottom>
                    {doctor.specialization}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {doctor.department} • {doctor.experience} years experience
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={doctor.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                      {doctor.rating}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {doctor.education}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    {doctor.languages.map((lang, langIndex) => (
                      <Chip
                        key={langIndex}
                        label={lang}
                        size="small"
                        variant="outlined"
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="h6" color="success.main">
                    ${doctor.consultationFee}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button variant="contained" fullWidth>
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

export default Doctors;