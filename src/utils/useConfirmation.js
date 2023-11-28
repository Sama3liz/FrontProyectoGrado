import {
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword
} from "aws-amplify/auth";
import { useState } from "react";
import useNavigationHelpers from "./navigationHelpers";

const useConfirmation = () => {
  const [error, setError] = useState(null);
  const { goTo } = useNavigationHelpers();

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

  return {
    confirmEmailCode,
    resendCodeMail,
    clearError,
    error,
    forgotPassword,
    newForgotPassword
  };
};

export default useConfirmation;
