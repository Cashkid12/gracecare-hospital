import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  LocalHospital, 
  AccountCircle,
  Dashboard,
  Person,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    setMobileDrawerOpen(false);
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
    setMobileDrawerOpen(false);
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
    setMobileDrawerOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileDrawerOpen(false);
  };

  // Navigation items for drawer
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Services', path: '/services' },
    { label: 'Departments', path: '/departments' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  // Mobile Drawer Content
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      {/* Logo in Drawer */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Box
          component="img"
          src="/Logo.jpg"
          alt="GraceCare Logo"
          sx={{
            height: 50,
            width: 50,
            mr: 1.5,
            borderRadius: 1,
            objectFit: 'cover'
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
          GraceCare
        </Typography>
      </Box>

      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            onClick={() => handleNavigation(item.path)}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        
        {user && (
          <>
            <Divider />
            <ListItem onClick={handleDashboard} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem onClick={handleProfile} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            {user.role === 'patient' && (
              <ListItem 
                onClick={() => handleNavigation('/book-appointment')}
                sx={{ 
                  cursor: 'pointer', 
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'primary.dark' },
                  mx: 1,
                  borderRadius: 1,
                  mt: 1
                }}
              >
                <ListItemText primary="Book Appointment" sx={{ textAlign: 'center' }} />
              </ListItem>
            )}
          </>
        )}
      </List>

      {/* Auth Section in Drawer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        {user ? (
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
              {user.role}
            </Typography>
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={() => handleNavigation('/login')}
            >
              Login
            </Button>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={() => handleNavigation('/signup')}
            >
              Sign Up
            </Button>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={() => handleNavigation('/admin-login')}
              sx={{ 
                backgroundColor: 'secondary.main',
                '&:hover': { backgroundColor: 'secondary.dark' },
                mt: 1
              }}
            >
              Admin Login
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(10px)',
        color: 'text.primary', 
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        py: 1
      }}
    >
      <Toolbar sx={{ minHeight: '72px !important' }}>
        {/* Logo */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer', 
            flexGrow: isMobile ? 1 : 0,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
          onClick={() => navigate('/')}
        >
          <Box
            component="img"
            src="/Logo.jpg"
            alt="GraceCare Logo"
            sx={{
              height: 48,
              width: 48,
              mr: 2,
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(20, 184, 166, 0.3)',
                transform: 'translateY(-2px)'
              }
            }}
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700, 
              color: '#14B8A6',
              fontSize: { xs: '1.125rem', sm: '1.25rem' }
            }}
          >
            {isMobile ? 'GraceCare' : 'GraceCare Hospital'}
          </Typography>
        </Box>
        
        {/* Desktop Navigation Links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1, ml: 6, flexGrow: 1 }}>
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                color="inherit" 
                onClick={() => navigate(item.path)}
                sx={{
                  fontWeight: 500,
                  color: '#64748B',
                  px: 2,
                  py: 1,
                  borderRadius: '8px',
                  position: 'relative',
                  '&:hover': {
                    color: '#14B8A6',
                    bgcolor: 'rgba(20, 184, 166, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: '2px',
                    backgroundColor: '#14B8A6',
                    transition: 'width 0.3s ease',
                    borderRadius: '1px'
                  },
                  '&:hover::after': {
                    width: '70%'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Desktop User Menu / Login Buttons */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {user ? (
              <>
                {/* Book Appointment Button for Patients */}
                {user.role === 'patient' && (
                  <Button 
                    variant="contained" 
                    onClick={() => navigate('/book-appointment')}
                    sx={{ 
                      mr: 2,
                      boxShadow: '0 4px 16px rgba(20, 184, 166, 0.3)',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(20, 184, 166, 0.4)',
                        transform: 'translateY(-2px)'
                      }
                    }}
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
                    gap: 1.5,
                    px: 2,
                    py: 1,
                    borderRadius: '12px',
                    bgcolor: 'rgba(20, 184, 166, 0.05)',
                    color: '#14B8A6',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(20, 184, 166, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="caption" sx={{ textTransform: 'capitalize', opacity: 0.8 }}>
                      {user.role}
                    </Typography>
                  </Box>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 8,
                    sx: {
                      mt: 1.5,
                      borderRadius: '12px',
                      minWidth: 200,
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <MenuItem 
                    onClick={handleDashboard}
                    sx={{
                      py: 1.5,
                      px: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(20, 184, 166, 0.05)'
                      }
                    }}
                  >
                    <Dashboard sx={{ mr: 2, color: '#14B8A6' }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Dashboard</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Access your dashboard
                      </Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem 
                    onClick={handleProfile}
                    sx={{
                      py: 1.5,
                      px: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(20, 184, 166, 0.05)'
                      }
                    }}
                  >
                    <Person sx={{ mr: 2, color: '#14B8A6' }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>My Profile</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        View and edit profile
                      </Typography>
                    </Box>
                  </MenuItem>
                  <Divider />
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      py: 1.5,
                      px: 2,
                      color: '#EF4444',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(239, 68, 68, 0.05)'
                      }
                    }}
                  >
                    <Box sx={{ width: 24, mr: 2 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')}
                  sx={{
                    color: '#64748B',
                    fontWeight: 500,
                    px: 2,
                    '&:hover': {
                      color: '#14B8A6',
                      bgcolor: 'rgba(20, 184, 166, 0.05)'
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/signup')}
                  sx={{
                    boxShadow: '0 4px 16px rgba(20, 184, 166, 0.3)',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(20, 184, 166, 0.4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={() => setMobileDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;