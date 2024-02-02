import React, { useContext, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import { AuthContext } from "../../context/AuthContext";
import CustomInputText from "../../components/Inputs/CustomInputText";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Buttons/CustomButton";
import styles from "../../styles/styles";

const UserScreen = () => {
  const { user } = useContext(AuthContext);
  const { control, handleSubmit, setValue } = useForm();
  useEffect(() => {
    setValue("name", user.payload.name);
    setValue("ruc", user.payload["cognito:username"]);
    setValue("email", user.payload.email);
  }, [setValue]);

  const updateUserData = (data) => {
    console.log(data);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>User Data</Text>
        <View style={styles.customerDetails}>
          <CustomInputText
            name="name"
            label="Name"
            placeholder="Insert a new name"
            control={control}
            rules={{
              required: "Name is required",
            }}
          />
          <CustomInputText
            disabled
            name="ruc"
            label="RUC"
            control={control}
            rules={{
              required: "RUC is required",
            }}
          />
          <CustomInputText
            disabled
            name="email"
            label="Email"
            placeholder="Insert a new email"
            control={control}
            rules={{
              required: "Email is required",
            }}
          />
          <CustomInputText
            name="newPassword"
            label="New Password"
            placeholder="Insert a new password"
            control={control}
          />
        </View>
        <CustomButton text={"Save"} onPress={handleSubmit(updateUserData)} />
      </View>
    </ScrollView>
  );
};

export default UserScreen;
