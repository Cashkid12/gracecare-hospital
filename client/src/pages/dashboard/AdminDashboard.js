import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import DashboardContent from './DashboardContent';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  LocalHospital as LocalHospitalIcon,
  LocalHospital as DoctorIcon,
  Person as PatientIcon,
  Event as AppointmentIcon,
  Analytics as AnalyticsIcon,
  Description as RecordsIcon,
  Assignment as PrescriptionIcon,
  Payment as PaymentIcon,
  Message as MessageIcon,
  Business as DepartmentIcon,
  Article as ContentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Folder as FolderIcon,
  Assessment as ReportIcon
} from '@mui/icons-material';

const AdminDashboard = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    // Add logout logic here
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const allMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin-dashboard' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin-analytics' },
    { text: 'Messages', icon: <MessageIcon />, path: '/admin-messages', badge: 3 },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin-users' },
    { text: 'Doctors', icon: <DoctorIcon />, path: '/admin-doctors' },
    { text: 'Patients', icon: <PatientIcon />, path: '/admin-patients' },
    { text: 'Appointments', icon: <AppointmentIcon />, path: '/admin-appointments' },
    { text: 'Departments', icon: <DepartmentIcon />, path: '/admin-departments' },
    { text: 'Medical Records', icon: <RecordsIcon />, path: '/admin-medical-records' },
    { text: 'Prescriptions', icon: <PrescriptionIcon />, path: '/admin-prescriptions' },
    { text: 'Payments', icon: <PaymentIcon />, path: '/admin-payments' },
    { text: 'Content', icon: <ContentIcon />, path: '/admin-content' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin-settings' }
  ];

  // Get active item based on current path
  const getActiveItem = () => {
    const currentPath = location.pathname;
    const activeItem = allMenuItems.find(item => item.path === currentPath);
    return activeItem ? activeItem.text : 'Dashboard';
  };

  const activeItem = getActiveItem();

  const menuSections = [
    {
      title: 'Main',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin-dashboard' },
        { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin-analytics' },
        { text: 'Messages', icon: <MessageIcon />, path: '/admin-messages', badge: 3 }
      ]
    },
    {
      title: 'Management',
      items: [
        { text: 'Users', icon: <PeopleIcon />, path: '/admin-users' },
        { text: 'Doctors', icon: <DoctorIcon />, path: '/admin-doctors' },
        { text: 'Patients', icon: <PatientIcon />, path: '/admin-patients' },
        { text: 'Appointments', icon: <AppointmentIcon />, path: '/admin-appointments' },
        { text: 'Departments', icon: <DepartmentIcon />, path: '/admin-departments' }
      ]
    },
    {
      title: 'Records',
      items: [
        { text: 'Medical Records', icon: <RecordsIcon />, path: '/admin-medical-records' },
        { text: 'Prescriptions', icon: <PrescriptionIcon />, path: '/admin-prescriptions' },
        { text: 'Payments', icon: <PaymentIcon />, path: '/admin-payments' },
        { text: 'Content', icon: <ContentIcon />, path: '/admin-content' }
      ]
    }
  ];

  const renderMenuItem = (item) => {
    const isActive = activeItem === item.text;
    const menuItemContent = (
      <ListItem
        component="div"
        onClick={() => handleMenuItemClick(item.path)}
        sx={{
          cursor: 'pointer',
          py: 1.25,
          px: sidebarCollapsed ? 1.5 : 2,
          mx: 1.5,
          mb: 0.5,
          borderRadius: 2,
          minHeight: 44,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          bgcolor: isActive ? '#F0FDFA' : 'transparent',
          '&::before': isActive ? {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 3,
            height: 20,
            bgcolor: '#14B8A6',
            borderRadius: '0 4px 4px 0'
          } : {},
          '&:hover': {
            bgcolor: isActive ? '#F0FDFA' : '#F8FAFC',
            '& .menu-icon': {
              color: '#14B8A6',
              transform: 'scale(1.1)'
            }
          }
        }}
      >
        <ListItemIcon
          className="menu-icon"
          sx={{
            minWidth: sidebarCollapsed ? 40 : 36,
            mr: sidebarCollapsed ? 0 : 1.5,
            color: isActive ? '#14B8A6' : '#64748B',
            justifyContent: 'center',
            transition: 'all 0.25s ease-in-out'
          }}
        >
          {item.badge ? (
            <Badge badgeContent={item.badge} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', minWidth: 16, height: 16 } }}>
              {item.icon}
            </Badge>
          ) : item.icon}
        </ListItemIcon>
        {!sidebarCollapsed && (
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#0F766E' : '#475569',
              fontSize: '0.875rem',
              letterSpacing: '0.01em'
            }}
          />
        )}
      </ListItem>
    );

    return sidebarCollapsed ? (
      <Tooltip key={item.text} title={item.text} placement="right" arrow>
        {menuItemContent}
      </Tooltip>
    ) : menuItemContent;
  };

  const drawer = (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FFFFFF',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        width: sidebarCollapsed ? 72 : 260,
        position: 'fixed',
        left: 0,
        top: 0,
        borderRight: '1px solid #E2E8F0',
        boxShadow: '4px 0 24px rgba(0,0,0,0.04)'
      }}
    >
      {/* Logo Section */}
      <Box sx={{
        px: sidebarCollapsed ? 2 : 2.5,
        py: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: sidebarCollapsed ? 'center' : 'space-between',
        gap: 2,
        borderBottom: '1px solid #F1F5F9'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          color: '#14B8A6'
        }}>
          <LocalHospitalIcon sx={{ fontSize: 28 }} />
          {!sidebarCollapsed && (
            <Typography variant="h6" fontWeight="700" sx={{ letterSpacing: -0.5, color: '#1E293B' }}>
              GraceCare
            </Typography>
          )}
        </Box>
        {!sidebarCollapsed && (
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: '#94A3B8',
              p: 0.5,
              '&:hover': { color: '#14B8A6', bgcolor: '#F0FDFA' }
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 2 }}>
        {menuSections.map((section, sectionIndex) => (
          <Box key={section.title} sx={{ mb: sectionIndex < menuSections.length - 1 ? 2 : 0 }}>
            {!sidebarCollapsed && (
              <Typography
                variant="caption"
                sx={{
                  px: 3,
                  py: 1,
                  display: 'block',
                  color: '#94A3B8',
                  fontWeight: 600,
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                {section.title}
              </Typography>
            )}
            <List sx={{ py: 0.5 }}>
              {section.items.map((item) => renderMenuItem(item))}
            </List>
            {sectionIndex < menuSections.length - 1 && !sidebarCollapsed && (
              <Divider sx={{ mx: 3, my: 1.5, borderColor: '#F1F5F9' }} />
            )}
          </Box>
        ))}
      </Box>

      {/* Bottom Section */}
      <Box sx={{ borderTop: '1px solid #F1F5F9', p: 1.5 }}>
        {/* Settings */}
        {renderMenuItem({ text: 'Settings', icon: <SettingsIcon />, path: '/admin-settings' })}
        
        {/* Logout */}
        <Tooltip title={sidebarCollapsed ? 'Logout' : ''} placement="right" arrow>
          <ListItem
            component="div"
            onClick={handleLogout}
            sx={{
              cursor: 'pointer',
              py: 1.25,
              px: sidebarCollapsed ? 1.5 : 2,
              mx: 1.5,
              mt: 0.5,
              borderRadius: 2,
              minHeight: 44,
              transition: 'all 0.25s ease-in-out',
              '&:hover': {
                bgcolor: '#FEF2F2',
                '& .logout-icon': {
                  color: '#DC2626'
                }
              }
            }}
          >
            <ListItemIcon
              className="logout-icon"
              sx={{
                minWidth: sidebarCollapsed ? 40 : 36,
                mr: sidebarCollapsed ? 0 : 1.5,
                color: '#64748B',
                justifyContent: 'center',
                transition: 'all 0.25s ease-in-out'
              }}
            >
              <LogoutIcon sx={{ fontSize: 22 }} />
            </ListItemIcon>
            {!sidebarCollapsed && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontWeight: 500,
                  color: '#64748B',
                  fontSize: '0.875rem'
                }}
              />
            )}
          </ListItem>
        </Tooltip>
      </Box>

      {/* Collapse Toggle (when collapsed) */}
      {sidebarCollapsed && (
        <Box sx={{ p: 1.5, borderTop: '1px solid #F1F5F9' }}>
          <Tooltip title="Expand sidebar" placement="right" arrow>
            <IconButton
              onClick={toggleSidebar}
              sx={{
                width: '100%',
                color: '#94A3B8',
                '&:hover': { color: '#14B8A6', bgcolor: '#F0FDFA' }
              }}
            >
              <ChevronRightIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${sidebarCollapsed ? 75 : 250}px)` },
          ml: { md: `${sidebarCollapsed ? 75 : 250}px` },
          bgcolor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          color: '#1E293B',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Admin Dashboard
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" sx={{ color: '#64748B' }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ p: 0, color: '#64748B' }}
            >
              <Avatar sx={{ width: 36, height: 36, bgcolor: '#14B8A6' }}>
                <AccountIcon />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <AccountIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Side Drawer */}
      <Box
        component="nav"
        sx={{
          width: { md: sidebarCollapsed ? 72 : 260 },
          flexShrink: { md: 0 },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 280,
              border: 'none',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)'
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: sidebarCollapsed ? 72 : 260,
              border: 'none',
              boxShadow: 'none',
              bgcolor: 'transparent',
              position: 'relative',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${sidebarCollapsed ? 75 : 250}px)` },
          mt: '64px',
          minHeight: 'calc(100vh - 64px)',
          p: 0,
          bgcolor: '#F8FAFC',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {children || <DashboardContent />}
      </Box>
    </Box>
  );
};

export default AdminDashboard;