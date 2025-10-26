const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Department = require('../models/Department');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedDepartments = async () => {
  const departments = [
    {
      name: 'Cardiology',
      description: 'Comprehensive heart care with advanced diagnostic tools and treatment options for all cardiac conditions.',
      services: ['Echocardiography', 'Cardiac Catheterization', 'Pacemaker Implantation', 'Angioplasty'],
      facilities: ['Cardiac ICU', 'Cath Lab', 'Non-invasive Cardiology Unit'],
      contact: {
        phone: '+1-555-1001',
        email: 'cardiology@gracecare.com',
        extension: '101'
      }
    },
    {
      name: 'Pediatrics',
      description: 'Specialized care for children from infancy through adolescence with child-friendly environment.',
      services: ['Well-child Visits', 'Vaccinations', 'Developmental Assessments', 'Pediatric Emergency Care'],
      facilities: ['Pediatric ICU', 'Neonatal Unit', 'Play Therapy Room'],
      contact: {
        phone: '+1-555-1002',
        email: 'pediatrics@gracecare.com',
        extension: '102'
      }
    },
    {
      name: 'Dental Care',
      description: 'Complete dental services for maintaining optimal oral health and beautiful smiles.',
      services: ['Teeth Cleaning', 'Root Canal Treatment', 'Dental Implants', 'Orthodontics'],
      facilities: ['Digital X-ray', 'Dental Surgery Suite', 'Orthodontic Clinic'],
      contact: {
        phone: '+1-555-1003',
        email: 'dental@gracecare.com',
        extension: '103'
      }
    },
    {
      name: 'Neurology',
      description: 'Expert care for disorders of the nervous system, brain, and spinal cord.',
      services: ['EEG Testing', 'Neurological Consultation', 'Stroke Treatment', 'Epilepsy Management'],
      facilities: ['Neuro ICU', 'EEG Lab', 'Neurology Ward'],
      contact: {
        phone: '+1-555-1004',
        email: 'neurology@gracecare.com',
        extension: '104'
      }
    },
    {
      name: 'Orthopedics',
      description: 'Specialized care for bones, joints, and musculoskeletal system disorders.',
      services: ['Joint Replacement', 'Fracture Care', 'Arthroscopy', 'Sports Medicine'],
      facilities: ['Ortho OR', 'Physical Therapy', 'Cast Room'],
      contact: {
        phone: '+1-555-1005',
        email: 'orthopedics@gracecare.com',
        extension: '105'
      }
    }
  ];

  await Department.deleteMany({});
  await Department.insertMany(departments);
  console.log('Departments seeded successfully');
};

const seedUsers = async () => {
  // Create sample admin
  const adminUser = await User.create({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@gracecare.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1-555-0001'
  });

  // Create sample doctors
  const doctors = [
    {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@gracecare.com',
      password: 'doctor123',
      role: 'doctor',
      phone: '+1-555-1001',
      specialization: 'Cardiologist',
      department: 'Cardiology',
      experience: 12,
      bio: 'Senior Cardiologist with extensive experience in interventional cardiology.',
      consultationFee: 150
    },
    {
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@gracecare.com',
      password: 'doctor123',
      role: 'doctor',
      phone: '+1-555-1002',
      specialization: 'Pediatrician',
      department: 'Pediatrics',
      experience: 8,
      bio: 'Caring pediatrician specializing in child development and preventive care.',
      consultationFee: 120
    },
    {
      firstName: 'Amina',
      lastName: 'Diallo',
      email: 'amina.diallo@gracecare.com',
      password: 'doctor123',
      role: 'doctor',
      phone: '+1-555-1003',
      specialization: 'Dentist',
      department: 'Dental Care',
      experience: 6,
      bio: 'Expert in cosmetic dentistry and dental implants.',
      consultationFee: 100
    }
  ];

  for (const doctorData of doctors) {
    const { specialization, department, experience, bio, consultationFee, ...userData } = doctorData;
    const user = await User.create(userData);
    
    await Doctor.create({
      user: user._id,
      specialization,
      department,
      experience,
      bio,
      consultationFee,
      licenseNumber: `LIC${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      education: [
        {
          degree: 'MD',
          university: 'Medical University',
          year: 2010
        }
      ],
      availability: {
        Monday: { start: '09:00', end: '17:00', available: true },
        Tuesday: { start: '09:00', end: '17:00', available: true },
        Wednesday: { start: '09:00', end: '17:00', available: true },
        Thursday: { start: '09:00', end: '17:00', available: true },
        Friday: { start: '09:00', end: '16:00', available: true },
        Saturday: { start: '10:00', end: '14:00', available: false },
        Sunday: { start: '00:00', end: '00:00', available: false }
      },
      languages: ['English', 'French']
    });
  }

  // Create sample patient
  const patientUser = await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@patient.com',
    password: 'patient123',
    role: 'patient',
    phone: '+1-555-2001',
    dateOfBirth: new Date('1985-05-15'),
    gender: 'male'
  });

  await Patient.create({
    user: patientUser._id,
    bloodGroup: 'A+',
    height: 175,
    weight: 70,
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1-555-2002'
    },
    allergies: ['Penicillin'],
    currentMedications: ['Vitamin D']
  });

  console.log('Users seeded successfully');
};

const seedData = async () => {
  try {
    await connectDB();
    await seedDepartments();
    await seedUsers();
    console.log('All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();