import React, { useContext, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import { AuthContext } from "../../context/AuthContext";
import CustomInputText from "../../components/Inputs/CustomInputText";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Buttons/CustomButton";

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
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>User Data</Text>
        <CustomInputText
          name="name"
          control={control}
          rules={{
            required: "Name is required",
          }}
        />
        <CustomInputText
          disabled
          name="ruc"
          control={control}
          rules={{
            required: "RUC is required",
          }}
        />
        <CustomInputText
          name="email"
          control={control}
          rules={{
            required: "Email is required",
          }}
        />
        <CustomInputText
          name="newPassword"
          placeholder={"New Password"}
          control={control}
          rules={{}}
        />
        <CustomButton text={"Save"} onPress={handleSubmit(updateUserData)} />
      </View>
    </ScrollView>
  );
};

export default UserScreen;
