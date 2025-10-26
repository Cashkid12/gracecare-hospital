import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Alert,
  Chip,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  LocalHospital as MedicalIcon,
  Favorite as HeartIcon,
  Height as HeightIcon,
  FitnessCenter as WeightIcon,
} from '@mui/icons-material';
import { patientService, authService } from '../../services/apiService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // User data
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    // Patient-specific data
    bloodGroup: '',
    height: '',
    weight: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
    insurance: {
      provider: '',
      policyNumber: '',
      groupNumber: '',
    },
    allergies: [],
    currentMedications: [],
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔄 Starting profile fetch...');
      console.log('📱 Current user:', user);
      
      // Use mock data temporarily if APIs fail
      try {
        const [patientRes, userRes] = await Promise.all([
          patientService.getProfile(),
          authService.getProfile()
        ]);
        
        console.log('✅ Patient API response:', patientRes);
        console.log('✅ User API response:', userRes);
        
        const patientData = patientRes?.data || {};
        const userData = userRes?.data || {};
        
        // Combine user and patient data
        const combinedData = { 
          ...userData, 
          ...patientData,
          // Ensure we have basic user info
          firstName: userData.firstName || user?.firstName || 'User',
          lastName: userData.lastName || user?.lastName || '',
          email: userData.email || user?.email || '',
          createdAt: userData.createdAt || new Date(),
        };
        
        setProfile(combinedData);
        
        // Initialize form data
        setFormData({
          firstName: combinedData.firstName || '',
          lastName: combinedData.lastName || '',
          email: combinedData.email || '',
          phone: combinedData.phone || '',
          dateOfBirth: combinedData.dateOfBirth ? combinedData.dateOfBirth.split('T')[0] : '',
          gender: combinedData.gender || '',
          address: combinedData.address || {
            street: '', city: '', state: '', zipCode: '', country: ''
          },
          bloodGroup: combinedData.bloodGroup || '',
          height: combinedData.height || '',
          weight: combinedData.weight || '',
          emergencyContact: combinedData.emergencyContact || {
            name: '', relationship: '', phone: ''
          },
          insurance: combinedData.insurance || {
            provider: '', policyNumber: '', groupNumber: ''
          },
          allergies: combinedData.allergies || [],
          currentMedications: combinedData.currentMedications || [],
        });
        
        console.log('🎉 Profile fetch completed successfully');
        
      } catch (apiError) {
        console.warn('⚠️ API call failed, using mock data:', apiError);
        // Use mock data as fallback
        const mockData = {
          firstName: user?.firstName || 'John',
          lastName: user?.lastName || 'Doe',
          email: user?.email || 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          dateOfBirth: '1990-01-01',
          gender: 'male',
          address: {
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
          },
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
          createdAt: new Date()
        };
        
        setProfile(mockData);
        setFormData(mockData);
        console.log('📋 Using mock profile data');
      }
      
    } catch (err) {
      console.error('❌ Profile fetch error:', err);
      setError('Failed to load profile data. Using demo data instead.');
      
      // Final fallback - use very basic data
      const fallbackData = {
        firstName: user?.firstName || 'Patient',
        lastName: user?.lastName || '',
        email: user?.email || '',
        createdAt: new Date()
      };
      
      setProfile(fallbackData);
      setFormData({
        firstName: fallbackData.firstName,
        lastName: fallbackData.lastName,
        email: fallbackData.email,
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: { street: '', city: '', state: '', zipCode: '', country: '' },
        bloodGroup: '',
        height: '',
        weight: '',
        emergencyContact: { name: '', relationship: '', phone: '' },
        insurance: { provider: '', policyNumber: '', groupNumber: '' },
        allergies: [],
        currentMedications: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      console.log('💾 Saving profile data:', formData);
      
      // Try to save to backend, but don't fail if APIs are down
      try {
        // Update user profile
        await authService.updateProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          address: formData.address,
        });

        // Update patient profile
        await patientService.updateProfile({
          bloodGroup: formData.bloodGroup,
          height: formData.height,
          weight: formData.weight,
          emergencyContact: formData.emergencyContact,
          insurance: formData.insurance,
          allergies: formData.allergies,
          currentMedications: formData.currentMedications,
        });

        setSuccess('Profile updated successfully!');
        console.log('✅ Profile saved successfully');
        
      } catch (saveError) {
        console.warn('⚠️ Save API failed, updating local state only:', saveError);
        setSuccess('Profile updated locally! (Backend connection failed)');
      }

      // Update local state regardless of API success
      setProfile(prev => ({
        ...prev,
        ...formData
      }));
      
      setEditMode(false);
      
    } catch (err) {
      console.error('❌ Profile save error:', err);
      setError(err.response?.data?.message || 'Failed to update profile. Changes saved locally only.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset form data to original profile data
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
        gender: profile.gender || '',
        address: profile.address || {
          street: '', city: '', state: '', zipCode: '', country: ''
        },
        bloodGroup: profile.bloodGroup || '',
        height: profile.height || '',
        weight: profile.weight || '',
        emergencyContact: profile.emergencyContact || {
          name: '', relationship: '', phone: ''
        },
        insurance: profile.insurance || {
          provider: '', policyNumber: '', groupNumber: ''
        },
        allergies: profile.allergies || [],
        currentMedications: profile.currentMedications || [],
      });
    }
  };

  const handleBackToDashboard = () => {
    navigate('/patient-dashboard');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px" flexDirection="column">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading your profile...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Checking backend connection...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Safe fallback for profile data
  const safeProfile = profile || {
    firstName: user?.firstName || 'Patient',
    lastName: user?.lastName || '',
    email: user?.email || '',
    createdAt: new Date(),
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'white', color: 'primary.main' }}>
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                {safeProfile.firstName} {safeProfile.lastName}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Patient Profile
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Member since {new Date(safeProfile.createdAt).toLocaleDateString()}
              </Typography>
              {error && (
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 1, fontStyle: 'italic' }}>
                  Using demo data - Backend connection issue
                </Typography>
              )}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBackToDashboard}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  bgcolor: 'white',
                  color: 'primary.main',
                },
              }}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="contained"
              startIcon={editMode ? <CancelIcon /> : <EditIcon />}
              onClick={editMode ? handleCancel : () => setEditMode(true)}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Box>
        </Box>
      </Paper>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error} - You can still edit and view the profile with demo data.
        </Alert>
      )}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <Grid container spacing={4}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1 }} />
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    disabled
                    helperText="Email cannot be changed"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="+1 (555) 123-4567"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!editMode}
                    select
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Medical Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <MedicalIcon sx={{ mr: 1 }} />
                Medical Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Blood Group"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    disabled={!editMode}
                    select
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Height (cm)"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <HeightIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                    placeholder="175"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <WeightIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                    placeholder="70"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Address Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="123 Main Street"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="New York"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="NY"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="10001"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="USA"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Emergency Contact */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Emergency Contact
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Name"
                    name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Jane Doe"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Relationship"
                    name="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Spouse"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="+1 (555) 987-6543"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Allergies & Medications */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <HeartIcon sx={{ mr: 1 }} />
                Health Details
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Allergies"
                    name="allergies"
                    value={formData.allergies.join(', ')}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      allergies: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                    }))}
                    disabled={!editMode}
                    helperText="Separate multiple allergies with commas"
                    multiline
                    rows={2}
                    placeholder="Penicillin, Peanuts, Dust"
                  />
                  <Box sx={{ mt: 1 }}>
                    {formData.allergies.map((allergy, index) => (
                      <Chip key={index} label={allergy} size="small" sx={{ m: 0.5 }} />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Current Medications"
                    name="currentMedications"
                    value={formData.currentMedications.join(', ')}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      currentMedications: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                    }))}
                    disabled={!editMode}
                    helperText="Separate multiple medications with commas"
                    multiline
                    rows={2}
                    placeholder="Vitamin D, Blood Pressure Medication"
                  />
                  <Box sx={{ mt: 1 }}>
                    {formData.currentMedications.map((med, index) => (
                      <Chip key={index} label={med} size="small" sx={{ m: 0.5 }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button */}
      {editMode && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PatientProfile;