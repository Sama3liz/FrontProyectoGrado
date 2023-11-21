import React from "react";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import { useForm } from "react-hook-form";
import useNavigationHelpers from "../../utils/navigationHelpers";
import useConfirmation from "../../utils/useConfirmation";

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
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Reset your password</Text>

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <CustomInput
          name="username"
          control={control}
          placeholder="RUC/Email"
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
