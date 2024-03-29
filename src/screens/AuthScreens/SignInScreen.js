import React, { useContext, useState } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  Text,
  StatusBar,
} from "react-native";
import Logo from "../../assets/Logo_ultimate.png";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigate from "../../utils/navigation";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import CustomInputText from "../../components/Inputs/CustomInputText";
import styles from "../../styles/styles";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const { logIn, error, clearError } = useContext(AuthContext);
  const { control, handleSubmit } = useForm();
  const { goTo } = useNavigate();

  const onSignInPressed = async ({ username, password }) => {
    clearError();
    await logIn(username, password);
  };

  const onForgotPasswordPressed = () => {
    goTo("ForgotPassword");
  };

  const onSignUpPress = () => {
    goTo("Register");
  };

  const handleInputChange = () => {
    clearError();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
      }}
    >
      
      <View style={[styles.container, { justifyContent: 'center', }]}>
        <View style={[styles.void, { alignItems: "center" }]}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
        </View>
        {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
        <CustomInputText
          name="username"
          label="Username"
          placeholder="RUC or Email"
          control={control}
          rules={{ required: "RUC/Email is required" }}
          handleInputChange={handleInputChange}
        />
        <CustomInputText
          name="password"
          label="Password"
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
