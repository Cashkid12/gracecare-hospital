import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalHospital, Favorite, Security, Groups } from '@mui/icons-material';
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
          <Box sx={{ position: 'relative', height: { xs: 'auto', md: 600 } }}>
            {/* Text Content - LEFT */}
            <Box
              sx={{
                position: { xs: 'relative', md: 'absolute' },
                top: { xs: 0, md: '50%' },
                left: 0,
                transform: { xs: 'none', md: 'translateY(-50%)' },
                width: { xs: '100%', md: '55%' },
                zIndex: 3,
                mb: { xs: 6, md: 0 },
              }}
            >
              <Box 
                sx={{ 
                  px: { xs: 3, md: 5 },
                  py: { xs: 4, md: 6 },
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: 4,
                  boxShadow: '0 25px 60px rgba(20, 184, 166, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(20, 184, 166, 0.1)',
                }}
              >
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
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
            </Box>

            {/* Hero Image - RIGHT */}
            <Box
              sx={{
                position: { xs: 'relative', md: 'absolute' },
                top: { xs: 0, md: '50%' },
                right: 0,
                transform: { xs: 'none', md: 'translateY(-50%)' },
                width: { xs: '100%', md: '52%' },
                zIndex: 2,
                mt: { xs: -4, md: 0 },
                ml: { xs: 0, md: 'auto' },
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
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop"
                  alt="GraceCare Hospital"
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

      {/* Services Section */}
      <Box sx={{ py: 10, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#14B8A6',
              mb: 2,
              textAlign: 'center'
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748B',
              mb: 6,
              textAlign: 'center',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Comprehensive healthcare services tailored to your needs
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <LocalHospital sx={{ fontSize: 48, color: '#14B8A6' }} />,
                title: 'Emergency Care',
                description: '24/7 emergency services with state-of-the-art facilities'
              },
              {
                icon: <Favorite sx={{ fontSize: 48, color: '#14B8A6' }} />,
                title: 'Cardiology',
                description: 'Advanced heart care and cardiovascular treatments'
              },
              {
                icon: <Security sx={{ fontSize: 48, color: '#14B8A6' }} />,
                title: 'Surgery',
                description: 'Expert surgical procedures with modern technology'
              },
              {
                icon: <Groups sx={{ fontSize: 48, color: '#14B8A6' }} />,
                title: 'Pediatrics',
                description: 'Specialized care for infants, children, and adolescents'
              }
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(20, 184, 166, 0.2)'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ mb: 2 }}>{service.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: '#1E293B', mb: 1 }}
                    >
                      {service.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ py: 10, bgcolor: '#FAFAFA' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#14B8A6',
              mb: 6,
              textAlign: 'center'
            }}
          >
            Why Choose GraceCare?
          </Typography>
          <Box sx={{ position: 'relative', height: { xs: 'auto', md: 600 } }}>
            {/* Text Content - TOP LEFT */}
            <Box
              sx={{
                position: { xs: 'relative', md: 'absolute' },
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
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#14B8A6',
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  Excellence in Healthcare
                </Typography>
                <Typography variant="body1" sx={{ color: '#64748B', mb: 3, lineHeight: 1.8 }}>
                  At GraceCare Hospital, we combine cutting-edge medical technology with compassionate care to deliver exceptional healthcare services.
                </Typography>
                <Box component="ul" sx={{ color: '#64748B', pl: 2, '& li': { mb: 1.5 } }}>
                  <li>Experienced and certified medical professionals</li>
                  <li>State-of-the-art medical equipment and facilities</li>
                  <li>Patient-centered approach to healthcare</li>
                  <li>Comprehensive range of medical services</li>
                  <li>24/7 emergency care availability</li>
                </Box>
              </Box>
            </Box>

            {/* Image - BOTTOM RIGHT (Overlapping) */}
            <Box
              sx={{
                position: { xs: 'relative', md: 'absolute' },
                bottom: { xs: 0, md: '-60px' },
                right: 0,
                width: { xs: '100%', md: '52%' },
                zIndex: 2,
                mt: { xs: -4, md: 0 },
                ml: { xs: 0, md: 'auto' },
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
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&auto=format&fit=crop"
                  alt="Medical Team"
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

      <Footer />
    </Box>
  );
};

export default Home;