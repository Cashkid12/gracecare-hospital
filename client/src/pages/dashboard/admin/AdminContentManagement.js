import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Article as ArticleIcon,
  Image as ImageIcon,
  Info as InfoIcon,
  MedicalServices as ServiceIcon,
  Save as SaveIcon,
  Preview as PreviewIcon,
  Upload as UploadIcon
} from '@mui/icons-material';

const AdminContentManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [services, setServices] = useState([
    { id: 1, title: 'Cardiology', description: 'Heart and cardiovascular care', status: 'Published', icon: 'heart' },
    { id: 2, title: 'Neurology', description: 'Brain and nervous system care', status: 'Published', icon: 'brain' },
    { id: 3, title: 'Pediatrics', description: 'Children healthcare services', status: 'Draft', icon: 'child' },
    { id: 4, title: 'Orthopedics', description: 'Bone and joint care', status: 'Published', icon: 'bone' }
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'New Equipment Arrival', content: 'We have installed new MRI machines', date: '2024-01-15', status: 'Active' },
    { id: 2, title: 'Holiday Hours', content: 'Modified hours during holidays', date: '2024-01-10', status: 'Archived' }
  ]);

  const handleOpenDialog = (item = null) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setOpenDialog(false);
  };

  const handleDelete = (id, type) => {
    if (type === 'service') {
      setServices(services.filter(s => s.id !== id));
    } else {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const TabPanel = ({ children, value, index }) => (
    value === index && <Box sx={{ pt: 3 }}>{children}</Box>
  );

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="700" color="#1E293B" gutterBottom>
          Content Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage website content, services, announcements, and media
        </Typography>
      </Box>

      {/* 12-Column Grid Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        {/* Stats Cards */}
        {[
          { title: 'Total Services', value: services.length, color: '#14B8A6', bgColor: '#F0FDFA', icon: <ServiceIcon /> },
          { title: 'Published', value: services.filter(s => s.status === 'Published').length, color: '#10B981', bgColor: '#F0FDF4', icon: <ArticleIcon /> },
          { title: 'Announcements', value: announcements.length, color: '#3B82F6', bgColor: '#EFF6FF', icon: <InfoIcon /> },
          { title: 'Media Files', value: '24', color: '#8B5CF6', bgColor: '#F5F3FF', icon: <ImageIcon /> }
        ].map((stat, index) => (
          <Box key={index} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <CardContent sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: stat.bgColor, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.cloneElement(stat.icon, { sx: { fontSize: 24 } })}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="700" color="#1E293B" sx={{ fontSize: '1.5rem' }}>
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}

        {/* Main Content - 8 columns */}
        <Box sx={{ gridColumn: { xs: 'span 12', lg: 'span 8' } }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 0 }}>
              <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1 }}>
                <Tab icon={<ServiceIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Services" />
                <Tab icon={<InfoIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Announcements" />
                <Tab icon={<ImageIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Media" />
              </Tabs>

              <Box sx={{ p: 3 }}>
                <TabPanel value={activeTab} index={0}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="600">Services</Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} size="small" sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' } }}>
                      Add Service
                    </Button>
                  </Box>
                  <List>
                    {services.map((service, index) => (
                      <ListItem key={service.id} divider={index < services.length - 1} sx={{ px: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                          <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#F0FDFA', color: '#14B8A6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ServiceIcon />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight="500">{service.title}</Typography>
                            <Typography variant="caption" color="text.secondary">{service.description}</Typography>
                          </Box>
                          <Chip label={service.status} size="small" sx={{ bgcolor: service.status === 'Published' ? '#F0FDF4' : '#FEF3C7', color: service.status === 'Published' ? '#10B981' : '#D97706', fontWeight: 500 }} />
                        </Box>
                        <ListItemSecondaryAction>
                          <IconButton size="small" onClick={() => handleOpenDialog(service)} sx={{ color: '#14B8A6' }}><EditIcon /></IconButton>
                          <IconButton size="small" onClick={() => handleDelete(service.id, 'service')} sx={{ color: '#EF4444' }}><DeleteIcon /></IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>

                <TabPanel value={activeTab} index={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="600">Announcements</Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} size="small" sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' } }}>
                      Add Announcement
                    </Button>
                  </Box>
                  <List>
                    {announcements.map((announcement, index) => (
                      <ListItem key={announcement.id} divider={index < announcements.length - 1} sx={{ px: 0 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight="500">{announcement.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{announcement.content}</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>{announcement.date}</Typography>
                        </Box>
                        <Chip label={announcement.status} size="small" sx={{ bgcolor: announcement.status === 'Active' ? '#F0FDF4' : '#F3F4F6', color: announcement.status === 'Active' ? '#10B981' : '#6B7280', fontWeight: 500 }} />
                        <IconButton size="small" onClick={() => handleDelete(announcement.id, 'announcement')} sx={{ color: '#EF4444', ml: 1 }}><DeleteIcon /></IconButton>
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>

                <TabPanel value={activeTab} index={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="600">Media Library</Typography>
                    <Button variant="contained" startIcon={<UploadIcon />} size="small" sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' } }}>
                      Upload
                    </Button>
                  </Box>
                  <Grid container spacing={2}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <Grid item xs={6} sm={4} md={3} key={item}>
                        <Paper sx={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F8FAFC', borderRadius: 2, border: '1px dashed #CBD5E1' }}>
                          <ImageIcon sx={{ fontSize: 40, color: '#CBD5E1' }} />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Sidebar - 4 columns */}
        <Box sx={{ gridColumn: { xs: 'span 12', lg: 'span 4' } }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>Quick Actions</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button variant="outlined" fullWidth startIcon={<PreviewIcon />} sx={{ justifyContent: 'flex-start' }}>Preview Website</Button>
                <Button variant="outlined" fullWidth startIcon={<SaveIcon />} sx={{ justifyContent: 'flex-start' }}>Save Draft</Button>
                <Button variant="outlined" fullWidth startIcon={<UploadIcon />} sx={{ justifyContent: 'flex-start' }}>Bulk Upload</Button>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>Recent Activity</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { action: 'Updated Cardiology service', time: '2 hours ago', color: '#14B8A6' },
                  { action: 'Added new announcement', time: '5 hours ago', color: '#3B82F6' },
                  { action: 'Deleted old media file', time: '1 day ago', color: '#EF4444' }
                ].map((activity, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: activity.color, flexShrink: 0 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">{activity.action}</Typography>
                      <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField fullWidth label="Title" size="small" />
            <TextField fullWidth label="Description" multiline rows={3} size="small" />
            <TextField fullWidth label="Content" multiline rows={4} size="small" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog} sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' } }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminContentManagement;
