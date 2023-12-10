import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error(
      "useError debe estar utilizado dentro de un Provider de ErrorContext"
    );
  }
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const clearError = () => {
    setErrorMessage("");
  };

  const value = {
    errorMessage,
    setErrorMessage,
    clearError,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
