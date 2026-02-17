import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  LinearProgress,
  Button,
  TextField
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ShowChart as ChartIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  People as PeopleIcon,
  LocalHospital as DoctorIcon,
  Event as AppointmentIcon,
  AttachMoney as RevenueIcon,
  PictureAsPdf as PdfIcon,
  Description as CsvIcon,
  TableChart as ExcelIcon,
  Assessment as ReportIcon,
  Print as PrintIcon
} from '@mui/icons-material';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [reportType, setReportType] = useState('summary');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  // Sample analytics data for demonstration
  const analyticsData = {
    totalPatients: 1247,
    totalDoctors: 89,
    totalAppointments: 342,
    totalRevenue: 45230,
    patientGrowth: 12.5,
    doctorGrowth: 8.2,
    appointmentGrowth: 15.7,
    revenueGrowth: 18.9,
    topDepartments: [
      { name: 'Cardiology', patients: 234, color: '#EF4444' },
      { name: 'Orthopedics', patients: 189, color: '#3B82F6' },
      { name: 'Pediatrics', patients: 156, color: '#10B981' },
      { name: 'Neurology', patients: 134, color: '#8B5CF6' },
      { name: 'Dermatology', patients: 98, color: '#F59E0B' }
    ],
    appointmentStats: {
      pending: 23,
      confirmed: 45,
      completed: 274,
      cancelled: 12
    }
  };

  const statCards = [
    {
      title: 'Total Patients',
      value: analyticsData.totalPatients,
      icon: <PeopleIcon sx={{ fontSize: 32 }} />,
      color: '#3B82F6',
      bgColor: '#EFF6FF',
      growth: analyticsData.patientGrowth,
      isPositive: true
    },
    {
      title: 'Total Doctors',
      value: analyticsData.totalDoctors,
      icon: <DoctorIcon sx={{ fontSize: 32 }} />,
      color: '#10B981',
      bgColor: '#F0FDF4',
      growth: analyticsData.doctorGrowth,
      isPositive: true
    },
    {
      title: 'Total Appointments',
      value: analyticsData.totalAppointments,
      icon: <AppointmentIcon sx={{ fontSize: 32 }} />,
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
      growth: analyticsData.appointmentGrowth,
      isPositive: true
    },
    {
      title: 'Total Revenue',
      value: `$${analyticsData.totalRevenue.toLocaleString()}`,
      icon: <RevenueIcon sx={{ fontSize: 32 }} />,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
      growth: analyticsData.revenueGrowth,
      isPositive: true
    }
  ];

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" color="#1E293B" gutterBottom>
            Analytics & Reports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View system analytics, performance metrics, and generate reports
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} label="Time Range">
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Department</InputLabel>
            <Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} label="Department">
              <MenuItem value="all">All Departments</MenuItem>
              <MenuItem value="cardiology">Cardiology</MenuItem>
              <MenuItem value="orthopedics">Orthopedics</MenuItem>
              <MenuItem value="pediatrics">Pediatrics</MenuItem>
              <MenuItem value="neurology">Neurology</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* 12-Column Grid Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        {/* Stat Cards - 3 columns each */}
        {statCards.map((stat, index) => (
          <Box key={index} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
              <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: stat.bgColor, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {React.cloneElement(stat.icon, { sx: { fontSize: 24 } })}
                  </Box>
                  <Chip icon={stat.isPositive ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : <TrendingDownIcon sx={{ fontSize: 16 }} />} label={`${stat.growth}%`} size="small" sx={{ height: 24, bgcolor: stat.isPositive ? '#DCFCE7' : '#FFE4E6', color: stat.isPositive ? '#166534' : '#991B1B', fontWeight: 600, fontSize: '0.75rem' }} />
                </Box>
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="700" color="#1E293B" sx={{ fontSize: '1.5rem', lineHeight: 1.2 }}>
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}

        {/* Department Distribution - 6 columns */}
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: '#3B82F6', width: 36, height: 36 }}>
                  <PieChartIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Typography variant="h6" fontWeight="600" color="#1E293B" sx={{ fontSize: '1rem' }}>
                  Department Distribution
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {analyticsData.topDepartments.length > 0 ? (
                  analyticsData.topDepartments.map((dept, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: dept.color, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>{dept.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40, textAlign: 'right' }}>{dept.patients}</Typography>
                      <Box sx={{ width: 60 }}>
                        <LinearProgress variant="determinate" value={(dept.patients / analyticsData.topDepartments[0].patients) * 100} sx={{ height: 5, borderRadius: 3, bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: dept.color } }} />
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">No department data</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Appointment Status - 6 columns */}
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: '#10B981', width: 36, height: 36 }}>
                  <BarChartIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Typography variant="h6" fontWeight="600" color="#1E293B" sx={{ fontSize: '1rem' }}>
                  Appointment Status
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {analyticsData.totalAppointments > 0 ? (
                  [
                    { label: 'Completed', value: analyticsData.appointmentStats.completed, color: '#10B981' },
                    { label: 'Confirmed', value: analyticsData.appointmentStats.confirmed, color: '#3B82F6' },
                    { label: 'Pending', value: analyticsData.appointmentStats.pending, color: '#F59E0B' }
                  ].map((item, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight="500">{item.label}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.value}</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={(item.value / analyticsData.totalAppointments) * 100} sx={{ height: 6, borderRadius: 3, bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: item.color } }} />
                    </Box>
                  ))
                ) : (
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">No appointment data</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Reports Section - Full Width */}
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: '#8B5CF6', width: 36, height: 36 }}>
                  <ReportIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Typography variant="h6" fontWeight="600" color="#1E293B" sx={{ fontSize: '1rem' }}>
                  Generate Reports
                </Typography>
              </Box>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
                <FormControl size="small">
                  <InputLabel>Report Type</InputLabel>
                  <Select value={reportType} onChange={(e) => setReportType(e.target.value)} label="Report Type">
                    <MenuItem value="summary">Summary Report</MenuItem>
                    <MenuItem value="detailed">Detailed Analytics</MenuItem>
                    <MenuItem value="financial">Financial Report</MenuItem>
                    <MenuItem value="performance">Performance Metrics</MenuItem>
                  </Select>
                </FormControl>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField 
                    type="date" 
                    size="small" 
                    label="Start Date" 
                    InputLabelProps={{ shrink: true }} 
                    value={dateRange.start} 
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})} 
                    sx={{ flex: 1 }} 
                  />
                  <TextField 
                    type="date" 
                    size="small" 
                    label="End Date" 
                    InputLabelProps={{ shrink: true }} 
                    value={dateRange.end} 
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})} 
                    sx={{ flex: 1 }} 
                  />
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  startIcon={<PdfIcon />} 
                  sx={{ bgcolor: '#EF4444', '&:hover': { bgcolor: '#DC2626' }, borderRadius: 2 }}
                >
                  Generate PDF
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<CsvIcon />} 
                  sx={{ borderRadius: 2 }}
                >
                  Export CSV
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<ExcelIcon />} 
                  sx={{ borderRadius: 2 }}
                >
                  Export Excel
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<PrintIcon />} 
                  sx={{ borderRadius: 2 }}
                >
                  Print Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Performance Metrics - Full Width */}
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: '#F59E0B', width: 36, height: 36 }}>
                  <ChartIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Typography variant="h6" fontWeight="600" color="#1E293B" sx={{ fontSize: '1rem' }}>
                  Performance Metrics
                </Typography>
              </Box>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                {[
                  { title: 'Avg. Patient Wait Time', value: '15 min', change: '-2 min', positive: true, icon: '⏰' },
                  { title: 'Doctor Utilization', value: '87%', change: '+3%', positive: true, icon: '🏥' },
                  { title: 'Patient Satisfaction', value: '4.8/5', change: '+0.2', positive: true, icon: '⭐' },
                  { title: 'Revenue per Patient', value: '$120', change: '+$8', positive: true, icon: '💰' }
                ].map((metric, index) => (
                  <Card key={index} sx={{ borderRadius: 2, border: '1px solid rgba(0,0,0,0.04)', boxShadow: 'none' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {metric.title}
                      </Typography>
                      <Typography variant="h6" fontWeight="700" color="#1E293B" sx={{ my: 1 }}>
                        {metric.value}
                      </Typography>
                      <Chip 
                        icon={metric.positive ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />} 
                        label={metric.change} 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          bgcolor: metric.positive ? '#DCFCE7' : '#FFE4E6', 
                          color: metric.positive ? '#166534' : '#991B1B', 
                          fontWeight: 600, 
                          fontSize: '0.7rem' 
                        }} 
                      />
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminAnalytics;