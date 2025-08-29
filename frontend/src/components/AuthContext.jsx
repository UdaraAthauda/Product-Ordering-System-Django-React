import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import api from "@/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // authentication useEffect
  useEffect(() => {
    auth().catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const refreshToken = async () => {
    const refresh_token = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post("auth/token/refresh/", {
        refresh: refresh_token,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      setIsAuthenticated(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, auth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
