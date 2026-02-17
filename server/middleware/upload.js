const multer = require('multer');
const path = require('path');

// Create upload directory if it doesn't exist
const fs = require('fs');
const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create subdirectories based on file type
    let uploadPath = uploadDir;
    
    if (file.fieldname === 'profileImage') {
      uploadPath = path.join(uploadDir, 'profiles');
    } else if (file.fieldname === 'attachment') {
      uploadPath = path.join(uploadDir, 'attachments');
    } else if (file.fieldname === 'medicalRecord') {
      uploadPath = path.join(uploadDir, 'medical-records');
    } else {
      uploadPath = path.join(uploadDir, 'general');
    }
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Invalid file type. Only JPEG, PNG, GIF, PDF, DOC, DOCX, and TXT files are allowed!'));
  }
};

// Init upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: fileFilter
});

module.exports = { upload };