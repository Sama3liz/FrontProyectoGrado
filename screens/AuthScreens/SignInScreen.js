import React, { useContext, useState } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import Logo from "../../assets/Logo_1.png";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import SocialSignInButtons from "../../components/Buttons/SocialButtons";
import useNavigationHelpers from "../../utils/navigationHelpers";
import { signInStyles } from "../../styles/screenStyles/SignInStyles";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const { logIn, error, clearError } = useContext(AuthContext);
  const { control, handleSubmit } = useForm();
  const { goTo } = useNavigationHelpers();

  const onSignInPressed = async ({ username, password }) => {
    clearError();
    await logIn(username, password);
  };

  const onForgotPasswordPressed = () => {
    goTo("ForgotPassword");
  };

  const onSignUpPress = () => {
    goTo("SignUp");
  };

  const handleInputChange = () => {
    clearError();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={signInStyles.root}>
        <Image
          source={Logo}
          style={[signInStyles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
        <CustomInput
          name="username"
          placeholder="RUC/Email"
          control={control}
          rules={{ required: "RUC/Email is required" }}
          handleInputChange={handleInputChange}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          handleInputChange={handleInputChange}
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password should be minimum 3 characters long",
            },
          }}
        />

        <CustomButton
          text={"Sign In"}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

