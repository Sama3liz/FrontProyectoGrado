import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import { confirmEmailStyles } from "../../styles/screenStyles/ConfirmEmailStyles";
import { useForm } from "react-hook-form";
import useConfirmation from "../../utils/useConfirmation";

const ConfirmEmailScreen = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const { goTo } = useNavigationHelpers();
  const { username } = route.params;
  const { confirmEmailCode, resendCodeMail, clearError, error } = useConfirmation();

  const onConfirmPressed = ({ confirmationCode }) => {
    clearError();
    confirmEmailCode({ confirmationCode, username });
  };

  const onSignInPress = () => {
    goTo("SignIn");
  };

  const onResendPress = () => {
    clearError();
    resendCodeMail({ username });
  };

  const handleInputChange = () => {
    clearError();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={confirmEmailStyles.root}>
        <Text style={confirmEmailStyles.title}>Confirm your email</Text>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <CustomInput
          name="confirmationCode"
          control={control}
          handleInputChange={handleInputChange}
          placeholder="Enter your confirmation code"
          rules={{
            required: "Confirmation code is required",
          }}
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ConfirmEmailScreen;
