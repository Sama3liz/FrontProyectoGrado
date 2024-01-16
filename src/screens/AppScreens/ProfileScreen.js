import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import styles from "../../styles/styles";
import { useForm } from "react-hook-form";
import { useError } from "../../context/ErrorContext";
import CustomInputText from "../../components/Inputs/CustomInputText";

const ProfileScreen = ({ route }) => {
  const { goBack } = useNavigationHelpers();
  const { errorMessage, setErrorMessage, clearError } = useError();
  const { control, handleSubmit, setValue } = useForm();
  const { person } = route.params;

  useEffect(() => {
    if (person) {
      setValue("name", person.firstname);
      setValue("lastname", person.lastname);
      if (person.commercial) {
        setValue("commercial", person.commercial);
        setValue("ci", person.ruc);
      } else {
        setValue("ci", person.ci);
      }
    }
  }, [person]);

  const handleInputChange = () => {
    clearError();
  };

  const onBackPressed = () => {
    goBack();
  };

  const onSubmitPressed = (data) => {
    console.log(data);
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
        <View style={styles.customerDetails}>
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          {person.ruc ? (
            <CustomInputText
              name="ci"
              placeholder="Insert a RUC"
              label="RUC"
              control={control}
              disabled
              rules={{ required: "RUC is required" }}
            />
          ) : (
            <CustomInputText
              name="ci"
              placeholder="Insert a CI or RUC"
              label="CI/RUC"
              control={control}
              disabled
              rules={{ required: "CI/RUC is required" }}
            />
          )}
          {person.commercial ? (
            <CustomInputText
              placeholder="Insert a commercial name"
              label="Commercial Name"
              name="commercial"
              control={control}
              rules={{ required: "Commercial name is required" }}
            />
          ) : null}
          <CustomInputText
            name="name"
            label="Name"
            placeholder="Insert a name"
            control={control}
            rules={{ required: "Name is required" }}
          />
          <CustomInputText
            name="lastname"
            label="Last Name"
            placeholder="Insert a family name"
            control={control}
            rules={{ required: "Last name is required" }}
          />
          <CustomInputText
            name="email"
            label="Email"
            placeholder="Insert an email"
            control={control}
            rules={{ required: "Email is required" }}
          />
          <CustomInputText
            name="phone"
            label="Phone"
            placeholder="Insert a phone"
            control={control}
            rules={{ required: "Phone is required" }}
          />
          <CustomInputText
            name="address"
            label="Address"
            placeholder="Insert an address"
            control={control}
            rules={{ required: "Address is required" }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton text={"Save"} onPress={handleSubmit(onSubmitPressed)} />
          <CustomButton text={"Back"} onPress={onBackPressed} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
