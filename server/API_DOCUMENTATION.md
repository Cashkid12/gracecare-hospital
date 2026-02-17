# GraceCare Hospital API Documentation

## Overview
Complete RESTful API for GraceCare Hospital Management System with role-based access control, real-time notifications, and comprehensive audit logging.

## Base URL
```
http://localhost:10000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/password` - Change password

### Users Management
- `GET /api/admin/users` - Get all users (Admin)
- `POST /api/admin/users` - Create new user (Admin)
- `GET /api/admin/users/:id` - Get user by ID (Admin)
- `PUT /api/admin/users/:id` - Update user (Admin)
- `DELETE /api/admin/users/:id` - Delete user (Admin)

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create doctor profile (Admin)
- `PUT /api/doctors/:id` - Update doctor profile (Doctor/Admin)
- `DELETE /api/doctors/:id` - Delete doctor (Admin)

### Patients
- `GET /api/patients` - Get all patients (Admin/Doctor)
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create patient profile
- `PUT /api/patients/:id` - Update patient profile
- `DELETE /api/patients/:id` - Delete patient (Admin)

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create department (Admin)
- `PUT /api/departments/:id` - Update department (Admin)
- `DELETE /api/departments/:id` - Delete department (Admin)

### Appointments
- `GET /api/appointments` - Get appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/appointments/doctor/:doctorId` - Get doctor's appointments
- `GET /api/appointments/patient/:patientId` - Get patient's appointments

### Medical Records
- `GET /api/medical-records` - Get medical records (Doctor/Admin)
- `GET /api/medical-records/:id` - Get medical record by ID
- `POST /api/medical-records` - Create medical record (Doctor/Admin)
- `PUT /api/medical-records/:id` - Update medical record (Doctor/Admin)
- `DELETE /api/medical-records/:id` - Delete medical record (Admin)
- `POST /api/medical-records/:id/attachments` - Add attachment (Doctor/Admin)

### Prescriptions
- `GET /api/prescriptions` - Get prescriptions
- `GET /api/prescriptions/:id` - Get prescription by ID
- `POST /api/prescriptions` - Create prescription (Doctor/Admin)
- `PUT /api/prescriptions/:id` - Update prescription (Doctor/Admin)
- `DELETE /api/prescriptions/:id` - Delete prescription (Admin)
- `GET /api/prescriptions/patient/:patientId` - Get patient's prescriptions
- `GET /api/prescriptions/doctor/:doctorId` - Get doctor's prescriptions

### Invoices
- `GET /api/invoices` - Get invoices
- `GET /api/invoices/:id` - Get invoice by ID
- `POST /api/invoices` - Create invoice (Admin/Receptionist)
- `PUT /api/invoices/:id` - Update invoice (Admin/Receptionist)
- `DELETE /api/invoices/:id` - Delete invoice (Admin)
- `GET /api/invoices/:id/pdf` - Generate PDF invoice
- `GET /api/invoices/stats` - Get invoice statistics (Admin/Receptionist)

### Messages
- `GET /api/messages` - Get messages (Admin can see all)
- `GET /api/messages/:id` - Get message by ID
- `POST /api/messages` - Send message
- `PUT /api/messages/:id` - Update message
- `DELETE /api/messages/:id` - Delete message
- `GET /api/messages/inbox` - Get inbox messages
- `GET /api/messages/sent` - Get sent messages
- `GET /api/messages/unread-count` - Get unread message count
- `PUT /api/messages/:id/read` - Mark message as read

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics (Admin)
- `GET /api/analytics/appointments` - Get appointment statistics (Admin)
- `GET /api/analytics/revenue` - Get revenue statistics (Admin)
- `GET /api/analytics/patients` - Get patient statistics (Admin)
- `GET /api/analytics/doctors` - Get doctor statistics (Admin)

## User Roles and Permissions

### Admin
- Full access to all endpoints
- User management
- System configuration
- Analytics and reporting

### Doctor
- Manage own patient records
- Create prescriptions
- View assigned patients
- Update own profile

### Nurse
- View patient information
- Update patient vitals
- Manage medical records (limited)

### Receptionist
- Patient registration
- Appointment scheduling
- Invoice management
- Basic patient information

### Patient
- View own medical records
- View own prescriptions
- View own appointments
- View own invoices
- Send messages

## Data Models

### User
```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String, // admin, doctor, nurse, receptionist, patient
  phone: String,
  address: String,
  dateOfBirth: Date,
  profileImage: String,
  status: String, // Active, Suspended
  lastLogin: Date
}
```

### Doctor
```javascript
{
  user: ObjectId,
  specialization: String,
  licenseNumber: String,
  experience: Number,
  department: ObjectId,
  consultationFee: Number,
  bio: String,
  isVerified: Boolean,
  availability: Object
}
```

### Patient
```javascript
{
  user: ObjectId,
  bloodGroup: String,
  height: Number,
  weight: Number,
  emergencyContact: Object,
  insurance: Object,
  allergies: [String],
  currentMedications: [String],
  medicalHistory: [Object],
  assignedDoctor: ObjectId
}
```

### Medical Record
```javascript
{
  patient: ObjectId,
  doctor: ObjectId,
  visitDate: Date,
  diagnosis: String,
  symptoms: [String],
  treatment: String,
  medications: [Object],
  vitalSigns: Object,
  notes: String,
  attachments: [Object],
  followUpDate: Date,
  status: String, // Active, Completed, Archived
  createdBy: ObjectId
}
```

### Prescription
```javascript
{
  patient: ObjectId,
  doctor: ObjectId,
  medicalRecord: ObjectId,
  medications: [Object],
  diagnosis: String,
  issuedDate: Date,
  validUntil: Date,
  status: String, // Pending, Dispensed, Completed, Cancelled
  notes: String,
  pharmacy: Object,
  createdBy: ObjectId
}
```

### Invoice
```javascript
{
  patient: ObjectId,
  appointment: ObjectId,
  prescription: ObjectId,
  items: [Object],
  subtotal: Number,
  tax: Number,
  discount: Number,
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: String, // Pending, Partial, Paid, Overdue, Cancelled
  issuedDate: Date,
  dueDate: Date,
  paidDate: Date,
  notes: String,
  invoiceNumber: String,
  createdBy: ObjectId
}
```

## Error Handling
All errors follow this format:
```javascript
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message" // Only in development
}
```

## Security Features
- JWT authentication
- Role-based access control
- Input validation
- Audit logging
- Helmet security headers
- Rate limiting
- File upload validation

## File Uploads
Supported file types: JPEG, PNG, GIF, PDF, DOC, DOCX, TXT
Maximum file size: 10MB
Files are stored in `/uploads` directory with organized subdirectories.

## Audit Logging
All significant actions are logged with:
- Timestamp
- User ID
- Action performed
- Resource affected
- IP address
- User agent

Logs are stored in `/logs/audit.log`

## Real-time Features
- Socket.io integration for real-time notifications
- Instant message delivery
- Appointment status updates
- System announcements

## Rate Limiting
API requests are rate-limited to prevent abuse:
- 100 requests per 15 minutes per IP
- 10 requests per minute for authentication endpoints

## Environment Variables
```
PORT=10000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## Testing
Run the server in development mode:
```bash
npm run dev
```

Test endpoints using curl or Postman:
```bash
# Health check
curl http://localhost:10000/health

# API info
curl http://localhost:10000/api
```