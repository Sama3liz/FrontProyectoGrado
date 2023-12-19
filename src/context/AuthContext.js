import React, { createContext, useState, useEffect } from "react";
import {
  signIn,
  signOut,
  fetchAuthSession,
  updateUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState("");

  useEffect(() => {
    checkUser(); // Verify at start
  }, []);

  const clearError = () => {
    setError(null);
  };

  const checkUser = async () => {
    try {
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      setUser(idToken);
    } catch (err) {
      setUser(null);
      if (err && err.message) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
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
      setError(error.message);
    }
  }

  const logOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  async function updateAttribute() {
    try {
      await updateUserAttributes({
        userAttributes: {
          "custom:config": "true",
        },
      });
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        logIn,
        logOut,
        clearError,
        updateAttribute,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
