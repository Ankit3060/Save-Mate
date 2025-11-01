import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const authContext = createContext({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  accessToken: null,
  setAccessToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}api/v1/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        setUser(res.data.user);
        setIsAuthenticated(true);
        setAccessToken(res.data.accessToken);
      } catch (error) {
        console.log("Not logged in or refresh failed:", error);
        setUser(null);
        setIsAuthenticated(false);
        setAccessToken(null);
      }
    };
    refresh();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
