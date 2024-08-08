import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(()=>{
     const jwt_Token = localStorage.getItem("JWT_TOKEN")
     console.log(jwt_Token)
     if(jwt_Token){
      setIsAuthenticated(true)
     }


  },[])
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
