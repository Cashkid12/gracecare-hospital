const Message = require('../models/Message');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { validationResult } = require('express-validator');

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const { sender, recipient, messageType, status, priority } = req.query;
    let query = {};

    if (sender) query.sender = sender;
    if (recipient) query.recipient = recipient;
    if (messageType) query.messageType = messageType;
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // For regular users, only show their messages
    if (req.user.role !== 'admin') {
      query.$or = [
        { sender: req.user._id },
        { recipient: req.user._id }
      ];
    }

    const messages = await Message.find(query)
      .populate('sender', 'firstName lastName role email')
      .populate('recipient', 'firstName lastName role email')
      .populate('relatedTo.appointment')
      .populate('relatedTo.patient')
      .populate('relatedTo.department')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private
const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('sender', 'firstName lastName role email')
      .populate('recipient', 'firstName lastName role email')
      .populate('relatedTo.appointment')
      .populate('relatedTo.patient')
      .populate('relatedTo.department')
      .populate('parentMessage');

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check access permissions
    if (req.user.role !== 'admin') {
      if (message.sender._id.toString() !== req.user._id.toString() && 
          message.recipient._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this message'
        });
      }
    }

    // Mark as read if recipient is viewing
    if (message.recipient._id.toString() === req.user._id.toString() && 
        message.status !== 'Read') {
      message.status = 'Read';
      message.readAt = new Date();
      await message.save();
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new message
// @route   POST /api/messages
// @access  Private
const createMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { recipient, subject, content, messageType, priority, relatedTo, parentMessage } = req.body;

    // Check if recipient exists
    const recipientUser = await User.findById(recipient);
    if (!recipientUser) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }

    // Handle announcement messages (admin only)
    if (messageType === 'Announcement' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to send announcements'
      });
    }

    // Handle system messages (admin only)
    if (messageType === 'System' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to send system messages'
      });
    }

    const message = await Message.create({
      sender: req.user._id,
      recipient,
      subject,
      content,
      messageType: messageType || 'Direct',
      priority: priority || 'Normal',
      relatedTo,
      isReply: !!parentMessage,
      parentMessage
    });

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'firstName lastName role email')
      .populate('recipient', 'firstName lastName role email')
      .populate('relatedTo.appointment')
      .populate('relatedTo.patient')
      .populate('relatedTo.department');

    // Emit real-time notification (will be implemented with Socket.io)
    // io.to(recipient).emit('newMessage', populatedMessage);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: populatedMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update message
// @route   PUT /api/messages/:id
// @access  Private
const updateMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    let message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check access permissions
    if (req.user.role !== 'admin' && message.sender._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this message'
      });
    }

    const { status } = req.body;

    message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('sender', 'firstName lastName role email')
      .populate('recipient', 'firstName lastName role email')
      .populate('relatedTo.appointment')
      .populate('relatedTo.patient')
      .populate('relatedTo.department');

    res.json({
      success: true,
      message: 'Message updated successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check access permissions
    if (req.user.role !== 'admin' && 
        message.sender._id.toString() !== req.user._id.toString() &&
        message.recipient._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this message'
      });
    }

    await message.remove();

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get messages for current user
// @route   GET /api/messages/inbox
// @access  Private
const getInbox = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user._id })
      .populate('sender', 'firstName lastName role email')
      .populate('relatedTo.appointment')
      .populate('relatedTo.patient')
      .populate('relatedTo.department')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get sent messages for current user
// @route   GET /api/messages/sent
// @access  Private
const getSentMessages = async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user._id })
      .populate('recipient', 'firstName lastName role email')
      .populate('relatedTo.appointment')
      .populate('relatedTo.patient')
      .populate('relatedTo.department')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get unread message count
// @route   GET /api/messages/unread-count
// @access  Private
const getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      recipient: req.user._id,
      status: { $ne: 'Read' }
    });

    res.json({
      success: true,
      data: { count }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check if user is recipient
    if (message.recipient._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to mark this message as read'
      });
    }

    if (message.status !== 'Read') {
      message.status = 'Read';
      message.readAt = new Date();
      await message.save();
    }

    const populatedMessage = await Message.findById(req.params.id)
      .populate('sender', 'firstName lastName role email')
      .populate('recipient', 'firstName lastName role email');

    res.json({
      success: true,
      message: 'Message marked as read',
      data: populatedMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  getInbox,
  getSentMessages,
  getUnreadCount,
  markAsRead
};