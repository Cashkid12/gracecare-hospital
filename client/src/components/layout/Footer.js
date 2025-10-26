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
        bgcolor: 'secondary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Hospital Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HospitalIcon sx={{ mr: 1, fontSize: 32 }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                GraceCare Hospital
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Your Health, Our Priority. Providing world-class healthcare services with compassion and excellence since 2010.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'white', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: 'white', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: 'white', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: 'white', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Home
              </Link>
              <Link href="/about" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                About Us
              </Link>
              <Link href="/services" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Services
              </Link>
              <Link href="/doctors" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Doctors
              </Link>
            </Box>
          </Grid>

          {/* Departments */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Departments
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/departments#cardiology" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Cardiology
              </Link>
              <Link href="/departments#pediatrics" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Pediatrics
              </Link>
              <Link href="/departments#dental" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Dental Care
              </Link>
              <Link href="/departments#neurology" color="inherit" sx={{ textDecoration: 'none', opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Neurology
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                123 Healthcare Avenue<br />
                Medical District, City 10001
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                📞 +1 (555) 123-HELP<br />
                📧 info@gracecare.com
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                ⏰ Emergency: 24/7<br />
                ⏰ OPD: 8:00 AM - 8:00 PM
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            pt: 3,
            mt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} GraceCare Hospital. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;