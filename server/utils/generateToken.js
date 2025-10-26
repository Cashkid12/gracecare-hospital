const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET || 'gracecare_hospital_secret_key_2024', 
    { expiresIn: '30d' }
  );
};

module.exports = generateToken;