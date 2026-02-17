const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  getInbox,
  getSentMessages,
  getUnreadCount,
  markAsRead
} = require('../controllers/messageController');

// All routes protected
router.use(protect);

// Get inbox messages
router.get('/inbox', getInbox);

// Get sent messages
router.get('/sent', getSentMessages);

// Get unread message count
router.get('/unread-count', getUnreadCount);

// Mark message as read
router.put('/:id/read', markAsRead);

// Get all messages (Admin can see all)
router.get('/', getMessages);

// Get single message
router.get('/:id', getMessage);

// Create new message
router.post('/', createMessage);

// Update message
router.put('/:id', updateMessage);

// Delete message
router.delete('/:id', deleteMessage);

module.exports = router;