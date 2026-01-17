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

// Doctor Dashboard Pages
import DoctorAppointments from './pages/dashboard/doctor/DoctorAppointments';
import DoctorPatients from './pages/dashboard/doctor/DoctorPatients';
import DoctorLabResults from './pages/dashboard/doctor/DoctorLabResults';
import DoctorPrescriptions from './pages/dashboard/doctor/DoctorPrescriptions';
import DoctorMessages from './pages/dashboard/doctor/DoctorMessages';
import DoctorSettings from './pages/dashboard/doctor/DoctorSettings';

// Patient Dashboard Pages
import PatientAppointments from './pages/dashboard/patient/PatientAppointments';
import PatientRecords from './pages/dashboard/patient/PatientRecords';
import PatientLabResults from './pages/dashboard/patient/PatientLabResults';
import PatientPrescriptions from './pages/dashboard/patient/PatientPrescriptions';
import PatientMessages from './pages/dashboard/patient/PatientMessages';
import PatientSettings from './pages/dashboard/patient/PatientSettings';

// Profile Pages
import PatientProfile from './pages/profile/PatientProfile';
import DoctorProfile from './pages/profile/DoctorProfile';
import AdminProfile from './pages/profile/AdminProfile';

// Medical Pages - NEW
import MedicalRecords from './pages/medical/MedicalRecords';
import MedicalHistory from './pages/medical/MedicalHistory';

// Admin Management Pages
import AdminUsers from './pages/dashboard/admin/AdminUserManagement';
import AdminDoctors from './pages/dashboard/admin/AdminDoctorManagement';
import AdminPatients from './pages/dashboard/admin/AdminPatientManagement';
import AdminAppointments from './pages/dashboard/admin/AdminAppointmentManagement';
import AdminDepartments from './pages/dashboard/admin/AdminDepartmentManagement';
import AdminMedicalRecords from './pages/dashboard/admin/AdminMedicalRecords';
import AdminPrescriptions from './pages/dashboard/admin/AdminPrescriptions';
import AdminPayments from './pages/dashboard/admin/AdminPayments';
import AdminContent from './pages/dashboard/admin/AdminContentManagement';
import AdminMessages from './pages/dashboard/admin/AdminMessages';
import AdminAnalytics from './pages/dashboard/admin/AdminAnalytics';
import AdminSettings from './pages/dashboard/admin/AdminSettings';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#14B8A6', // Teal
      light: '#5EEAD4', // Light Aqua
      dark: '#0F766E', // Dark Teal
    },
    secondary: {
      main: '#06B6D4', // Cyan Blue
      light: '#67E8F9', // Light Cyan
      dark: '#0E7490', // Dark Cyan
    },
    success: {
      main: '#6EE7B7', // Mint Green
      light: '#A7F3D0', // Light Mint
      dark: '#34D399', // Emerald
    },
    background: {
      default: '#FFFFFF',
      paper: '#F0FDFA', // Very light teal
    },
    text: {
      primary: '#134E4A', // Dark teal for text
      secondary: '#0F766E', // Medium teal
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.25,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.35,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
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
          borderRadius: '8px',
          padding: '10px 24px',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: '0 4px 12px rgba(20, 184, 166, 0.25)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(20, 184, 166, 0.35)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@media (min-width: 600px)': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
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
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Routes>
              {/* Public Routes with Navbar/Footer */}
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
                  path="/patient-appointments" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientDashboard><PatientAppointments /></PatientDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/patient-records" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientDashboard><PatientRecords /></PatientDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/patient-lab-results" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientDashboard><PatientLabResults /></PatientDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/patient-prescriptions" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientDashboard><PatientPrescriptions /></PatientDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/patient-billing" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientDashboard><div>Billing Coming Soon</div></PatientDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/patient-messages" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientDashboard><PatientMessages /></PatientDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/patient-settings" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <PatientDashboard><PatientSettings /></PatientDashboard>
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
                  path="/doctor-appointments" 
                  element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorDashboard><DoctorAppointments /></DoctorDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor-patients" 
                  element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorDashboard><DoctorPatients /></DoctorDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor-lab-results" 
                  element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorDashboard><DoctorLabResults /></DoctorDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor-prescriptions" 
                  element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorDashboard><DoctorPrescriptions /></DoctorDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor-messages" 
                  element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorDashboard><DoctorMessages /></DoctorDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/doctor-settings" 
                  element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorDashboard><DoctorSettings /></DoctorDashboard>
                    </ProtectedRoute>
                  } 
                />
                {/* Admin Management Routes */}
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
                
                {/* Medical Pages - NEW ROUTES */}
                <Route 
                  path="/medical-records" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <MedicalRecords />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/medical-history" 
                  element={
                    <ProtectedRoute allowedRoles={['patient']}>
                      <MedicalHistory />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-users" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminUsers /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-doctors" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminDoctors /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-patients" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminPatients /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-appointments" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminAppointments /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-departments" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminDepartments /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-medical-records" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminMedicalRecords /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-prescriptions" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminPrescriptions /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-payments" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminPayments /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-content" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminContent /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-messages" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminMessages /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-analytics" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminAnalytics /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin-settings" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard><AdminSettings /></AdminDashboard>
                    </ProtectedRoute>
                  } 
                />
              
              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
