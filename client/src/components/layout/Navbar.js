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
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'text.primary', boxShadow: 2 }}>
      <Toolbar>
        {/* Logo */}
        <Box 
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexGrow: isMobile ? 1 : 0 }}
          onClick={() => navigate('/')}
        >
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
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
            {isMobile ? 'GraceCare' : 'GraceCare Hospital'}
          </Typography>
        </Box>
        
        {/* Desktop Navigation Links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2, ml: 4, flexGrow: 1 }}>
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                color="inherit" 
                onClick={() => navigate(item.path)}
                sx={{
                  fontWeight: 600,
                  color: 'secondary.main',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'rgba(20, 184, 166, 0.08)',
                  },
                  transition: 'all 0.3s ease',
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
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="outlined" onClick={() => navigate('/signup')}>
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