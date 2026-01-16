import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import {
  Search,
  Science,
  Download,
  Print,
  Check,
  Pending
} from '@mui/icons-material';

const DoctorLabResults = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [labResults, setLabResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState(false);

  useEffect(() => {
    fetchLabResults();
  }, [tabValue]);

  const fetchLabResults = () => {
    // Empty state - will be populated from API
    setLabResults([]);
  };

  const filteredResults = labResults.filter(result =>
    result.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.testType?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
          Lab Results
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and manage laboratory test results
        </Typography>
      </Box>

      {/* Search */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)' }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search by patient name or test type..."
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

      {/* Tabs and Results */}
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
          <Tab label="Pending Review" icon={<Pending />} iconPosition="start" />
          <Tab label="Completed" icon={<Check />} iconPosition="start" />
        </Tabs>

        <CardContent>
          {filteredResults.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Science sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No lab results found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 0 ? 'No results pending review' : 'No completed results'}
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Patient</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Test Type</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredResults.map((result) => (
                    <TableRow key={result.id} hover>
                      <TableCell>{result.patientName}</TableCell>
                      <TableCell>{result.testType}</TableCell>
                      <TableCell>{result.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={result.status}
                          color={result.status === 'pending' ? 'warning' : 'success'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => {
                          setSelectedResult(result);
                          setDetailsDialog(true);
                        }}>
                          <Download />
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

      {/* Details Dialog */}
      <Dialog open={detailsDialog} onClose={() => setDetailsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Lab Result Details</DialogTitle>
        <DialogContent>
          {selectedResult && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Patient</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedResult.patientName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Test Type</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedResult.testType}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Date</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedResult.date}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip label={selectedResult.status} color={selectedResult.status === 'pending' ? 'warning' : 'success'} />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog(false)}>Close</Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            sx={{
              background: 'linear-gradient(135deg, #14B8A6 0%, #6EE7B7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0F9488 0%, #4ADE80 100%)'
              }
            }}
          >
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorLabResults;
