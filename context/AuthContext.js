import React, { createContext, useState, useEffect } from "react";
/* import * as Keychain from "react-native-keychain"; */

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser(); // Verifica si el usuario está autenticado al cargar la aplicación
  }, []);

  const checkUser = async () => {
    try {
      /* const userInfo = await Auth.currentAuthenticatedUser(); */
      const userInfo = user;
      console.log(userInfo);
      setUser(userInfo);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({username, password}) => {
    try {
      /* Log in API call here */
      /* const data = await Keychain.setGenericPassword('token', JSON.stringify({username,password})); */
      const userData = { username, password };
      console.log(userData);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return { success: false, error };
    }
  };

  const signOut = async () => {
    try {
      /* await Auth.signOut(); */
      /* await Keychain.resetGenericPassword(); */
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
