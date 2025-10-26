import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      // Mock login - replace with actual API call
      if (email === 'admin@gracecare.com' && password === 'admin123' && role === 'admin') {
        const userData = {
          id: '1',
          firstName: 'System',
          lastName: 'Administrator',
          email: 'admin@gracecare.com',
          role: 'admin',
          phone: '+1234567890'
        };
        
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true };
      }
      
      if (email === 'doctor@gracecare.com' && password === 'password' && role === 'doctor') {
        const userData = {
          id: '2',
          firstName: 'Sarah',
          lastName: 'Smith',
          email: 'doctor@gracecare.com',
          role: 'doctor',
          phone: '+1234567891'
        };
        
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true };
      }
      
      if (email === 'patient@gracecare.com' && password === 'password' && role === 'patient') {
        const userData = {
          id: '3',
          firstName: 'John',
          lastName: 'Doe',
          email: 'patient@gracecare.com',
          role: 'patient',
          phone: '+1234567892'
        };
        
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true };
      }
      
      throw new Error('Invalid email or password');
      
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration - replace with actual API call
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        phone: userData.phone || ''
      };
      
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}