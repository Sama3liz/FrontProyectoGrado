import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import Logo from "../assets/Logo_1.png";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import SocialSignInButtons from "../components/Buttons/SocialButtons";
import { useNavigation } from "@react-navigation/core";
import { signUpStyles } from "../styles/screenStyles/SignUpStyles";
import { useForm } from "react-hook-form";
import { signUp } from "aws-amplify/auth";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onRegisterPressed = async ({ username, name, email, password }) => {
    const updated = Date.now();
    const updated_at = updated.toString();
    const picture = "default";
    console.log(typeof updated_at);
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
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
      console.log(userId);
      console.log(isSignUpComplete);
      console.log(nextStep);
      navigation.navigate("ConfirmEmail", { user: email });
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onTermsOfUsePressed = () => {
    navigation.navigate("TermsUse");
  };

  const onPrivacyPressed = () => {
    navigation.navigate("PrivacyPolicy");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={signUpStyles.root}>
        <Image
          source={Logo}
          style={[signUpStyles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <Text style={signUpStyles.title}>Create an account</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="RUC"
          rules={{
            required: "RUC is required",
            minLength: {
              value: 13,
              message: "RUC should be at least 13 characters long",
            },
            maxLength: {
              value: 13,
              message: "RUC should be max 13 characters long",
            },
          }}
        />
        <CustomInput
          name="name"
          control={control}
          placeholder="Full name"
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Username should be max 24 characters long",
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 12,
              message: "Password should be at least 12 characters long",
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: (value) => value === pwd || "Password do not match",
          }}
        />

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={signUpStyles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={signUpStyles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={signUpStyles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
