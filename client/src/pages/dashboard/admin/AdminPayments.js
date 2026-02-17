import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Tooltip,
  LinearProgress
} from '@mui/material';
import {
  Payment as PaymentIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  CheckCircle as PaidIcon,
  Pending as PendingIcon,
  Schedule as OverdueIcon,
  Cancel as CancelledIcon,
  AttachMoney as RevenueIcon,
  TrendingUp as TrendingIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMethod, setFilterMethod] = useState('');

  // Empty state - no mock data
  useEffect(() => {
    setPayments([]);
    setFilteredPayments([]);
  }, []);

  // Filter payments
  useEffect(() => {
    let filtered = payments;
    
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus) {
      filtered = filtered.filter(payment => 
        payment.status === filterStatus
      );
    }
    
    if (filterMethod) {
      filtered = filtered.filter(payment => 
        payment.method === filterMethod
      );
    }
    
    setFilteredPayments(filtered);
  }, [searchTerm, filterStatus, filterMethod, payments]);

  const getStatusColor = (status) => {
    const colors = {
      'Paid': '#10b981',
      'Pending': '#f59e0b',
      'Overdue': '#ef4444',
      'Cancelled': '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const getMethodColor = (method) => {
    const colors = {
      'Credit Card': '#3b82f6',
      'Insurance': '#8b5cf6',
      'Cash': '#10b981',
      'Bank Transfer': '#f59e0b'
    };
    return colors[method] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <PaidIcon />;
      case 'Pending': return <PendingIcon />;
      case 'Overdue': return <OverdueIcon />;
      case 'Cancelled': return <CancelledIcon />;
      default: return <PaymentIcon />;
    }
  };

  // Calculate statistics
  const totalRevenue = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = payments.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);
  const paidInvoices = payments.filter(p => p.status === 'Paid').length;

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" color="#1E293B" gutterBottom>Payment Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage billing, payments, invoices, and financial transactions</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' }, borderRadius: 2 }}>New Invoice</Button>
      </Box>

      {/* 12-Column Grid Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        {/* Stats Cards - 3 columns each */}
        {[
          { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <RevenueIcon />, color: '#14B8A6', bgColor: '#F0FDFA' },
          { title: 'Pending', value: `$${pendingAmount.toLocaleString()}`, icon: <PendingIcon />, color: '#3B82F6', bgColor: '#EFF6FF' },
          { title: 'Overdue', value: `$${overdueAmount.toLocaleString()}`, icon: <OverdueIcon />, color: '#DC2626', bgColor: '#FFE4E6' },
          { title: 'Paid Invoices', value: paidInvoices, icon: <CheckCircleIcon />, color: '#10B981', bgColor: '#F0FDF4' }
        ].map((stat, index) => (
          <Box key={index} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: stat.bgColor, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.cloneElement(stat.icon, { sx: { fontSize: 24 } })}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.title}</Typography>
                  <Typography variant="h5" fontWeight="700" color="#1E293B" sx={{ fontSize: '1.5rem' }}>{stat.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}

        {/* Search Bar - Full Width */}
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' } }}>
                <TextField placeholder="Search payments..." variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ flex: 1 }} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }} />
                <FormControl size="small" sx={{ width: { xs: '100%', sm: 150 } }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Overdue">Overdue</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ width: { xs: '100%', sm: 150 } }}>
                  <InputLabel>Method</InputLabel>
                  <Select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)} label="Method">
                    <MenuItem value="">All Methods</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="Insurance">Insurance</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => { setSearchTerm(''); setFilterStatus(''); setFilterMethod(''); }} size="small">Reset</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Payments Table - Full Width */}
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 0 }}>
              <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Invoice</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Method</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow 
                    key={payment.id} 
                    sx={{ 
                      '&:hover': { bgcolor: '#F8FAFC' },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: getStatusColor(payment.status),
                          width: 36,
                          height: 36
                        }}>
                          {getStatusIcon(payment.status)}
                        </Avatar>
                        <Typography variant="body1" fontWeight="500">
                          {payment.id}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body1" fontWeight="500">
                          {payment.patient.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {payment.patient.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="600" color="#1E293B">
                        ${payment.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payment.method}
                        size="small"
                        sx={{
                          bgcolor: `${getMethodColor(payment.method)}20`,
                          color: getMethodColor(payment.method),
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status}
                        size="small"
                        sx={{
                          bgcolor: `${getStatusColor(payment.status)}20`,
                          color: getStatusColor(payment.status),
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(payment.date).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        color={new Date(payment.dueDate) < new Date() && payment.status !== 'Paid' ? '#ef4444' : 'text.secondary'}
                      >
                        {new Date(payment.dueDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {payment.description}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPayments;