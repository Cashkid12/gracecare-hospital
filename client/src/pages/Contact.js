import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Paper,
  alpha,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Emergency Hotline',
      details: '+1 (555) 123-HELP',
      description: '24/7 Emergency Services',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Main Line',
      details: '+1 (555) 123-4567',
      description: 'Mon - Fri, 8:00 AM - 8:00 PM',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Email',
      details: 'info@gracecare.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: <LocationIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Location',
      details: '123 Healthcare Avenue',
      description: 'Medical District, City 10001',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha('#2B9ED8', 0.9)} 0%, ${alpha('#003B73', 0.9)} 100%), url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80') center/cover`,
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Contact Us
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto' }}>
            Get in touch with us. We're here to help you with all your healthcare needs.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              We're always ready to assist you with your healthcare journey. Reach out to us through any of the following channels.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {contactInfo.map((info, index) => (
                <Card key={index} sx={{ bgcolor: 'background.default' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      {info.icon}
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          {info.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {info.details}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {info.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Emergency Card */}
            <Paper
              sx={{
                bgcolor: 'error.main',
                color: 'white',
                p: 3,
                mt: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                🚨 Emergency Contact
              </Typography>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                +1 (555) 123-HELP
              </Typography>
              <Typography variant="body2">
                24/7 Emergency Medical Services Available
              </Typography>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                  Send us a Message
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Have questions about our services or need to schedule an appointment? Fill out the form below and we'll get back to you promptly.
                </Typography>

                {submitted && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Thank you for your message! We'll get back to you soon.
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ px: 4 }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;