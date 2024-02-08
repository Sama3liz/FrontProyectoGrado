import React, { useState } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { useError } from "../../context/ErrorContext";
import BillingStep1 from "./Billing/BillingStep1";
import BillingStep2 from "./Billing/BillingStep2";
import BillingStep3 from "./Billing/BillingStep3";
import BillingStep4 from "./Billing/BillingStep4";

const BillingStepper = () => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const { errorMessage, setErrorMessage, clearError } = useError();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [totals, setTotals] = useState({
    subtotal: 0,
    tariff0: 0,
    tariff12: 0,
    iva12: 0,
    total: 0,
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashInput, setCashInput] = useState("");
  const [change, setChange] = useState(0);

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    clearError();
    setStep(step - 1);
  };

  const handleBillingStepChange = (data) => {
    clearError();
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleBillingStepSubmit = (data) => {
    if (step === 1) {
      clearError();
      setCustomerId(data.customerId);
      setStep(step + 1);
    } else if (step === 2) {
      if (selectedProducts.length === 0) {
        setErrorMessage("Please add at least one product to the invoice");
      } else {
        clearError();
        setStep(step + 1);
      }
    } else if (step === 3) {
      if (paymentMethod !== "") {
        if (paymentMethod === "Cash" && cashInput !== "") {
          if (parseFloat(cashInput) >= totals.total.toFixed(2)) {
            clearError();
            setStep(step + 1);
          } else {
            setErrorMessage("Put an amount higher than total");
          }
        } else {
          setErrorMessage("Put a cash value");
        }
        paymentMethod !== "Cash" && setStep(step + 1);
      } else {
        setErrorMessage("Choose a payment method");
      }
    }
  };

  return (
    <View>
      {step === 1 && (
        <BillingStep1
          errorMessage={errorMessage}
          control={control}
          clearError={clearError}
          setErrorMessage={setErrorMessage}
          setCustomerId={setCustomerId}
          onNextPressed={handleBillingStepChange}
          handleSubmit={handleSubmit}
          setValue={setValue}
          customerId={customerId}
        />
      )}
      {step === 2 && (
        <BillingStep2
          errorMessage={errorMessage}
          control={control}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          products={products}
          setProducts={setProducts}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onBackPressed={handlePreviousStep}
          onNextPressed={handleBillingStepSubmit}
          handleSubmit={handleSubmit}
        />
      )}
      {step === 3 && (
        <BillingStep3
          errorMessage={errorMessage}
          control={control}
          totals={totals}
          setTotals={setTotals}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setCashInput={setCashInput}
          selectedProducts={selectedProducts}
          change={change}
          setChange={setChange}
          onBackPressed={handlePreviousStep}
          onNextPressed={handleBillingStepSubmit}
          clearError={clearError}
          watch={watch}
          handleSubmit={handleSubmit}
        />
      )}
      {step === 4 && (
        <BillingStep4
          id={customerId}
          firstName={formData.name}
          lastName={formData.lastname}
          email={formData.email}
          phone={formData.phone}
          address={formData.address}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          setFilteredProducts={setFilteredProducts}
          setChange={setChange}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
          change={change}
          totals={totals}
          onBackPressed={handlePreviousStep}
          setStep={setStep}
          clearError={clearError}
          handleSubmit={handleSubmit}
          setValue={setValue}
        />
      )}
    </View>
  );
};

export default BillingStepper;
