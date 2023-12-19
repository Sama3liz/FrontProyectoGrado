import { useState } from "react";
import {
  signUp,
  currentAuthenticatedUser,
  updateUserAttribute,
} from "aws-amplify/auth";
import useNavigationHelpers from "../utils/navigationHelpers";

const useRegistration = () => {
  const [error, setError] = useState(null);
  const { goTo } = useNavigationHelpers();

  const onSignUp = async ({ username, name, email, password }) => {
    const updated = Date.now();
    const updated_at = updated.toString();
    const picture = "default";
    const config = "false";
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
            "custom:config": config,
          },
        },
      });
      goTo("ConfirmEmail", { username });
    } catch (error) {
      setError(error.message || "Error in the creation of the new user");
    }
  };

  const fetchUserDetails = async () => {
    try {
      const user = await currentAuthenticatedUser();
      setEmail(user.attributes.email);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      await Auth.updateUserAttributes(Auth.currentUser, {
        "custom:email": email,
      });
      console.log("Datos guardados correctamente");
    } catch (error) {
      setError(error.message);
    }
  };

  const clearError = () => {
    setError(null); // Método para limpiar el error
  };

  return { onSignUp, error, clearError };
};

export default useRegistration;
