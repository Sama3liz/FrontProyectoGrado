import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import Logo from "../../assets/Logo_1.png";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import { signUpStyles } from "../../styles/screenStyles/SignUpStyles";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import useNavigationHelpers from "../../utils/navigationHelpers";
import useRegistration from "../../utils/useRegistration";
import { EMAIL_REGEX, RUC_REGEX } from "../../utils/constants";
import styles from "../../styles/styles";
import CustomInputText from "../../components/Inputs/CustomInputText";

const SignUpScreen = () => {
  const { onSignUp, error, clearError } = useRegistration();
  const { goTo } = useNavigationHelpers();
  const { control, handleSubmit, watch } = useForm();
  const [password, setPassword] = useState("");
  const pwd = watch("password");
  const { height } = useWindowDimensions();

  const onRegisterPressed = (data) => {
    clearError();
    onSignUp(data);
  };

  const onSignInPress = () => {
    goTo("SignIn");
  };

  const onTermsOfUsePressed = () => {
    goTo("TermsUse");
  };

  const onPrivacyPressed = () => {
    goTo("PrivacyPolicy");
  };

  const handleInputChange = () => {
    clearError();
  };

  const handlePasswordChange = (text) => {
    clearError();
    setPassword(text);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View
          style={[
            styles.void,
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              marginTop: 50,
            },
          ]}
        >
          <Text style={[styles.title, { color: "#051C60" }]}>
            Create an account
          </Text>
        </View>
        {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
        <CustomInputText
          name="username"
          label="RUC"
          control={control}
          placeholder="RUC"
          handleInputChange={handleInputChange}
          rules={{
            required: "RUC is required",
            pattern: {
              value: RUC_REGEX,
              message: "RUC should contain only numbers",
            },
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
        <CustomInputText
          name="name"
          label="Name"
          control={control}
          placeholder="Full name"
          handleInputChange={handleInputChange}
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Name should be max 24 characters long",
            },
          }}
        />
        <CustomInputText
          name="email"
          label="Email"
          control={control}
          placeholder="Email"
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
        />
        <CustomInputText
          name="password"
          label="Password"
          control={control}
          placeholder="Password"
          secureTextEntry
          handleInputChange={handlePasswordChange}
          rules={{
            required: "Password is required",
            minLength: {
              value: 12,
              message: "Password should be at least 12 characters long",
            },
          }}
        />
        <CustomInputText
          name="password-repeat"
          label="Password"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          handleInputChange={handleInputChange}
          rules={{
            validate: (value) => value === pwd || "Password do not match",
          }}
        />
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
          minLength={12}
          value={password}
          onChange={(isValid) => {}}
        />
        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />
        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

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
