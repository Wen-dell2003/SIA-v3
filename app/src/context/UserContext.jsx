import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Fetch user profile from API
      setUser({
        email: localStorage.getItem('userEmail'),
        name: localStorage.getItem('userName') || 'User'
      });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userName', userData.name || 'User');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  };

  const updateProfile = (newData) => {
    setUser((prev) => ({
      ...prev,
      ...newData
    }));
    if (newData.name) {
      localStorage.setItem('userName', newData.name);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
