import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { newPasswordStyles } from "../styles/screenStyles/NewPasswordStyles";
import { useForm } from "react-hook-form";
import { confirmResetPassword } from "aws-amplify/auth";

const NewPasswordScreen = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const { username } = route.params;

  const onSubmitPressed = async ({ confirmationCode, newPassword }) => {
    try {
      await confirmResetPassword({ username, confirmationCode, newPassword });
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("SignIn");
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Code"
          name="confirmationCode"
          control={control}
          rules={{ required: "Code is required" }}
        />

        <CustomInput
          placeholder="Enter your new password"
          name="newPassword"
          control={control}
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 12 characters long",
            },
          }}
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default NewPasswordScreen;