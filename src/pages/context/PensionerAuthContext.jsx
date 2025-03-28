import { createContext, useState, useEffect } from "react";

export const PensionerAuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Load token from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to log in the user
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken); // Store token in localStorage
    setToken(newToken);
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setToken(null);
    setUser(null);
  };

  return (
    <PensionerAuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </PensionerAuthContext.Provider>
  );
};