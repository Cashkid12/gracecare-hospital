import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Basic Pages
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import SignUp from './pages/SignUp';
import BookAppointment from './pages/BookAppointment';

// Dashboard Pages
import PatientDashboard from './pages/dashboard/PatientDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Profile Pages
import PatientProfile from './pages/profile/PatientProfile';
import DoctorProfile from './pages/profile/DoctorProfile';
import AdminProfile from './pages/profile/AdminProfile';

// Admin Management Pages
import AdminUsers from './pages/admin/AdminUsers';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminAnalytics from './pages/admin/AdminAnalytics';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2B9ED8',
      light: '#67C2F0',
      dark: '#0070B8',
    },
    secondary: {
      main: '#003B73',
      light: '#3F5F8F',
      dark: '#001A49',
    },
    success: {
      main: '#5BD47A',
      light: '#8EFFA8',
      dark: '#1DA24F',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: '0 2px 8px rgba(43, 158, 216, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(43, 158, 216, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

// 404 Component
const NotFoundPage = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="50vh"
      flexDirection="column"
      textAlign="center"
      padding="2rem"
    >
      <Typography variant="h4" color="secondary.main" gutterBottom sx={{ fontWeight: 700 }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        The page you're looking for doesn't exist.
      </Typography>
      <Button 
        variant="contained" 
        sx={{ mt: 2 }}
        onClick={() => window.location.href = '/'}
      >
        Go Home
      </Button>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                
                {/* Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* Dashboard Routes */}
                <Route 
                  path="/patient-dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor-dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Profile Routes */}
                <Route 
                  path="/patient-profile" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor-profile" 
                  element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-profile" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminProfile />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin Management Routes - NEWLY ADDED */}
                <Route 
                  path="/admin-users" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminUsers />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-appointments" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminAppointments />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-departments" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDepartments />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-analytics" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminAnalytics />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;