const { sendEmail, emailTemplates } = require('../config/email');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

const sendAppointmentConfirmation = async (appointmentId) => {
  try {
    const appointment = await Appointment.findById(appointmentId)
      .populate('patient')
      .populate('doctor')
      .populate('doctor.user');

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    const patient = await User.findById(appointment.patient.user);
    
    const emailContent = emailTemplates.appointmentConfirmation(appointment, patient);
    
    await sendEmail({
      to: patient.email,
      subject: 'Appointment Confirmation - GraceCare Hospital',
      html: emailContent,
    });

    console.log(`Appointment confirmation sent to ${patient.email}`);
  } catch (error) {
    console.error('Error sending appointment confirmation:', error);
    throw error;
  }
};

const sendAppointmentReminder = async (appointmentId) => {
  try {
    const appointment = await Appointment.findById(appointmentId)
      .populate('patient')
      .populate('doctor')
      .populate('doctor.user');

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    const patient = await User.findById(appointment.patient.user);
    
    const emailContent = emailTemplates.appointmentReminder(appointment, patient);
    
    await sendEmail({
      to: patient.email,
      subject: 'Appointment Reminder - GraceCare Hospital',
      html: emailContent,
    });

    console.log(`Appointment reminder sent to ${patient.email}`);
  } catch (error) {
    console.error('Error sending appointment reminder:', error);
    throw error;
  }
};

const sendWelcomeEmail = async (userId) => {
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    const emailContent = emailTemplates.welcomeEmail(user);
    
    await sendEmail({
      to: user.email,
      subject: 'Welcome to GraceCare Hospital!',
      html: emailContent,
    });

    console.log(`Welcome email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

module.exports = {
  sendAppointmentConfirmation,
  sendAppointmentReminder,
  sendWelcomeEmail,
};