import { useState } from "react";
import { confirmSignUp, resendSignUpCode, resetPassword, confirmResetPassword, signUp, currentAuthenticatedUser, updateUserAttribute } from "aws-amplify/auth";
import useNavigate from "./navigation";

const useAuth = () => {
  const [error, setError] = useState(null);
  const { goTo } = useNavigate();

  const clearError = () => {
    setError(null);
  };

  const confirmEmailCode = async ({ username, confirmationCode }) => {
    try {
      await confirmSignUp({
        username,
        confirmationCode,
      });
      goTo("SignIn");
    } catch (error) {
      setError(error.message || "Error in the confirmation");
    }
  };

  const resendCodeMail = async ({ username }) => {
    try {
      await resendSignUpCode({ username });
      return { success: true };
    } catch (error) {
      setError(error.message || "Error on resend");
    }
  };

  function handleResetPasswordNextSteps(output, username) {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case "CONFIRM_RESET_PASSWORD_WITH_CODE":
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        goTo("NewPassword", { username });
        break;
      case "DONE":
        console.log("Successfully reset password.");
        break;
    }
  }

  const forgotPassword = async ({ username }) => {
    try {
      const output = await resetPassword({ username });
      handleResetPasswordNextSteps(output, username);
    } catch (error) {
      setError(error.message || "Error on reset");
    }
  };

  const newForgotPassword = async ({ username, confirmationCode, newPassword }) => {
    try {
      await confirmResetPassword({ username, confirmationCode, newPassword });
      goTo("SignIn");
    } catch (error) {
      setError(error.message || "Error on set new password");
    }    
  };

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
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    confirmEmailCode,
    resendCodeMail,
    clearError,
    error,
    forgotPassword,
    newForgotPassword,
    onSignUp
  };
};

export default useAuth;
