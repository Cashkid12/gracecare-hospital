import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  LocalHospital, 
  AccountCircle,
  Dashboard,
  Person 
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleDashboard = () => {
    if (user?.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (user?.role === 'doctor') {
      navigate('/doctor-dashboard');
    } else {
      navigate('/patient-dashboard');
    }
    handleClose();
  };

  const handleProfile = () => {
    if (user?.role === 'admin') {
      navigate('/admin-profile');
    } else if (user?.role === 'doctor') {
      navigate('/doctor-profile');
    } else {
      navigate('/patient-profile');
    }
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'text.primary', boxShadow: 2 }}>
      <Toolbar>
        {/* Logo */}
        <Box 
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <LocalHospital sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
            GraceCare Hospital
          </Typography>
        </Box>
        
        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2, ml: 4, flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/doctors')}>Doctors</Button>
          <Button color="inherit" onClick={() => navigate('/services')}>Services</Button>
          <Button color="inherit" onClick={() => navigate('/departments')}>Departments</Button>
          <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
        </Box>

        {/* User Menu / Login Buttons */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {user ? (
            <>
              {/* Book Appointment Button for Patients */}
              {user.role === 'patient' && (
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/book-appointment')}
                  sx={{ mr: 1 }}
                >
                  Book Appointment
                </Button>
              )}
              
              {/* User Menu */}
              <Button
                color="inherit"
                onClick={handleMenu}
                startIcon={<AccountCircle />}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1 
                }}
              >
                {user.firstName} {user.lastName}
                <Typography variant="body2" sx={{ ml: 1, textTransform: 'capitalize' }}>
                  ({user.role})
                </Typography>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDashboard}>
                  <Dashboard sx={{ mr: 2 }} />
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleProfile}>
                  <Person sx={{ mr: 2 }} />
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Regular User Login/Signup */}
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="outlined" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
              
              {/* Admin Login Separator */}
              <Typography color="text.secondary">|</Typography>
              
              {/* Admin Login */}
              <Button 
                variant="contained" 
                onClick={() => navigate('/admin-login')}
                sx={{ 
                  backgroundColor: 'secondary.main',
                  '&:hover': {
                    backgroundColor: 'secondary.dark'
                  }
                }}
              >
                Admin Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;