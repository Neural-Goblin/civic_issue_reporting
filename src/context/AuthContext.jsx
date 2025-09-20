// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user database
  const mockUsers = [
    { id: 1, email: 'user@example.com', password: 'password123', name: 'Test User', role: 'user', city: 'Mumbai' },
    { id: 2, email: 'admin@example.com', password: 'admin123', name: 'Test Admin', role: 'admin', city: 'Delhi' }
  ];

  useEffect(() => {
    // Check if user is logged in on app load
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedUser && storedAuth === 'true') {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          // Remove password from user object before storing
          const { password: _, ...userWithoutPassword } = user;
          
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          localStorage.setItem('isAuthenticated', 'true');
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
        
        setIsLoading(false);
      }, 1000);
    });
  };

  const signup = (userData) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Check if user already exists
        const userExists = mockUsers.some(u => u.email === userData.email);
        
        if (userExists) {
          reject(new Error('User with this email already exists'));
        } else {
          // Create new user
          const newUser = {
            id: Date.now(),
            email: userData.email,
            password: userData.password,
            name: userData.fullName,
            phone: userData.phone,
            city: userData.city,
            role: 'user'
          };
          
          // Remove password from user object before storing
          const { password: _, ...userWithoutPassword } = newUser;
          
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          localStorage.setItem('isAuthenticated', 'true');
          resolve(userWithoutPassword);
        }
        
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context itself as well
export default AuthContext;