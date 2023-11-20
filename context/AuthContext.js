import React, { createContext, useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import amplifyconfig from "../src/amplifyconfiguration.json";
Amplify.configure(amplifyconfig, { ssr: true });
import { signIn, signOut, getCurrentUser, fetchAuthSession } from "aws-amplify/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser(); // Verifica si el usuario está autenticado al cargar la aplicación
  }, []);

  const checkUser = async () => {
    try {
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      setUser(idToken)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  async function logIn(username, password) {
    try {
      await signIn({ username, password });
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      setUser(idToken);
      return { success: true, user: userData };
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  const logOut = async () => {
    try {
      await signOut({ global: true });
      setUser(null);
      console.log(user)
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
