// CustomerDataStep.js
import React from "react";
import { View, Text } from "react-native";
import styles from "../../../styles/styles";
import CustomInputText from "../../Inputs/CustomInputText";
import CustomButton from "../../Buttons/CustomButton";
import { searchCustomerById, setCustomerValues } from "../../../utils/customer";
import { EMAIL_REGEX, RUC_REGEX } from "../../../utils/constants";

const BillingStep1 = ({
  errorMessage,
  control,
  clearError,
  setErrorMessage,
  setCustomerId,
  customerId,
  onNextPressed,
  handleSubmit,
  setValue,
}) => {
  const handleSearchCustomer = async () => {
    try {
      const data = await searchCustomerById(
        customerId,
        setErrorMessage,
        setValue
      );
      if (data !== null) {
        setCustomerValues(data, setValue);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Error handling customer search. Please try again.");
    }
  };

  return (
    <>
      <Text style={[styles.title, { alignSelf: "center" }]}>Customer Data</Text>
      <View style={styles.customerDetails}>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <CustomInputText
          name="ci"
          placeholder="Insert a CI or RUC"
          label="CI/RUC"
          control={control}
          handleInputChange={(text) => {
            clearError();
            setCustomerId(text);
          }}
          rules={{
            required: "CI/RUC is required",
            pattern: {
              value: RUC_REGEX,
              message: "RUC should contain only numbers",
            },
            minLength: {
              value: 10,
              message: "CI/RUC should be at least 10 digits long",
            },
            maxLength: {
              value: 13,
              message: "CI/RUC should be maximum 13 digits long",
            },
          }}
        />
        <View>
          <CustomButton text={"Search"} onPress={handleSearchCustomer} />
        </View>
        <CustomInputText
          name="name"
          label="Name"
          placeholder="Insert a name"
          control={control}
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Name should be max 24 characters long",
            },
          }}
          handleInputChange={(text) => {
            clearError();
          }}
        />
        <CustomInputText
          name="lastname"
          label="Last Name"
          placeholder="Insert a family name"
          control={control}
          rules={{
            required: "Last name is required",
            minLength: {
              value: 3,
              message: "Last name should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Last name should be max 24 characters long",
            },
          }}
        />
        <CustomInputText
          name="email"
          label="Email"
          placeholder="Insert an email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
        />
        <CustomInputText
          name="phone"
          label="Phone"
          placeholder="Insert a phone"
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
          name="address"
          label="Address"
          placeholder="Insert an address"
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
      <View style={styles.buttonContainer}>
        <CustomButton text={"Next"} onPress={handleSubmit(onNextPressed)} />
      </View>
    </>
  );
};

export default BillingStep1;
