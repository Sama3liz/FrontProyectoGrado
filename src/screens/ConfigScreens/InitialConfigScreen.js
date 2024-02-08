import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import CustomInputText from "../../components/Inputs/CustomInputText";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/styles";
import { EMAIL_REGEX, RUC_REGEX } from "../../utils/constants";

const InitialConfigScreen = () => {
  const { user, logOut, updateAttribute, error, clearError } =
    useContext(AuthContext);
  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (user) {
      setValue("ruc", user.payload["cognito:username"]);
      setValue("email", user.payload.email);
    }
  }, [user]);

  const onSubmitPressed = async (data) => {
    try {
      const response = await fetch("https://tu-api.com/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Company Data</Text>
        {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
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
        <CustomButton text="LogOut" onPress={logOut} type="DANGER" />
      </View>
    </ScrollView>
  );
};

export default InitialConfigScreen;
