import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import {
  Science,
  Download,
  Visibility,
  Close
} from '@mui/icons-material';

const PatientLabResults = () => {
  const [tabValue, setTabValue] = useState(0);
  const [labResults, setLabResults] = useState([]);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    fetchLabResults();
  }, [tabValue]);

  const fetchLabResults = () => {
    // Empty state - will be populated from API
    setLabResults([]);
  };

  const filteredResults = labResults.filter(result =>
    tabValue === 0 ? result.status === 'pending' : result.status === 'completed'
  );

  const handleView = (result) => {
    setSelectedResult(result);
    setViewDialog(true);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
          Lab Results
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View your laboratory test results
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
          <Tab label="Pending Results" />
          <Tab label="Completed Results" />
        </Tabs>

        <CardContent>
          {filteredResults.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Science sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No {tabValue === 0 ? 'pending' : 'completed'} lab results
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 0 
                  ? 'Your lab results will appear here once tests are ordered'
                  : 'Completed results will be available for download'}
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Test Type</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date Ordered</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Ordered By</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredResults.map((result) => (
                    <TableRow key={result.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{result.testType}</TableCell>
                      <TableCell>{result.dateOrdered}</TableCell>
                      <TableCell>{result.orderedBy}</TableCell>
                      <TableCell>
                        <Chip
                          label={result.status}
                          color={result.status === 'completed' ? 'success' : 'warning'}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" color="primary" onClick={() => handleView(result)}>
                            <Visibility />
                          </IconButton>
                          {result.status === 'completed' && (
                            <IconButton size="small" color="primary">
                              <Download />
                            </IconButton>
                          )}
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

      {/* View Result Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Lab Result Details</Typography>
            <IconButton onClick={() => setViewDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedResult && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Test Type</Typography>
                <Typography variant="body1" fontWeight={600}>{selectedResult.testType}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Date Ordered</Typography>
                <Typography variant="body1">{selectedResult.dateOrdered}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Ordered By</Typography>
                <Typography variant="body1">{selectedResult.orderedBy}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                <Chip
                  label={selectedResult.status}
                  color={selectedResult.status === 'completed' ? 'success' : 'warning'}
                  size="small"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog(false)}>Close</Button>
          {selectedResult?.status === 'completed' && (
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
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientLabResults;
