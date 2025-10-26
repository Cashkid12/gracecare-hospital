const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const sendEmail = async (emailOptions) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"GraceCare Hospital" <${process.env.EMAIL_USERNAME}>`,
      ...emailOptions,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  appointmentConfirmation: (appointment, patient) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2B9ED8; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { background: #003B73; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>GraceCare Hospital</h1>
        <p>Your Health, Our Priority</p>
      </div>
      
      <div class="content">
        <h2>Appointment Confirmed!</h2>
        <p>Dear ${patient.user.firstName} ${patient.user.lastName},</p>
        
        <div class="appointment-details">
          <h3>Appointment Details:</h3>
          <p><strong>Doctor:</strong> Dr. ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}</p>
          <p><strong>Department:</strong> ${appointment.department}</p>
          <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
          <p><strong>Reason:</strong> ${appointment.reason}</p>
        </div>
        
        <p>Please arrive 15 minutes before your scheduled appointment time.</p>
        <p>If you need to reschedule, please contact us at least 24 hours in advance.</p>
      </div>
      
      <div class="footer">
        <p>GraceCare Hospital</p>
        <p>123 Healthcare Avenue, Medical District</p>
        <p>Phone: +1 (555) 123-4567 | Email: info@gracecare.com</p>
      </div>
    </body>
    </html>
  `,

  appointmentReminder: (appointment, patient) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #5BD47A; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .reminder { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #5BD47A; }
        .footer { background: #003B73; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>GraceCare Hospital</h1>
        <p>Appointment Reminder</p>
      </div>
      
      <div class="content">
        <h2>Friendly Reminder</h2>
        <p>Dear ${patient.user.firstName},</p>
        
        <div class="reminder">
          <h3>You have an appointment tomorrow:</h3>
          <p><strong>Doctor:</strong> Dr. ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}</p>
          <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
          <p><strong>Department:</strong> ${appointment.department}</p>
        </div>
        
        <p>Please remember to bring any relevant medical documents or reports.</p>
        <p>We look forward to seeing you!</p>
      </div>
      
      <div class="footer">
        <p>GraceCare Hospital - Caring for you always</p>
      </div>
    </body>
    </html>
  `,

  welcomeEmail: (user) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #2B9ED8; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .welcome { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .footer { background: #003B73; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Welcome to GraceCare Hospital!</h1>
      </div>
      
      <div class="content">
        <div class="welcome">
          <h2>Hello ${user.firstName}!</h2>
          <p>Thank you for joining GraceCare Hospital. We're excited to have you as part of our healthcare family.</p>
          <p>Your account has been successfully created as a <strong>${user.role}</strong>.</p>
        </div>
        
        <p>With your account, you can:</p>
        <ul>
          <li>Book appointments with our expert doctors</li>
          <li>Access your medical records</li>
          <li>Receive personalized health recommendations</li>
          <li>Communicate with healthcare providers</li>
        </ul>
        
        <p>If you have any questions, don't hesitate to contact our support team.</p>
      </div>
      
      <div class="footer">
        <p>Best regards,<br>The GraceCare Hospital Team</p>
      </div>
    </body>
    </html>
  `
};

module.exports = {
  sendEmail,
  emailTemplates,
};