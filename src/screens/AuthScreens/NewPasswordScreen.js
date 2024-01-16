import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import { useForm } from "react-hook-form";
import useNavigationHelpers from "../../utils/navigationHelpers";
import useConfirmation from "../../utils/useConfirmation";
import PasswordChecklist from "react-password-checklist";
import styles from "../../styles/styles";
import CustomInputText from "../../components/Inputs/CustomInputText";

const NewPasswordScreen = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const { username } = route.params;
  const { goTo } = useNavigationHelpers();
  const { error, clearError, newForgotPassword } = useConfirmation();
  const [password, setPassword] = useState("");

  const onSubmitPressed = ({ confirmationCode, newPassword }) => {
    clearError();
    newForgotPassword({ username, confirmationCode, newPassword });
  };

  const onSignInPress = () => {
    goTo("SignIn");
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
          Reset your password
        </Text>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <CustomInputText
          placeholder="Code"
          name="confirmationCode"
          label={"Code"}
          control={control}
          rules={{ required: "Code is required" }}
        />
        <CustomInputText
          name="newPassword"
          label={"New Password"}
          control={control}
          placeholder="Enter your new password"
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
