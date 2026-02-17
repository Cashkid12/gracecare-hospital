const fs = require('fs').promises;
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
const auditLogPath = path.join(logsDir, 'audit.log');

// Ensure logs directory exists
async function ensureLogsDir() {
  try {
    await fs.access(logsDir);
  } catch (error) {
    await fs.mkdir(logsDir, { recursive: true });
  }
}

// Audit log levels
const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  SECURITY: 'SECURITY'
};

// Log audit event
async function logAuditEvent(userId, action, resource, resourceId, details = {}, level = LOG_LEVELS.INFO) {
  try {
    await ensureLogsDir();
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      userId: userId || 'SYSTEM',
      action,
      resource,
      resourceId,
      details,
      ipAddress: details.ipAddress || 'unknown',
      userAgent: details.userAgent || 'unknown'
    };

    // Write to file
    const logLine = JSON.stringify(logEntry) + '\n';
    await fs.appendFile(auditLogPath, logLine);

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[AUDIT ${level}] ${action} on ${resource} (${resourceId}) by ${userId}`);
    }
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}

// Helper functions for common audit events
const auditLogger = {
  // User actions
  userLogin: (userId, details) => logAuditEvent(userId, 'LOGIN', 'User', userId, details, LOG_LEVELS.INFO),
  userLogout: (userId, details) => logAuditEvent(userId, 'LOGOUT', 'User', userId, details, LOG_LEVELS.INFO),
  userCreated: (userId, targetUserId, details) => logAuditEvent(userId, 'CREATE', 'User', targetUserId, details, LOG_LEVELS.INFO),
  userUpdated: (userId, targetUserId, details) => logAuditEvent(userId, 'UPDATE', 'User', targetUserId, details, LOG_LEVELS.INFO),
  userDeleted: (userId, targetUserId, details) => logAuditEvent(userId, 'DELETE', 'User', targetUserId, details, LOG_LEVELS.WARN),
  userSuspended: (userId, targetUserId, details) => logAuditEvent(userId, 'SUSPEND', 'User', targetUserId, details, LOG_LEVELS.WARN),
  userActivated: (userId, targetUserId, details) => logAuditEvent(userId, 'ACTIVATE', 'User', targetUserId, details, LOG_LEVELS.INFO),

  // Medical record actions
  medicalRecordCreated: (userId, recordId, details) => logAuditEvent(userId, 'CREATE', 'MedicalRecord', recordId, details, LOG_LEVELS.INFO),
  medicalRecordUpdated: (userId, recordId, details) => logAuditEvent(userId, 'UPDATE', 'MedicalRecord', recordId, details, LOG_LEVELS.INFO),
  medicalRecordDeleted: (userId, recordId, details) => logAuditEvent(userId, 'DELETE', 'MedicalRecord', recordId, details, LOG_LEVELS.WARN),
  medicalRecordAccessed: (userId, recordId, details) => logAuditEvent(userId, 'ACCESS', 'MedicalRecord', recordId, details, LOG_LEVELS.INFO),

  // Prescription actions
  prescriptionCreated: (userId, prescriptionId, details) => logAuditEvent(userId, 'CREATE', 'Prescription', prescriptionId, details, LOG_LEVELS.INFO),
  prescriptionUpdated: (userId, prescriptionId, details) => logAuditEvent(userId, 'UPDATE', 'Prescription', prescriptionId, details, LOG_LEVELS.INFO),
  prescriptionDeleted: (userId, prescriptionId, details) => logAuditEvent(userId, 'DELETE', 'Prescription', prescriptionId, details, LOG_LEVELS.WARN),
  prescriptionDispensed: (userId, prescriptionId, details) => logAuditEvent(userId, 'DISPENSE', 'Prescription', prescriptionId, details, LOG_LEVELS.INFO),

  // Appointment actions
  appointmentCreated: (userId, appointmentId, details) => logAuditEvent(userId, 'CREATE', 'Appointment', appointmentId, details, LOG_LEVELS.INFO),
  appointmentUpdated: (userId, appointmentId, details) => logAuditEvent(userId, 'UPDATE', 'Appointment', appointmentId, details, LOG_LEVELS.INFO),
  appointmentDeleted: (userId, appointmentId, details) => logAuditEvent(userId, 'DELETE', 'Appointment', appointmentId, details, LOG_LEVELS.WARN),
  appointmentCancelled: (userId, appointmentId, details) => logAuditEvent(userId, 'CANCEL', 'Appointment', appointmentId, details, LOG_LEVELS.INFO),

  // Invoice actions
  invoiceCreated: (userId, invoiceId, details) => logAuditEvent(userId, 'CREATE', 'Invoice', invoiceId, details, LOG_LEVELS.INFO),
  invoiceUpdated: (userId, invoiceId, details) => logAuditEvent(userId, 'UPDATE', 'Invoice', invoiceId, details, LOG_LEVELS.INFO),
  invoiceDeleted: (userId, invoiceId, details) => logAuditEvent(userId, 'DELETE', 'Invoice', invoiceId, details, LOG_LEVELS.WARN),
  invoicePaid: (userId, invoiceId, details) => logAuditEvent(userId, 'PAY', 'Invoice', invoiceId, details, LOG_LEVELS.INFO),

  // Security events
  unauthorizedAccess: (userId, resource, details) => logAuditEvent(userId, 'UNAUTHORIZED_ACCESS', resource, 'N/A', details, LOG_LEVELS.SECURITY),
  failedLogin: (email, details) => logAuditEvent('N/A', 'FAILED_LOGIN', 'User', email, details, LOG_LEVELS.SECURITY),
  passwordChanged: (userId, details) => logAuditEvent(userId, 'PASSWORD_CHANGE', 'User', userId, details, LOG_LEVELS.INFO),
  roleChanged: (userId, targetUserId, details) => logAuditEvent(userId, 'ROLE_CHANGE', 'User', targetUserId, details, LOG_LEVELS.WARN),

  // System events
  systemStartup: (details) => logAuditEvent('SYSTEM', 'STARTUP', 'System', 'N/A', details, LOG_LEVELS.INFO),
  systemShutdown: (details) => logAuditEvent('SYSTEM', 'SHUTDOWN', 'System', 'N/A', details, LOG_LEVELS.INFO),
  backupCreated: (userId, details) => logAuditEvent(userId, 'BACKUP_CREATE', 'System', 'N/A', details, LOG_LEVELS.INFO),
  backupRestored: (userId, details) => logAuditEvent(userId, 'BACKUP_RESTORE', 'System', 'N/A', details, LOG_LEVELS.WARN)
};

// Middleware to log requests
const auditMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
  // Log the request after it's processed
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const details = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    // Log significant actions
    if (req.user && (req.method !== 'GET' || req.originalUrl.includes('admin'))) {
      logAuditEvent(
        req.user._id,
        `${req.method}_${req.originalUrl.split('/')[2] || 'ROOT'}`.toUpperCase(),
        'API',
        req.originalUrl,
        details,
        res.statusCode >= 400 ? LOG_LEVELS.ERROR : LOG_LEVELS.INFO
      );
    }
  });

  next();
};

module.exports = {
  auditLogger,
  auditMiddleware,
  LOG_LEVELS
};
