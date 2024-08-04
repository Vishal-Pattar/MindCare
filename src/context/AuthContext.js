import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [ussr, setUssr] = useState(null);

  const login = (userdata) => {
    setUssr(userdata);
  };

  const logout = () => {
    setUssr(null);
  };

  return (
    <AuthContext.Provider value={{ ussr, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;