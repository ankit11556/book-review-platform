import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthApi } from "../services/AuthApi";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  
  const login = (tokenData) => {
    setToken(tokenData);
    localStorage.setItem("token", tokenData);
  };

  const logout = ()=>{
    setUser(null)
    localStorage.removeItem("token")
    alert("logout successful")
  }

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await checkAuthApi(token)
          setUser(res.data);
        } catch (error) {
          console.error("Auth check failed:", error);
           logout(); // invalid token
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  
  return (
    <AuthContext.Provider value={{ user,token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
