import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  TextField,
  IconButton,
  Divider,
  Chip,
  Grid,
  Paper
} from '@mui/material';
import {
  Message,
  Send,
  AttachFile,
  Search
} from '@mui/icons-material';

const DoctorMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    // Empty state - will be populated from API
    setMessages([]);
  };

  const filteredMessages = messages.filter(msg =>
    msg.from?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
          Messages
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Communicate with patients and staff
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Conversations List */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)', height: '70vh' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <TextField
                fullWidth
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                  sx: { borderRadius: 2 }
                }}
                sx={{ mb: 2 }}
              />

              {filteredMessages.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Message sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No messages
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your inbox is empty
                  </Typography>
                </Box>
              ) : (
                <List sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
                  {filteredMessages.map((message) => (
                    <React.Fragment key={message.id}>
                      <ListItem
                        button
                        onClick={() => setSelectedConversation(message)}
                        sx={{
                          borderRadius: 2,
                          mb: 1,
                          bgcolor: selectedConversation?.id === message.id ? 'rgba(20, 184, 166, 0.08)' : 'transparent',
                          '&:hover': {
                            bgcolor: 'rgba(20, 184, 166, 0.04)'
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Badge badgeContent={message.unread} color="error">
                            <Avatar sx={{ bgcolor: 'primary.light' }}>
                              {message.from.charAt(0)}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {message.from}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {message.preview}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Message Thread */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)', height: '70vh' }}>
            {selectedConversation ? (
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Conversation Header */}
                <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 48, height: 48 }}>
                      {selectedConversation.from.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {selectedConversation.from}
                      </Typography>
                      <Chip label="Patient" size="small" />
                    </Box>
                  </Box>
                </Box>

                {/* Messages */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    No messages in this conversation yet
                  </Typography>
                </Box>

                {/* Message Input */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton>
                    <AttachFile />
                  </IconButton>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    multiline
                    maxRows={3}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                  <IconButton
                    color="primary"
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark'
                      }
                    }}
                  >
                    <Send />
                  </IconButton>
                </Box>
              </CardContent>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Message sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Select a conversation to start messaging
                  </Typography>
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorMessages;
