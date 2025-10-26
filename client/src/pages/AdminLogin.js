import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Card,
  Divider
} from '@mui/material';
import {
  AdminPanelSettings,
  Login as LoginIcon,
  Security,
  MedicalServices
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdminSetup, setShowAdminSetup] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError('Please enter both email and password');
        setLoading(false);
        return;
      }

      // Always use 'admin' role for admin login
      await login(formData.email, formData.password, 'admin');
      navigate('/admin-dashboard');
      
    } catch (err) {
      if (err.message.includes('No admin account')) {
        setShowAdminSetup(true);
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const createAdminAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Auto-fill the credentials
        setFormData({
          email: 'admin@gracecare.com',
          password: 'admin123'
        });
        setShowAdminSetup(false);
        setError('');
      } else {
        setError(data.message || 'Failed to create admin account');
      }
    } catch (error) {
      setError('Failed to create admin account. Please check your server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        py: 4,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ width: '100%' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <MedicalServices 
            sx={{ 
              fontSize: 64, 
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
              background: 'linear-gradient(45deg, #2B9ED8, #003B73)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            GraceCare Hospital
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Administrator Portal
          </Typography>
        </Box>

        <Paper 
          elevation={8} 
          sx={{ 
            p: 4, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '2px solid',
            borderColor: 'primary.main'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <AdminPanelSettings 
              sx={{ 
                fontSize: 48, 
                color: 'secondary.main', 
                mb: 2 
              }} 
            />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Admin Sign In
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Access the hospital management system
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
              action={
                error.includes('No admin account') && (
                  <Button color="inherit" size="small" onClick={createAdminAccount}>
                    Create Admin
                  </Button>
                )
              }
            >
              {error}
            </Alert>
          )}

          {showAdminSetup && (
            <Card 
              variant="outlined" 
              sx={{ 
                mb: 3, 
                p: 2,
                backgroundColor: 'info.50',
                borderColor: 'info.main'
              }}
            >
              <Typography variant="h6" gutterBottom color="info.dark">
                <Security sx={{ mr: 1 }} />
                Admin Setup Required
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                No admin account found. Create the default admin account to access the system.
              </Typography>
              <Button 
                variant="contained" 
                onClick={createAdminAccount}
                disabled={loading}
                fullWidth
              >
                {loading ? 'Creating...' : 'Create Admin Account'}
              </Button>
            </Card>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Admin Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />

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
              {loading ? 'Signing In...' : 'Sign In as Admin'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Patient or Doctor?
            </Typography>
          </Divider>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.50'
                }
              }}
            >
              Go to Patient/Doctor Login
            </Button>
          </Box>
        </Paper>

        {/* Admin Credentials Info */}
        <Card 
          variant="outlined" 
          sx={{ 
            mt: 3, 
            p: 2,
            backgroundColor: 'warning.50',
            borderColor: 'warning.main'
          }}
        >
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'warning.dark' }}>
            Default Admin Credentials
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Email:</strong> admin@gracecare.com
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Password:</strong> admin123
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminLogin;