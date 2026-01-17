import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  LocalHospital as HospitalIcon,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0F766E',
        color: 'white',
        py: { xs: 6, md: 8 },
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #14B8A6 0%, #6EE7B7 100%)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Hospital Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                component="img"
                src="/Logo.jpg"
                alt="GraceCare Logo"
                sx={{
                  height: 48,
                  width: 48,
                  mr: 2.5,
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                GraceCare Hospital
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 3, 
                opacity: 0.85,
                lineHeight: 1.7,
                maxWidth: '300px'
              }}
            >
              Your Health, Our Priority. Providing world-class healthcare services with compassion and excellence since 2010.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  opacity: 0.9, 
                  width: 40,
                  height: 40,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { 
                    opacity: 1,
                    bgcolor: 'rgba(91, 212, 122, 0.25)',
                    transform: 'translateY(-4px) scale(1.1)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                  } 
                }}
              >
                <FacebookIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  opacity: 0.9, 
                  width: 40,
                  height: 40,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { 
                    opacity: 1,
                    bgcolor: 'rgba(91, 212, 122, 0.25)',
                    transform: 'translateY(-4px) scale(1.1)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                  } 
                }}
              >
                <TwitterIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  opacity: 0.9, 
                  width: 40,
                  height: 40,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { 
                    opacity: 1,
                    bgcolor: 'rgba(91, 212, 122, 0.25)',
                    transform: 'translateY(-4px) scale(1.1)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                  } 
                }}
              >
                <InstagramIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  opacity: 0.9, 
                  width: 40,
                  height: 40,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { 
                    opacity: 1,
                    bgcolor: 'rgba(91, 212, 122, 0.25)',
                    transform: 'translateY(-4px) scale(1.1)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                  } 
                }}
              >
                <LinkedInIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 2.5,
                fontSize: { xs: '1.125rem', sm: '1.25rem' }
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/doctors', label: 'Doctors' },
                { href: '/departments', label: 'Departments' },
                { href: '/contact', label: 'Contact' }
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  color="inherit" 
                  sx={{ 
                    textDecoration: 'none', 
                    opacity: 0.85, 
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'block',
                    py: 0.5,
                    '&:hover': { 
                      opacity: 1,
                      pl: 1,
                      color: '#A7F3D0'
                    } 
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Departments */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 2.5,
                fontSize: { xs: '1.125rem', sm: '1.25rem' }
              }}
            >
              Departments
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { href: '/departments#cardiology', label: 'Cardiology' },
                { href: '/departments#pediatrics', label: 'Pediatrics' },
                { href: '/departments#dental', label: 'Dental Care' },
                { href: '/departments#neurology', label: 'Neurology' },
                { href: '/departments#orthopedics', label: 'Orthopedics' }
              ].map((dept) => (
                <Link 
                  key={dept.href}
                  href={dept.href} 
                  color="inherit" 
                  sx={{ 
                    textDecoration: 'none', 
                    opacity: 0.85, 
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'block',
                    py: 0.5,
                    '&:hover': { 
                      opacity: 1,
                      pl: 1,
                      color: '#A7F3D0'
                    } 
                  }}
                >
                  {dept.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                mb: 2.5,
                fontSize: { xs: '1.125rem', sm: '1.25rem' }
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9,
                    fontWeight: 500,
                    mb: 0.5
                  }}
                >
                  Address
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
                  Kasarani, Nairobi<br />
                  Kenya
                </Typography>
              </Box>
              <Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9,
                    fontWeight: 500,
                    mb: 0.5
                  }}
                >
                  Phone Numbers
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
                  📞 0701747503<br />
                  📞 0729526791<br />
                  📧 gracecare@gmail.com
                </Typography>
              </Box>
              <Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.9,
                    fontWeight: 500,
                    mb: 0.5
                  }}
                >
                  Working Hours
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
                  ⏰ Emergency: 24/7<br />
                  ⏰ OPD: 8:00 AM - 8:00 PM
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            pt: { xs: 4, md: 5 },
            mt: { xs: 5, md: 6 },
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.8,
              fontSize: '0.875rem'
            }}
          >
            © {new Date().getFullYear()} GraceCare Hospital. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;