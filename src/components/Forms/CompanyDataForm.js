import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../Inputs/CustomInput";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomInputText from "../Inputs/CustomInputText";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useNavigationHelpers from "../../utils/navigationHelpers";
import styles from "../../styles/styles";
import { EMAIL_REGEX, RUC_REGEX } from "../../utils/constants";

const Company = () => {
  const { user } = useContext(AuthContext);
  const { control, handleSubmit, setValue } = useForm();
  const { goBack } = useNavigationHelpers();

  useEffect(() => {
    setValue("ruc", user.payload["cognito:username"]);
  }, [setValue]);

  const onSubmitPressed = /* async */ (data) => {
    console.log(data);
  };

  const onBackPressed = () => {
    goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Company Data</Text>
        <View style={styles.customerDetails}>
          <CustomInputText
            disabled
            name="ruc"
            label="RUC"
            control={control}
            rules={{
              required: "RUC is required",
              pattern: {
                value: RUC_REGEX,
                message: "RUC should contain only numbers",
              },
              minLength: {
                value: 13,
                message: "RUC should be at least 13 digits long",
              },
              maxLength: {
                value: 13,
                message: "RUC should be maximum 13 digits long",
              },
            }}
          />
          <CustomInputText
            placeholder="Insert the commercial name"
            name="commercial"
            label="Commercial Name"
            control={control}
            rules={{
              required: "Comercial name is required",
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
            placeholder="Insert the email"
            name="email"
            label="Email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
          />
          <CustomInputText
            placeholder="Insert the phone"
            name="phone"
            label="Phone"
            control={control}
            rules={{
              required: "Phone is required",
              minLength: {
                value: 7,
                message: "Phone should be at least 7 characters long",
              },
              maxLength: {
                value: 10,
                message: "Phone should be max 10 characters long",
              },
            }}
          />
          <CustomInputText
            placeholder="Insert the address"
            name="address"
            label="Address"
            control={control}
            rules={{
              required: "Address is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters long",
              },
              maxLength: {
                value: 50,
                message: "Address should be max 50 characters long",
              },
            }}
          />
        </View>

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
        <CustomButton text="Back" onPress={onBackPressed} type="PRIMARY" />
      </View>
    </ScrollView>
  );
};

export default Company;