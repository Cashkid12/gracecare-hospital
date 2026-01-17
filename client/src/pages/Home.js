import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#FAFAFA', position: 'relative' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '85vh',
          py: 10,
          background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                color: '#14B8A6',
                mb: 3,
                lineHeight: 1.2
              }}
            >
              Welcome to GraceCare Hospital
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: '#64748B',
                mb: 4,
                lineHeight: 1.6
              }}
            >
              Your health is our priority. Experience compassionate, world-class medical care.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box
                component="button"
                onClick={() => navigate('/book-appointment')}
                sx={{
                  background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  borderRadius: 3,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(20, 184, 166, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(20, 184, 166, 0.4)'
                  }
                }}
              >
                Book Appointment
              </Box>
              <Box
                component="button"
                onClick={() => navigate('/services')}
                sx={{
                  borderColor: '#14B8A6',
                  color: '#14B8A6',
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  borderRadius: 3,
                  fontWeight: 600,
                  borderWidth: 2,
                  backgroundColor: 'white',
                  cursor: 'pointer',
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
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;