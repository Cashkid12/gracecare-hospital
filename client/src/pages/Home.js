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
          display: 'flex',
          alignItems: 'center',
          px: { xs: '32px', md: '80px' },
          background: '#FAFAFA',
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 4, md: 6 },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            {/* Left Content - 55% */}
            <Box
              sx={{
                width: { xs: '100%', md: '55%' },
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ maxWidth: '520px' }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    fontWeight: 700,
                    color: '#14B8A6',
                    mb: 3,
                    lineHeight: 1.1,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                  }}
                >
                  Welcome to GraceCare Hospital
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    color: '#64748B',
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  Your health is our priority. Experience compassionate, world-class medical care with our dedicated team of healthcare professionals.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box
                    component="button"
                    onClick={() => navigate('/book-appointment')}
                    sx={{
                      background: '#14B8A6',
                      color: 'white',
                      px: 3.5,
                      py: 1.75,
                      fontSize: '1rem',
                      borderRadius: '9999px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: '#0F9D8E',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(20, 184, 166, 0.3)'
                      }
                    }}
                  >
                    Book Appointment
                  </Box>
                  <Box
                    component="button"
                    onClick={() => navigate('/services')}
                    sx={{
                      background: 'transparent',
                      color: '#14B8A6',
                      px: 3.5,
                      py: 1.75,
                      fontSize: '1rem',
                      borderRadius: '9999px',
                      fontWeight: 600,
                      border: '2px solid #14B8A6',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(20, 184, 166, 0.1)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Our Services
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Right Image - 45% */}
            <Box
              sx={{
                width: { xs: '100%', md: '45%' },
                height: { xs: '400px', md: '70vh' },
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/doctor1.jpg"
                alt="GraceCare Hospital"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: 'scale(1.05)',
                }}
              />
              {/* Gradient Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, rgba(20, 184, 166, 0.2) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
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
      <Box sx={{ py: { xs: '32px', md: '80px' }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          {/* Section Heading */}
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: '#14B8A6',
                mb: 1.5,
              }}
            >
              Why Choose GraceCare
            </Typography>
            <Box
              sx={{
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #14B8A6 0%, #6EE7B7 100%)',
                borderRadius: '2px',
                margin: '0 auto',
              }}
            />
          </Box>

          {/* Two Column Layout */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 4, md: 8 },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            {/* Left Content - 50% */}
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.75rem', md: '2rem' },
                  fontWeight: 700,
                  color: '#14B8A6',
                  mb: 3,
                }}
              >
                Excellence in Healthcare
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#64748B',
                  mb: 4,
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                }}
              >
                At GraceCare Hospital, we combine cutting-edge medical technology with compassionate care to deliver exceptional healthcare services.
              </Typography>

              {/* Feature List with Icons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { icon: <LocalHospital sx={{ fontSize: 24, color: '#14B8A6' }} />, text: 'Experienced and certified medical professionals' },
                  { icon: <Favorite sx={{ fontSize: 24, color: '#14B8A6' }} />, text: 'State-of-the-art medical equipment and facilities' },
                  { icon: <Security sx={{ fontSize: 24, color: '#14B8A6' }} />, text: 'Patient-centered approach to healthcare' },
                  { icon: <Groups sx={{ fontSize: 24, color: '#14B8A6' }} />, text: 'Comprehensive range of medical services' },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: 'rgba(20, 184, 166, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#475569',
                        fontSize: { xs: '0.95rem', md: '1rem' },
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right Image - 50% */}
            <Box
              sx={{
                width: { xs: '100%', md: '50%' },
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&auto=format&fit=crop"
                alt="Medical Team"
                sx={{
                  width: '100%',
                  maxHeight: { xs: '350px', md: '500px' },
                  objectFit: 'cover',
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;