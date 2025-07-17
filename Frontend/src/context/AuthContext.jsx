import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const login = async (token) => {
    localStorage.setItem("token", token);
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setUserDetails(null);
  };
  return (
    <AuthContext.Provider value={{setUserDetails, userDetails, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
