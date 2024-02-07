import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigate from "../../utils/navigation";
import styles from "../../styles/styles";
import { useForm } from "react-hook-form";
import { useError } from "../../context/ErrorContext";
import CustomInputText from "../../components/Inputs/CustomInputText";
import {
  getCustomerById,
  setCustomerValues,
  updateCustomerData,
} from "../../utils/customer";
import {
  getSupplierById,
  setSupplierValues,
  updateSupplierData,
} from "../../utils/supplier";

const ProfileScreen = ({ route }) => {
  const { goBack } = useNavigate();
  const { errorMessage, setErrorMessage, clearError } = useError();
  const { control, handleSubmit, setValue } = useForm();
  const { person } = route.params;

  useEffect(() => {
    loadData(person);
  }, [person]);

  const loadData = async (person) => {
    try {
      if (person.ruc) {
        const data = await getSupplierById(person.id);
        const body = JSON.parse(data.body);
        setValue("ci", person.ruc);
        setSupplierValues(body[0], setValue);
      }
      if (person.ci) {
        const data = await getCustomerById(person.id);
        const body = JSON.parse(data.body);
        setValue("ci", person.ci);
        setCustomerValues(body[0], setValue);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmitPressed = async (data) => {
    try {
      let updatedProduct;
      if (person.ruc) {
        updatedProduct = await updateSupplierData(person.id, data);
      }
      if (person.ci) {
        updatedProduct = await updateCustomerData(person.id, data);
      }
      console.log("Data updated:", updatedProduct);
      route.params.refresher();
      goBack();
    } catch (error) {
      console.error("Error al actualizar el producto:", error.message);
      setErrorMessage(
        "Error al actualizar el producto. Por favor, inténtalo de nuevo."
      );
    }
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
            <>
              <CustomInputText
                name="ci"
                placeholder="Insert a RUC"
                label="RUC"
                control={control}
                disabled
                rules={{ required: "RUC is required" }}
              />
              <CustomInputText
                placeholder="Insert a commercial name"
                label="Commercial Name"
                name="commercial"
                control={control}
                rules={{ required: "Commercial name is required" }}
              />
            </>
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
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
