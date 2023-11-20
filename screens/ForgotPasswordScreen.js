import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { newPasswordStyles } from "../styles/screenStyles/NewPasswordStyles";
import { useForm } from "react-hook-form";
import { resetPassword } from 'aws-amplify/auth';

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onSendPressed = async ({ username }) => {
    try {
      const output = await resetPassword({ username });
      handleResetPasswordNextSteps(output, username);
    } catch (error) {
      console.log(error);
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
        navigation.navigate("NewPassword", { username });
        break;
      case "DONE":
        console.log("Successfully reset password.");
        break;
    }
  }

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Reset your password</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: "Username is required",
          }}
        />

        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
