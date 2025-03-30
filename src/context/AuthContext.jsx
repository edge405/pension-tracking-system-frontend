// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('user_type') || null;
  });
  const [pensioner, setPensioner] = useState(() => {
    return localStorage.getItem('pensioner') || null;
  });

  // Load token and user type from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('user_type');
    const storedPensioner = localStorage.getItem('pensioner');
    if (storedToken && storedUserType && storedPensioner) {
      setToken(storedToken);
      setUserType(storedUserType);
      setPensioner(storedPensioner)
    }
  }, []);

  // Function to log in the user
  const login = (newToken, user_type, pensioner) => {
    localStorage.setItem('token', newToken); // Store token in localStorage
    localStorage.setItem('user_type', user_type); // Store user type
    localStorage.setItem('pensioner', pensioner);
    setPensioner(pensioner)
    setToken(newToken);
    setUserType(user_type);
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user_type'); // Remove user type
    localStorage.removeItem('pensioner')
    setPensioner(null)
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, userType, pensioner, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};