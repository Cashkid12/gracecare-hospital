import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Search,
  Add,
  Print,
  Edit,
  Assignment
} from '@mui/icons-material';

const DoctorPrescriptions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [createDialog, setCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = () => {
    // Empty state - will be populated from API
    setPrescriptions([]);
  };

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.medication?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    setCreateDialog(false);
    setFormData({
      patientName: '',
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
            Prescriptions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage patient prescriptions and medications
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
            }
          }}
        >
          New Prescription
        </Button>
      </Box>

      {/* Search */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search by patient or medication..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2 }
            }}
          />
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <CardContent>
          {filteredPrescriptions.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Assignment sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No prescriptions found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchQuery ? 'Try adjusting your search' : 'Create your first prescription'}
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Patient</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Medication</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Dosage</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id} hover>
                      <TableCell>{prescription.patientName}</TableCell>
                      <TableCell>{prescription.medication}</TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={prescription.status}
                          color={prescription.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small">
                          <Print />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Create Prescription Dialog */}
      <Dialog open={createDialog} onClose={() => setCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Prescription</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Medication"
                value={formData.medication}
                onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dosage"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                placeholder="e.g., 500mg"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={formData.frequency}
                  label="Frequency"
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                >
                  <MenuItem value="once">Once daily</MenuItem>
                  <MenuItem value="twice">Twice daily</MenuItem>
                  <MenuItem value="thrice">Three times daily</MenuItem>
                  <MenuItem value="asneeded">As needed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 7 days"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Additional instructions for the patient..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
              }
            }}
          >
            Create Prescription
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorPrescriptions;
