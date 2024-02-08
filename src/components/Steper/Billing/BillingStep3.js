import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../../../styles/styles";
import CustomButton from "../../Buttons/CustomButton";
import CustomInputNumber from "../../Inputs/CustomInputNumber";
import { calculateChange, calculateTotals } from "../../../utils/billing";

const BillingStep3 = ({
  errorMessage,
  control,
  totals,
  setTotals,
  paymentMethod,
  setPaymentMethod,
  setCashInput,
  selectedProducts,
  change,
  setChange,
  onBackPressed,
  onNextPressed,
  clearError,
  watch,
  handleSubmit
}) => {
  const cash = watch("cash");
  useEffect(() => {
    calculateTotals(selectedProducts, setTotals);
    calculateChange(cash, totals, setChange);
  }, [selectedProducts]);
  const renderPaymentFields = () => {
    if (paymentMethod === "Cash") {
      return (
        <>
          <CustomInputNumber
            name="cash"
            placeholder="Insert cash value"
            label="Cash"
            control={control}
            handleInputChange={(text) => {
              clearError();
              setCashInput(text);
              calculateChange(text, totals, setChange);
            }}
          />
          <Text>Change:</Text>
          <Text style={styles.input}>${change ? change : 0}</Text>
        </>
      );
    } else if (paymentMethod === "Card" || paymentMethod === "Transfer") {
      return (
        <CustomButton
          text={"Go to payment platform"}
          type="SECONDARY"
          onPress={() => redirectToPaymentPlatform()}
        />
      );
    }
    return null;
  };
  return (
    <>
      <Text style={[styles.title, { alignSelf: "center" }]}>
        Choose Payment
      </Text>

      <Text
        style={[
          styles.subtitle,
          { textAlign: "center", marginTop: 10, marginBottom: 0 },
        ]}
      >
        Total: ${totals.total.toFixed(2)}
      </Text>
      {errorMessage ? (
        <Text style={[styles.error, { alignSelf: "center" }]}>
          {errorMessage}
        </Text>
      ) : null}
      <View style={styles.customerDetails}>
        <CustomButton
          text={"Cash"}
          type="SECONDARY"
          onPress={() => setPaymentMethod("Cash")}
        />
        <CustomButton
          text={"Card"}
          type="SECONDARY"
          onPress={() => setPaymentMethod("Card")}
        />
        <CustomButton
          text={"Transfer"}
          type="SECONDARY"
          onPress={() => setPaymentMethod("Transfer")}
        />
      </View>
      {paymentMethod ? (
        <View style={styles.customerDetails}>{renderPaymentFields()}</View>
      ) : null}
      <View
        style={[
          styles.containerRow,
          {
            width: "50%",
          },
        ]}
      >
        <CustomButton text={"Back"} onPress={onBackPressed} />
        <CustomButton text={"Next"} onPress={handleSubmit(onNextPressed)} />
      </View>
    </>
  );
};

export default BillingStep3;
