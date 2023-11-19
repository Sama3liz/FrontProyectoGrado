import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/core";
import { confirmEmailStyles } from "../styles/screenStyles/ConfirmEmailStyles";
import { useForm } from "react-hook-form";

const ConfirmEmailScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onConfirmPressed = () => {
    navigation.navigate("SignIn");
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onResendPress = () => {
    console.warn("onResendPress");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={confirmEmailStyles.root}>
        <Text style={confirmEmailStyles.title}>Confirm your email</Text>

        <CustomInput
          name="code"
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
