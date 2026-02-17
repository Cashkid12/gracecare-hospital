import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Chip,
  IconButton,
  Avatar,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Tabs,
  Tab
} from '@mui/material';
import {
  Message as MessageIcon,
  Send as SendIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Announcement as AnnouncementIcon,
  Email as EmailIcon,
  PriorityHigh as PriorityIcon,
  CheckCircle as ReadIcon,
  Circle as UnreadIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  // Empty state - no mock data
  useEffect(() => {
    setMessages([]);
    setFilteredMessages([]);
  }, []);

  // Filter messages
  useEffect(() => {
    let filtered = messages;
    
    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType) {
      filtered = filtered.filter(message => 
        message.type === filterType
      );
    }
    
    setFilteredMessages(filtered);
  }, [searchTerm, filterType, messages]);

  const getPriorityColor = (priority) => {
    const colors = {
      'Low': '#10b981',
      'Normal': '#3b82f6',
      'High': '#f59e0b',
      'Critical': '#ef4444'
    };
    return colors[priority] || '#6b7280';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Direct': return <EmailIcon />;
      case 'Announcement': return <AnnouncementIcon />;
      case 'System': return <NotificationsIcon />;
      default: return <MessageIcon />;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'Direct': '#3b82f6',
      'Announcement': '#8b5cf6',
      'System': '#6b7280'
    };
    return colors[type] || '#6b7280';
  };

  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" color="#1E293B" gutterBottom>
            Messages & Communication
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage internal messaging, notifications, and communication systems
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<SendIcon />} sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' }, borderRadius: 2 }}>
          New Message
        </Button>
      </Box>

      {/* 12-Column Grid Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        {/* Stats Cards - 3 columns each */}
        {[
          { title: 'Total Messages', value: messages.length, icon: <MessageIcon />, color: '#14B8A6', bgColor: '#F0FDFA' },
          { title: 'Unread', value: messages.filter(m => m.status === 'unread').length, icon: <Badge badgeContent={messages.filter(m => m.status === 'unread').length} color="error"><EmailIcon /></Badge>, color: '#3B82F6', bgColor: '#EFF6FF' },
          { title: 'Announcements', value: messages.filter(m => m.type === 'Announcement').length, icon: <AnnouncementIcon />, color: '#10B981', bgColor: '#F0FDF4' },
          { title: 'High Priority', value: messages.filter(m => m.priority === 'High' || m.priority === 'Critical').length, icon: <PriorityIcon />, color: '#F59E0B', bgColor: '#FFFBEB' }
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

        {/* Search Bar - Full Width */}
        <Box sx={{ gridColumn: 'span 12' }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' } }}>
                <TextField
                  placeholder="Search messages..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ flex: 1 }}
                  InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
                />
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => { setSearchTerm(''); setFilterType(''); }} size="small">
                  Reset
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Message List - 5 columns */}
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 5' } }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
              <List sx={{ width: '100%' }}>
                {filteredMessages.map((message, index) => (
                  <React.Fragment key={message.id}>
                    <ListItem 
                      alignItems="flex-start"
                      onClick={() => setSelectedMessage(message)}
                      sx={{ 
                        '&:hover': { bgcolor: '#F8FAFC' },
                        cursor: 'pointer',
                        px: 2,
                        py: 1.5,
                        bgcolor: selectedMessage?.id === message.id ? '#F0FDFA' : 'transparent'
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: getTypeColor(message.type), width: 40, height: 40 }}>
                          {React.cloneElement(getTypeIcon(message.type), { sx: { fontSize: 20 } })}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="body2" fontWeight="500" noWrap sx={{ flex: 1 }}>
                              {message.sender.name}
                            </Typography>
                            {message.status === 'unread' && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#14B8A6' }} />}
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500, display: 'block' }} noWrap>
                              {message.subject}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(message.timestamp).toLocaleDateString()}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {index < filteredMessages.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Message Content - 7 columns */}
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 7' } }}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)', height: '100%' }}>
            {selectedMessage ? (
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ bgcolor: getTypeColor(selectedMessage.type), width: 48, height: 48 }}>
                    {React.cloneElement(getTypeIcon(selectedMessage.type), { sx: { fontSize: 24 } })}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="600">{selectedMessage.sender.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedMessage.sender.role}</Typography>
                  </Box>
                  <Chip label={selectedMessage.type} size="small" sx={{ bgcolor: `${getTypeColor(selectedMessage.type)}20`, color: getTypeColor(selectedMessage.type), fontWeight: 500 }} />
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="h6" fontWeight="600" gutterBottom>{selectedMessage.subject}</Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip icon={<PriorityIcon sx={{ fontSize: 14 }} />} label={selectedMessage.priority} size="small" sx={{ bgcolor: `${getPriorityColor(selectedMessage.priority)}20`, color: getPriorityColor(selectedMessage.priority), fontWeight: 500, mr: 1 }} />
                  <Chip label={new Date(selectedMessage.timestamp).toLocaleString()} size="small" variant="outlined" />
                </Box>
                <Typography variant="body1" sx={{ lineHeight: 1.7, color: '#374151' }}>
                  {selectedMessage.content}
                </Typography>
                <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #E5E7EB', display: 'flex', gap: 2 }}>
                  <Button variant="contained" startIcon={<SendIcon />} size="small" sx={{ bgcolor: '#14B8A6', '&:hover': { bgcolor: '#0D9488' } }}>
                    Reply
                  </Button>
                  <Button variant="outlined" size="small">Mark as Read</Button>
                </Box>
              </CardContent>
            ) : (
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 400 }}>
                <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#F0FDFA', color: '#14B8A6', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <MessageIcon sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h6" fontWeight="600" color="#1E293B" gutterBottom>Select a Message</Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Click on a message from the list to view its contents
                </Typography>
              </CardContent>
            )}
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminMessages;