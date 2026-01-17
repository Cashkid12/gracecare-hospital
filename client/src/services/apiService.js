import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      console.warn('⚠️ Unauthorized - redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Don't throw error for profile endpoints - we'll use mock data instead
    if (error.config?.url?.includes('/profile')) {
      console.warn('📋 Profile API failed - will use mock data');
      // Return a mock response instead of throwing error
      return Promise.resolve({ 
        data: { 
          message: 'Using mock data - API unavailable',
          mock: true 
        } 
      });
    }
    
    return Promise.reject(error);
  }
);

// Mock data for when APIs are unavailable
const mockPatientProfile = {
  bloodGroup: 'A+',
  height: '175',
  weight: '70',
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '+1 (555) 987-6543'
  },
  insurance: {
    provider: 'HealthCare Plus',
    policyNumber: 'HCP123456',
    groupNumber: 'GRP789'
  },
  allergies: ['Penicillin', 'Peanuts'],
  currentMedications: ['Vitamin D', 'Blood Pressure Medication'],
  mock: true
};

const mockUserProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1990-01-01T00:00:00.000Z',
  gender: 'male',
  address: {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  profilePicture: '',
  mock: true
};

// Auth Services
export const authService = {
  login: (email, password, role) => 
    api.post('/auth/login', { email, password, role }),
  
  register: (userData) => 
    api.post('/auth/register', userData),
  
  getProfile: () => 
    api.get('/auth/me').catch(error => {
      console.warn('⚠️ Auth profile API failed, using mock data');
      return Promise.resolve({ data: mockUserProfile });
    }),
  
  updateProfile: (profileData) => 
    api.put('/auth/profile', profileData).catch(error => {
      console.warn('⚠️ Auth update profile API failed, simulating success');
      return Promise.resolve({ 
        data: { 
          message: 'Profile updated successfully (mock)',
          user: { ...mockUserProfile, ...profileData },
          mock: true
        } 
      });
    }),
};

// Appointment Services
export const appointmentService = {
  getAppointments: () => 
    api.get('/api/appointments').catch(error => {
      console.warn('⚠️ Appointments API failed, using empty data');
      return Promise.resolve({ 
        data: [], // EMPTY FOR NEW USERS
        mock: true
      });
    }),
  
  getAppointment: (id) => 
    api.get(`/api/appointments/${id}`),
  
  createAppointment: (appointmentData) => 
    api.post('/api/appointments', appointmentData).catch(error => {
      console.warn('⚠️ Create appointment API failed, simulating success');
      return Promise.resolve({ 
        data: { 
          message: 'Appointment created successfully (mock)',
          appointment: {
            _id: 'mock-' + Date.now(),
            ...appointmentData,
            status: 'scheduled'
          },
          mock: true
        } 
      });
    }),
  
  updateAppointment: (id, updateData) => 
    api.put(`/api/appointments/${id}`, updateData),
  
  deleteAppointment: (id) => 
    api.delete(`/api/appointments/${id}`),
};

// Doctor Services
export const doctorService = {
  getDoctors: () => 
    api.get('/api/doctors').catch(error => {
      console.warn('⚠️ Doctors API failed, using mock data');
      return Promise.resolve({ 
        data: [
          {
            _id: '1',
            user: { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@gracecare.com' },
            specialization: 'Cardiologist',
            department: 'Cardiology',
            experience: 12,
            consultationFee: 150
          },
          {
            _id: '2', 
            user: { firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@gracecare.com' },
            specialization: 'Pediatrician',
            department: 'Pediatrics',
            experience: 8,
            consultationFee: 120
          }
        ],
        mock: true
      });
    }),
  
  getDoctor: (id) => 
    api.get(`/api/doctors/${id}`),
  
  getDoctorsByDepartment: (department) => 
    api.get(`/api/doctors/department/${department}`),
  
  getProfile: () => 
    api.get('/api/doctors/profile').catch(error => {
      console.warn('⚠️ Doctor profile API failed, using mock data');
      return Promise.resolve({ 
        data: {
          ...mockUserProfile,
          specialization: 'Cardiologist',
          department: 'Cardiology',
          licenseNumber: 'MED123456',
          experience: 12,
          bio: 'Experienced cardiologist with 12 years of practice.',
          consultationFee: 150,
          education: [
            { degree: 'MD', university: 'Medical University', year: 2010 }
          ],
          languages: ['English', 'French'],
          mock: true
        }
      });
    }),
  
  updateProfile: (profileData) => 
    api.put('/api/doctors/profile', profileData).catch(error => {
      console.warn('⚠️ Doctor update profile API failed, simulating success');
      return Promise.resolve({ 
        data: { 
          message: 'Doctor profile updated successfully (mock)',
          doctor: profileData,
          mock: true
        } 
      });
    }),
};

// Patient Services
export const patientService = {
  getProfile: () => 
    api.get('/api/patients/profile').catch(error => {
      console.warn('⚠️ Patient profile API failed, using mock data');
      return Promise.resolve({ 
        data: mockPatientProfile
      });
    }),
  
  updateProfile: (profileData) => 
    api.put('/api/patients/profile', profileData).catch(error => {
      console.warn('⚠️ Patient update profile API failed, simulating success');
      return Promise.resolve({ 
        data: { 
          message: 'Patient profile updated successfully (mock)',
          patient: profileData,
          mock: true
        } 
      });
    }),
  
  getMedicalHistory: () => 
    api.get('/api/patients/medical-history').catch(error => {
      console.warn('⚠️ Medical history API failed, using empty data');
      return Promise.resolve({ 
        data: {
          allergies: [], // EMPTY FOR NEW USERS
          currentMedications: [], // EMPTY FOR NEW USERS
          medicalHistory: [], // EMPTY FOR NEW USERS
          bloodGroup: '',
          height: '',
          weight: '',
          mock: true
        }
      });
    }),

  // NEW: Medical Records Service
  getMedicalRecords: () => 
    api.get('/api/patients/medical-records').catch(error => {
      console.warn('⚠️ Medical records API failed, using empty data');
      return Promise.resolve({ 
        data: [], // EMPTY FOR NEW USERS
        mock: true
      });
    }),

  // NEW: Patient Statistics
  getPatientStats: () => 
    api.get('/api/patients/stats').catch(error => {
      console.warn('⚠️ Patient stats API failed, using empty data');
      return Promise.resolve({ 
        data: {
          totalVisits: 0, // ZERO FOR NEW USERS
          upcomingAppointments: 0, // ZERO FOR NEW USERS
          prescriptions: 0, // ZERO FOR NEW USERS
          nextCheckup: null, // NULL FOR NEW USERS
          mock: true
        }
      });
    }),

  // NEW: Patient Appointments
  getPatientAppointments: () => 
    api.get('/api/patients/appointments').catch(error => {
      console.warn('⚠️ Patient appointments API failed, using empty data');
      return Promise.resolve({ 
        data: [], // EMPTY FOR NEW USERS
        mock: true
      });
    }),
};

// Department Services
export const departmentService = {
  getDepartments: () => 
    api.get('/api/departments').catch(error => {
      console.warn('⚠️ Departments API failed, using mock data');
      return Promise.resolve({ 
        data: [
          { _id: '1', name: 'Cardiology', description: 'Heart care specialists' },
          { _id: '2', name: 'Pediatrics', description: 'Child healthcare' },
          { _id: '3', name: 'Dental Care', description: 'Oral health services' }
        ],
        mock: true
      });
    }),
  
  getDepartment: (id) => 
    api.get(`/api/departments/${id}`),
  
  getDepartmentByName: (name) => 
    api.get(`/api/departments/name/${name}`),
};

// Profile Services (General)
export const profileService = {
  updateUserProfile: (profileData) => 
    api.put('/api/auth/profile', profileData),
  
  uploadProfilePicture: (formData) => 
    api.post('/api/auth/upload-profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

// Admin Services
export const adminService = {
  // Stats
  getDashboardStats: () => 
    api.get('/api/admin/dashboard/stats'),

  // User Management
  getUsers: () => 
    api.get('/api/admin/users'),
  
  getDoctors: () => 
    api.get('/api/admin/doctors'),
  
  getPatients: () => 
    api.get('/api/admin/patients'),
  
  getUser: (id) => 
    api.get(`/api/admin/users/${id}`),
  
  updateUserStatus: (id, isActive) => 
    api.put(`/api/admin/users/${id}/status`, { isActive }),
  
  deleteUser: (id) => 
    api.delete(`/api/admin/users/${id}`),
  
  // Appointment Management
  getAppointments: () => 
    api.get('/api/admin/appointments'),
  
  updateAppointment: (id, updateData) => 
    api.put(`/api/appointments/${id}`, updateData), // Using main appointment update but as admin
  
  // Analytics
  getAnalytics: () => 
    api.get('/api/admin/analytics'),
  
  // System Settings
  getSystemSettings: () => 
    api.get('/api/admin/settings'),
  
  updateSystemSettings: (settings) => 
    api.put('/api/admin/settings', settings),
};

// Utility Services
export const utilityService = {
  // File Upload
  uploadFile: (formData) => 
    api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  // Contact Form
  submitContactForm: (formData) => 
    api.post('/api/contact', formData),
  
  // Newsletter Subscription
  subscribeNewsletter: (email) => 
    api.post('/api/newsletter/subscribe', { email }),
};

export default api;
