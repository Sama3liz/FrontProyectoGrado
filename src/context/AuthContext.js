import React, { createContext, useState, useEffect } from "react";
import {
  signIn,
  signOut,
  fetchAuthSession,
  getCurrentUser,
} from "aws-amplify/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    checkUser(); // Verify at start
  }, []);

  const clearError = () => {
    setError(null)
  }

  const checkUser = async () => {
    try {
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      setUser(idToken);
    } catch (err) {
      setUser(null)
      if (err && err.message) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  async function logIn(username, password) {
    try {
      await signIn({ username, password });
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      setUser(idToken);
    } catch (error) {
      setError(error.message)
    }
  }

  const logOut = async () => {
    try {
      await signOut();
      setUser(undefined);
    } catch (error) {
      setError(error.message)
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logIn, logOut, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

