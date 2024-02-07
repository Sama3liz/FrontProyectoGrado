import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import useNavigate from "../../utils/navigation";
import useRegistration from "../../utils/useRegistration";
import { EMAIL_REGEX, RUC_REGEX } from "../../utils/constants";
import styles from "../../styles/styles";
import CustomInputText from "../../components/Inputs/CustomInputText";

const SignUpScreen = () => {
  const { onSignUp, error, clearError } = useRegistration();
  const { goTo } = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const [password, setPassword] = useState("");
  const pwd = watch("password");

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text
          style={[
            styles.title,
            { color: "#051C60", textAlign: "center", marginBottom: 10 },
          ]}
        >
          Create an account
        </Text>
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
        {/* <View style={{ alignItems: "center", margin: 10 }}>
          <PasswordChecklist
            rules={[
              "minLength",
              "specialChar",
              "number",
              "capital",
              "lowercase",
            ]}
            minLength={12}
            value={password}
            onChange={(isValid) => {}}
          />
        </View> */}
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
