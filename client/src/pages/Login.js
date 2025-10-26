import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Link
} from '@mui/material';
import {
  LocalHospital,
  Person,
  MedicalServices,
  Login as LoginIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.email || !formData.password || !formData.role) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      await login(formData.email, formData.password, formData.role);
      
      // Redirect based on role
      if (formData.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
      
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Side - Welcome Message */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <LocalHospital 
              sx={{ 
                fontSize: 80, 
                color: 'primary.main', 
                mb: 2,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
              }} 
            />
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                color: 'secondary.main',
                background: 'linear-gradient(45deg, #2B9ED8, #003B73)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              to GraceCare Hospital
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Access your medical records, book appointments, and manage your healthcare journey with us.
            </Typography>

            {/* Features List */}
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MedicalServices sx={{ color: 'success.main', mr: 2 }} />
                <Typography variant="body1">Book appointments easily</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Person sx={{ color: 'primary.main', mr: 2 }} />
                <Typography variant="body1">Access medical records</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalHospital sx={{ color: 'secondary.main', mr: 2 }} />
                <Typography variant="body1">Connect with healthcare professionals</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Login Form */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={8} 
            sx={{ 
              p: 4, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Sign In
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Choose your role and enter your credentials
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {/* Role Selection - Only Patient and Doctor */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>I am a...</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  label="I am a..."
                  onChange={handleChange}
                >
                  <MenuItem value="patient">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person />
                      <Typography>Patient</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value="doctor">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalHospital />
                      <Typography>Doctor</Typography>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Email Field */}
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  sx: { borderRadius: 2 },
                  endAdornment: (
                    <Button
                      onClick={togglePasswordVisibility}
                      sx={{ minWidth: 'auto', p: 1 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  )
                }}
              />

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={<LoginIcon />}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  mb: 3,
                  background: 'linear-gradient(45deg, #2B9ED8, #003B73)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0070B8, #001A49)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(43, 158, 216, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  New to GraceCare?
                </Typography>
              </Divider>

              {/* Sign Up Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Don't have an account?
                </Typography>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'primary.50',
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Create Account
                </Button>
              </Box>

              {/* Admin Login Link */}
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Are you an administrator?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/admin-login" 
                    sx={{ 
                      textDecoration: 'none',
                      fontWeight: 600,
                      color: 'secondary.main',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Access Admin Portal
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>

          {/* Demo Accounts Info */}
          <Card 
            variant="outlined" 
            sx={{ 
              mt: 3, 
              p: 2,
              backgroundColor: 'info.50',
              borderColor: 'info.main'
            }}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'info.dark' }}>
                Demo Accounts
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Patient:</strong> patient@gracecare.com / password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Doctor:</strong> doctor@gracecare.com / password
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;