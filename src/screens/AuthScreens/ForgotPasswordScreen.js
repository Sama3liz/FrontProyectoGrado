import React from "react";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import { useForm } from "react-hook-form";
import useNavigationHelpers from "../../utils/navigationHelpers";
import useConfirmation from "../../utils/useConfirmation";
import styles from "../../styles/styles";
import CustomInputText from "../../components/Inputs/CustomInputText";

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm();
  const { goTo } = useNavigationHelpers();
  const { error, clearError, forgotPassword } = useConfirmation();

  const onSendPressed = async ({ username }) => {
    clearError();
    forgotPassword({ username });
  };

  const onSignInPress = () => {
    goTo("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
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
            Reset your password
          </Text>
        </View>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <CustomInputText
          name="username"
          label="Username"
          control={control}
          placeholder="Insert the Ruc or Email"
          rules={{
            required: "RUC/Email is required",
          }}
        />
        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />
        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
