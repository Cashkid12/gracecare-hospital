import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  People as PeopleIcon,
  LocalHospital as DoctorIcon,
  Person as PatientIcon,
  AttachMoney as RevenueIcon,
  CalendarToday as TodayIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  TrendingUp as TrendingIcon,
  TrendingDown as TrendingDownIcon,
  Schedule as ScheduleIcon,
  MedicalServices as MedicalIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon
} from '@mui/icons-material';

const DashboardContent = () => {
  // Empty state - no mock data
  const stats = {
    totalUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
    todayAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <PeopleIcon sx={{ fontSize: 24 }} />,
      color: '#14B8A6',
      bgColor: '#F0FDFA',
      trend: '0%',
      trendUp: true
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: <DoctorIcon sx={{ fontSize: 24 }} />,
      color: '#0EA5E9',
      bgColor: '#F0F9FF',
      trend: '0%',
      trendUp: true
    },
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: <PatientIcon sx={{ fontSize: 24 }} />,
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
      trend: '0%',
      trendUp: true
    },
    {
      title: 'Today\'s Appointments',
      value: stats.todayAppointments,
      icon: <TodayIcon sx={{ fontSize: 24 }} />,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
      trend: '0%',
      trendUp: true
    }
  ];

  const recentActivity = [];
  const systemStatus = [
    { name: 'Database', status: 'Operational', color: '#10B981', uptime: '100%' },
    { name: 'API Server', status: 'Operational', color: '#10B981', uptime: '100%' },
    { name: 'Auth Service', status: 'Operational', color: '#10B981', uptime: '100%' },
    { name: 'File Storage', status: 'Operational', color: '#10B981', uptime: '100%' }
  ];
  const departmentStats = [];

  return (
    <Box sx={{ 
      width: '100%', 
      p: { xs: 2, sm: 3, md: 4 },
      maxWidth: '100%',
      overflowX: 'hidden',
      bgcolor: '#F8FAFC',
      minHeight: 'calc(100vh - 64px)'
    }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          fontWeight="700" 
          color="#1E293B" 
          gutterBottom
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}
        >
          Dashboard Overview
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontSize: '0.875rem' }}
        >
          Welcome back! Here's what's happening at GraceCare Hospital today.
        </Typography>
      </Box>

      {/* 12-Column Grid Layout */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 3,
        width: '100%'
      }}>
        
        {/* Row 1: 4 Statistic Cards - 3 columns each */}
        {statCards.map((stat, index) => (
          <Box 
            key={index}
            sx={{ 
              gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' }
            }}
          >
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: stat.bgColor,
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {stat.icon}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    fontWeight="500"
                    sx={{ 
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
                    <Typography 
                      variant="h5" 
                      fontWeight="700" 
                      color="#1E293B"
                      sx={{ fontSize: '1.5rem', lineHeight: 1.2 }}
                    >
                      {stat.value.toLocaleString()}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                      {stat.trendUp ? (
                        <ArrowUpIcon sx={{ fontSize: 14, color: '#10B981' }} />
                      ) : (
                        <ArrowDownIcon sx={{ fontSize: 14, color: '#EF4444' }} />
                      )}
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: stat.trendUp ? '#10B981' : '#EF4444',
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      >
                        {stat.trend}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}

        {/* Row 2: Left Column (8 cols) - Analytics + Recent Activity */}
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 8' }, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Analytics Card */}
          <Card 
            sx={{ 
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.04)',
              flex: 1
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="600" color="#1E293B" sx={{ fontSize: '1rem' }}>
                  Analytics Overview
                </Typography>
                <Chip 
                  label="Last 7 Days" 
                  size="small" 
                  sx={{ 
                    bgcolor: '#F1F5F9', 
                    color: '#64748B',
                    fontSize: '0.75rem',
                    fontWeight: 500
                  }} 
                />
              </Box>
              <Box sx={{ 
                height: 280,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: '#F8FAFC',
                borderRadius: 2,
                border: '1px dashed #E2E8F0'
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <TrendingIcon sx={{ fontSize: 48, color: '#CBD5E1', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Interactive charts will appear here
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Recent Activity Card */}
          <Card 
            sx={{ 
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.04)'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" color="#1E293B" sx={{ fontSize: '1rem', mb: 2 }}>
                Recent Activity
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: activity.color, flexShrink: 0 }} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" color="#1E293B" fontWeight="500" noWrap>{activity.message}</Typography>
                          <Typography variant="caption" color="text.secondary">{activity.user}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>{activity.time}</Typography>
                      </Box>
                      {index < recentActivity.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
                    </Box>
                  ))
                ) : (
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">No recent activity</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Row 2: Right Column (4 cols) - System Status + Department Stats */}
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' }, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* System Status Card */}
          <Card 
            sx={{ 
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.04)'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" color="#1E293B" sx={{ fontSize: '1rem', mb: 2 }}>
                System Status
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {systemStatus.map((item, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center'
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="#1E293B" fontWeight="500">
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Uptime: {item.uptime}
                      </Typography>
                    </Box>
                    <Chip
                      label={item.status}
                      size="small"
                      sx={{
                        height: 22,
                        bgcolor: `${item.color}15`,
                        color: item.color,
                        fontWeight: 600,
                        fontSize: '0.6875rem'
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Department Capacity Card */}
          <Card 
            sx={{ 
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.04)',
              flex: 1
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" color="#1E293B" sx={{ fontSize: '1rem', mb: 2 }}>
                Department Capacity
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {departmentStats.length > 0 ? (
                  departmentStats.map((dept, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="#1E293B" fontWeight="500">{dept.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{dept.capacity}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={dept.capacity}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#F1F5F9',
                          '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: dept.capacity > 90 ? '#EF4444' : dept.capacity > 75 ? '#F59E0B' : '#14B8A6' }
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>{dept.patients} patients</Typography>
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

          {/* Quick Actions Card */}
          <Card 
            sx={{ 
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.04)',
              bgcolor: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)'
            }}
          >
            <CardContent sx={{ p: 3, bgcolor: '#14B8A6' }}>
              <Typography variant="h6" fontWeight="600" color="white" sx={{ fontSize: '1rem', mb: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { label: 'New Appointment', icon: <ScheduleIcon sx={{ fontSize: 18 }} /> },
                  { label: 'Add Patient', icon: <PatientIcon sx={{ fontSize: 18 }} /> },
                  { label: 'Create Record', icon: <MedicalIcon sx={{ fontSize: 18 }} /> }
                ].map((action, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 1.5,
                      bgcolor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.25)'
                      }
                    }}
                  >
                    {action.icon}
                    <Typography variant="body2" fontWeight="500">
                      {action.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardContent;