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
  TextField,
  IconButton,
  Divider,
  Badge,
  Paper,
  Button,
  InputAdornment
} from '@mui/material';
import {
  Message,
  Send,
  AttachFile,
  Person,
  Search
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';

const PatientMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    // Empty state - will be populated from API
    setMessages([]);
  };

  const handleSend = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const handleAttachment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf,image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Attaching:', file.name);
      }
    };
    input.click();
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'secondary.main' }}>
          Messages
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Communicate with your healthcare team
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(20, 184, 166, 0.1)', height: 'calc(100vh - 250px)', display: 'flex' }}>
        {/* Inbox Sidebar */}
        <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
            />
          </Box>
          <Divider />
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {messages.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
                <Message sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  No messages yet
                </Typography>
              </Box>
            ) : (
              <List>
                {messages.map((msg) => (
                  <ListItem
                    key={msg.id}
                    button
                    selected={selectedConversation?.id === msg.id}
                    onClick={() => setSelectedConversation(msg)}
                    sx={{
                      '&.Mui-selected': {
                        bgcolor: 'rgba(20, 184, 166, 0.08)'
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Badge badgeContent={msg.unread} color="error">
                        <Avatar src="/doctoricon.jpg" alt={msg.sender} />
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={msg.sender}
                      secondary={msg.lastMessage}
                      secondaryTypographyProps={{
                        noWrap: true
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>

        {/* Conversation Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {messages.length === 0 ? (
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Message sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No messages
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start a conversation with your doctor or healthcare team
                </Typography>
              </Box>
            </Box>
          ) : selectedConversation ? (
            <>
              {/* Conversation Header */}
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src="/doctoricon.jpg" alt={selectedConversation.sender} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {selectedConversation.sender}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedConversation.role || 'Doctor'}
                  </Typography>
                </Box>
              </Box>

              {/* Messages */}
              <Box sx={{ flexGrow: 1, p: 2, overflow: 'auto' }}>
                {/* Message bubbles will go here */}
                <Typography variant="body2" color="text.secondary" align="center">
                  Conversation content
                </Typography>
              </Box>

              {/* Message Input */}
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={handleAttachment}>
                    <AttachFile />
                  </IconButton>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={3}
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    sx={{ borderRadius: 2 }}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSend}
                    disabled={!messageText.trim()}
                    sx={{
                      bgcolor: messageText.trim() ? 'primary.main' : 'transparent',
                      color: messageText.trim() ? 'white' : 'text.secondary',
                      '&:hover': {
                        bgcolor: messageText.trim() ? 'primary.dark' : 'transparent'
                      }
                    }}
                  >
                    <Send />
                  </IconButton>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Select a conversation to start messaging
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default PatientMessages;
