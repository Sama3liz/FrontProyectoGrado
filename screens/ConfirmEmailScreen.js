import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { confirmEmailStyles } from "../styles/screenStyles/ConfirmEmailStyles";
import { useForm } from "react-hook-form";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";

const ConfirmEmailScreen = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onConfirmPressed = async ({ confirmationCode }) => {
    try {
      const { username } = route.params;
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });
      navigation.navigate("SignIn");
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onResendPress = async () => {
    try {
      const { username } = route.params;
      console.log(username)
      await resendSignUpCode({username});
      return { success: true };
    } catch (error) {
      console.error("Error al reenviar código de confirmación:", error);
      return { success: false, error };
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={confirmEmailStyles.root}>
        <Text style={confirmEmailStyles.title}>Confirm your email</Text>

        <CustomInput
          name="confirmationCode"
          control={control}
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
