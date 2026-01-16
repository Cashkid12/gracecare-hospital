import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button
} from '@mui/material';
import {
  Assignment,
  Download,
  Print,
  Medication
} from '@mui/icons-material';

const PatientPrescriptions = () => {
  const [tabValue, setTabValue] = useState(0);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, [tabValue]);

  const fetchPrescriptions = () => {
    // Empty state - will be populated from API
    setPrescriptions([]);
  };

  const filteredPrescriptions = prescriptions.filter(rx =>
    tabValue === 0 ? rx.status === 'active' : rx.status === 'past'
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
          Prescriptions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View your current and past prescriptions
        </Typography>
      </Box>

      {/* Tabs */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem'
            }
          }}
        >
          <Tab label="Active Prescriptions" />
          <Tab label="Past Prescriptions" />
        </Tabs>

        <CardContent>
          {filteredPrescriptions.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Medication sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No {tabValue === 0 ? 'active' : 'past'} prescriptions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 0 
                  ? 'Your active prescriptions will appear here'
                  : 'Your prescription history will be available here'}
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Medication</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Dosage</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Schedule</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Prescribed By</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPrescriptions.map((rx) => (
                    <TableRow key={rx.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{rx.medication}</TableCell>
                      <TableCell>{rx.dosage}</TableCell>
                      <TableCell>{rx.schedule}</TableCell>
                      <TableCell>{rx.prescribedBy}</TableCell>
                      <TableCell>{rx.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={rx.status}
                          color={rx.status === 'active' ? 'success' : 'default'}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" color="primary">
                            <Download />
                          </IconButton>
                          <IconButton size="small" color="primary">
                            <Print />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Medication Reminder Info */}
      {tabValue === 0 && prescriptions.length === 0 && (
        <Card sx={{ mt: 3, borderRadius: 3, bgcolor: '#F0FDFA', border: '1px solid #CCFBF1' }}>
          <CardContent>
            <Typography variant="body1" fontWeight={600} gutterBottom>
              💊 Medication Reminders
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enable notifications in settings to receive reminders for your medications
            </Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{ mt: 2 }}
              onClick={() => window.location.href = '/patient-settings'}
            >
              Go to Settings
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PatientPrescriptions;
