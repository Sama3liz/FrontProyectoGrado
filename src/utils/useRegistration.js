import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import useNavigationHelpers from "../utils/navigationHelpers";

const useRegistration = () => {
  const [error, setError] = useState(null);
  const { goTo } = useNavigationHelpers();

  const onSignUp = async ({ username, name, email, password }) => {
    const updated = Date.now();
    const updated_at = updated.toString();
    const picture = "default";
    try {
      await signUp({
        username,
        password,
        options: {
          userAttributes: {
            name,
            picture,
            updated_at,
            email,
          },
        },
      });
      goTo("ConfirmEmail", { username });
    } catch (error) {
      setError(error.message || "Error in the creation of the new user");
    }
  };

  const clearError = () => {
    setError(null); // Método para limpiar el error
  };

  return { onSignUp, error, clearError };
};

export default useRegistration;
