import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigate from "../../utils/navigation";
import { confirmEmailStyles } from "../../styles/screenStyles/ConfirmEmailStyles";
import { useForm } from "react-hook-form";
import useConfirmation from "../../utils/useConfirmation";
import styles from "../../styles/styles";
import CustomInputText from "../../components/Inputs/CustomInputText";

const ConfirmEmailScreen = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const { goTo } = useNavigate();
  const { username } = route.params;
  const { confirmEmailCode, resendCodeMail, clearError, error } =
    useConfirmation();

  const onConfirmPressed = ({ confirmationCode }) => {
    clearError();
    confirmEmailCode({ confirmationCode, username });
  };

  const onSignInPress = () => {
    goTo("SignIn");
  };

  const onResendPress = () => {
    clearError();
    resendCodeMail({ username });
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
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text
          style={[
            styles.title,
            { color: "#051C60", textAlign: "center", marginBottom: 10 },
          ]}
        >
          Confirm your email
        </Text>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <CustomInputText
          name="confirmationCode"
          label={"Code"}
          control={control}
          handleInputChange={handleInputChange}
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
