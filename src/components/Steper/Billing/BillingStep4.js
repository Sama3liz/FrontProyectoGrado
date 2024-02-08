import React from "react";
import { View, Text } from "react-native";
import styles from "../../../styles/styles";
import ResumeCart from "../../Card/CustomResumeCart";
import CustomButton from "../../Buttons/CustomButton";
import { getCurrentDate, handleSubmitClean, sendBillingData } from "../../../utils/billing";

const BillingStep4 = ({
  id,
  firstName,
  lastName,
  email,
  phone,
  address,
  selectedProducts,
  setSelectedProducts,
  setFilteredProducts,
  paymentMethod,
  setPaymentMethod,
  change,
  setChange,
  totals,
  onBackPressed,
  setStep,
  clearError,
  handleSubmit,
  setValue,
}) => {
  const onSubmitPressed = async (data) => {
    const date = getCurrentDate();
    const newBilling = {
      date,
      clientData: data,
      valuesTotals: { ...totals, paymentMethod, change },
      products: selectedProducts,
    };
    console.log(newBilling);
    try {
      await sendBillingData(newBilling);
      console.log("Datos de facturación enviados con éxito");

      handleSubmitClean(
        setValue,
        setSelectedProducts,
        setFilteredProducts,
        setChange,
        setPaymentMethod,
        clearError
      );
      setStep(1);
    } catch (error) {
      console.error("Error al enviar los datos de facturación:", error);
    }
  };
  return (
    <>
      <View
        style={[
          styles.containerCol,
          {
            rowGap: 20,
          },
        ]}
      >
        <Text style={[styles.title, { alignSelf: "center" }]}>Resume</Text>
        <View style={styles.customerDetails}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>CI/RUC:</Text>
            <Text> {id}</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Name: </Text>
            <Text> {firstName + " " + lastName}</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Email:</Text>
            <Text> {email}</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Phone:</Text>
            <Text> {phone}</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Address:</Text>
            <Text> {address}</Text>
          </Text>
        </View>
        <View style={styles.customerDetails}>
          {selectedProducts.map((product) => (
            <ResumeCart key={product.id} item={product} />
          ))}
        </View>
        <View style={styles.billSummary}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Method: </Text>
            <Text>{paymentMethod}</Text>
          </Text>
          {paymentMethod === "Cash" ? (
            <>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Change: </Text>
                <Text>${change}</Text>
              </Text>
            </>
          ) : null}
          <Text>
            <Text style={{ fontWeight: "bold" }}>Subtotal: </Text>
            <Text>${totals.subtotal.toFixed(2)}</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Tariff 0: </Text>
            <Text>${totals.tariff0.toFixed(2)}</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Tariff 12: </Text>
            <Text>${totals.tariff12.toFixed(2)}</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>IVA: </Text>
            <Text>${totals.iva12.toFixed(2)}</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Total: </Text>
            <Text>${totals.total.toFixed(2)}</Text>
          </Text>
        </View>
        <View
          style={[
            styles.containerRow,
            {
              width: "50%",
            },
          ]}
        >
          <CustomButton text={"Back"} onPress={onBackPressed} />
          <CustomButton text={"Send"} onPress={handleSubmit(onSubmitPressed)} />
        </View>
      </View>
    </>
  );
};

export default BillingStep4;
