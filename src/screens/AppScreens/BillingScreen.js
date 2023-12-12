import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import {
  loadData,
  searchCustomerById,
  calculateTotals,
  handleAddToInvoice,
  handleProductSelection,
  handleQuantityChange,
  calculateChange,
} from "../../utils/useBilling";
import styles from "../../styles/styles";
import CustomInput from "../../components/Inputs/CustomInput";
import { useForm } from "react-hook-form";
import { useError } from "../../context/ErrorContext";
import { ScrollView } from "react-native-gesture-handler";
import CartItem from "../../components/Card/CustomItemCard";
import { Ionicons } from "@expo/vector-icons";

const BillingScreen = () => {
  const { goTo } = useNavigationHelpers();
  const { errorMessage, setErrorMessage, clearError } = useError();
  const { control, handleSubmit, watch, setValue } = useForm();
  const [step, setStep] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customerData, setCustomerData] = useState(null);
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
  const firstName = watch("name");
  const lastName = watch("lastname");
  const id = watch("ci");
  const address = watch("address");
  const phone = watch("phone");
  const email = watch("email");

  useEffect(() => {
    loadData(setProducts);
    calculateTotals(selectedProducts, setTotals);
  }, [selectedProducts]);

  const setSearchCustomer = (customerData) => {
    if (customerData !== null) {
      clearError();
      setValue("name", customerData.firstName);
      setValue("lastname", customerData.lastName);
      setValue("email", customerData.email);
      setValue("address", customerData.address.address);
      setValue("phone", customerData.phone);
    } else {
      setErrorMessage("Client not found");
      setValue("name", "");
      setValue("lastname", "");
      setValue("email", "");
      setValue("address", "");
      setValue("phone", "");
    }
  };

  const searchCustomer = async () => {
    try {
      if (customerId) {
        const data = await searchCustomerById(customerId, setCustomerData);
        setSearchCustomer(data);
      } else {
        setErrorMessage("CI/RUC must be");
      }
    } catch (error) {
      console.log(error);
      setCustomerData(null);
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const addToInvoice = (product) => {
    const productId = product.id;
    handleAddToInvoice(
      productId,
      products,
      product,
      selectedProducts,
      setSelectedProducts,
      setProducts
    );
  };

  const quantityChange = (productId, quantity) => {
    handleQuantityChange(
      productId,
      quantity,
      selectedProducts,
      setSelectedProducts
    );
  };

  const productSelection = (product) => {
    handleProductSelection(
      product,
      selectedProducts,
      setSelectedProducts,
      products,
      setProducts
    );
  };

  const removeFromInvoice = (productId) => {
    const updatedProducts = selectedProducts.filter(
      (product) => product.id !== productId
    );
    setSelectedProducts(updatedProducts);
  };

  const cashChange = (text) => {
    calculateChange(text, totals, setChange);
  };

  const handleInputChange = () => {
    clearError();
  };

  const handleIDChange = (text) => {
    clearError();
    setCustomerId(text);
  };

  const renderProductSelected = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromInvoice(item.id)}
      >
        <Ionicons name="trash-bin-outline" size={24} color="red" />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemDescription}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  const renderProductList = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => addToInvoice(item)}
      >
        <Ionicons name="ios-add-circle-outline" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );

  const renderPaymentFields = () => {
    if (paymentMethod === "Cash") {
      return (
        <>
          <View style={styles.root}>
            <Text>Total:</Text>
            <Text style={styles.input}>${totals.total.toFixed(2)}</Text>
            <Text>Cash:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Ingrese el monto"
              onChangeText={(text) => {
                clearError();
                setCashInput(text);
                cashChange(text, totals);
              }}
            />
            <Text>Change:</Text>
            <Text style={styles.input}>${change ? change : 0}</Text>
          </View>
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

  const onNextPressed = (data) => {
    if (step === 1) {
      console.log(data);
      clearError();
      setStep(step + 1);
    }
    if (step === 2) {
      if (selectedProducts.length === 0) {
        setErrorMessage("Please add at least one product to the invoice");
      } else {
        clearError();
        setStep(step + 1);
      }
    }
    if (step === 3) {
      if (paymentMethod !== "") {
        if (paymentMethod === "Cash" && cashInput !== "") {
          if (parseFloat(cashInput) > totals.total.toFixed(2)) {
            clearError();
            setStep(step + 1);
          } else {
            setErrorMessage("Put an amount higher than total");
          }
        } else {
          setErrorMessage("Put a cash value");
        }
        paymentMethod !== "Cash" ? setStep(step + 1) : null;
      } else {
        setErrorMessage("Choose a payment method");
      }
    }
  };

  const onBackPressed = () => {
    setStep(step - 1);
  };

  const onSubmitPressed = (data) => {
    console.log(data);
    const newBilling = {
      ...data,
      totals,
      paymentMethod,
      change,
      products: selectedProducts,
    };
    console.log(newBilling);
    setValue("ci", "");
    setValue("name", "");
    setValue("email", "");
    setValue("address", "");
    setValue("phone", "");
    setSelectedProducts([]);
    setFilteredProducts([]);
    setChange("");
    clearError();
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.title}>Customer Data</Text>
            <View style={styles.customerDetails}>
              {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
              ) : null}
              <CustomInput
                name="ci"
                placeholder="CI/RUC"
                control={control}
                handleInputChange={handleIDChange}
                rules={{ required: "CI/RUC is required" }}
              />
              <View>
                <CustomButton text={"Search"} onPress={searchCustomer} />
              </View>
              <CustomInput
                name="name"
                placeholder="Name"
                control={control}
                rules={{ required: "Name is required" }}
                handleInputChange={handleInputChange}
              />
              <CustomInput
                name="lastname"
                placeholder="Last name"
                control={control}
                rules={{ required: "Last name is required" }}
              />
              <CustomInput
                name="email"
                placeholder="Email"
                control={control}
                rules={{ required: "Email is required" }}
              />
              <CustomInput
                name="phone"
                placeholder="Phone"
                control={control}
                rules={{ required: "Phone is required" }}
              />
              <CustomInput
                name="address"
                placeholder="Address"
                control={control}
                rules={{ required: "Address is required" }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                text={"Next"}
                onPress={handleSubmit(onNextPressed)}
              />
            </View>
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.containerCol}>
              <Text style={styles.title}>Products</Text>
              <View style={styles.customerDetails}>
                {errorMessage ? (
                  <Text style={styles.error}>{errorMessage}</Text>
                ) : null}
                <TextInput
                  style={styles.input}
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                  placeholder="Search by name or code"
                />
                <CustomButton text={"Search"} onPress={handleSearch} />
              </View>
              <View style={styles.containerRow}>
                {filteredProducts.length !== 0 ? (
                  <View style={[styles.searchProduct, { height: 300 }]}>
                    <FlatList
                      data={filteredProducts}
                      renderItem={renderProductList}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </View>
                ) : (
                  <View style={styles.searchProduct}>
                    <Text>Search a product</Text>
                  </View>
                )}
                {selectedProducts.length !== 0 ? (
                  <View style={[styles.selectedProducts, { height: 300 }]}>
                    <FlatList
                      data={selectedProducts}
                      renderItem={renderProductSelected}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </View>
                ) : (
                  <View style={styles.selectedProducts}>
                    <Text>No products selected</Text>
                  </View>
                )}
              </View>
              <View style={styles.buttonRowContainer}>
                <CustomButton text={"Back"} onPress={onBackPressed} />
                <CustomButton
                  text={"Next"}
                  onPress={handleSubmit(onNextPressed)}
                />
              </View>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>Choose Payment</Text>
            {errorMessage ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            <View style={styles.customerDetails}>
              <View style={styles.containerRow}>
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
            </View>
            <View style={styles.customerDetails}>{renderPaymentFields()}</View>
            <View style={styles.buttonRowContainer}>
              <CustomButton text={"Back"} onPress={onBackPressed} />
              <CustomButton
                text={"Next"}
                onPress={handleSubmit(onNextPressed)}
              />
            </View>
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.title}>Resume</Text>
            <View style={styles.billSummary}>
              <Text>CI/RUC: {id}</Text>
              <Text>Name: {firstName + " " + lastName} </Text>
              <Text>Email: {email}</Text>
              <Text>Phone: {phone}</Text>
              <Text>Address: {email}</Text>
            </View>
            {selectedProducts.map((product) => (
              <CartItem
                key={product.id}
                item={product}
                onRemoveProduct={() => removeFromInvoice(product.id)}
                onQuantityIncrease={() => productSelection(product)}
                onQuantityDecrease={() =>
                  quantityChange(product.id, product.quantity - 1)
                }
                onQuantityChange={(text) => quantityChange(product.id, text)}
              />
            ))}
            <View style={styles.billSummary}>
              {paymentMethod === "Cash" ? (
                <View>
                  <Text>Method: {paymentMethod}</Text>
                  <Text>Change: ${change}</Text>
                </View>
              ) : (
                <Text>Method: {paymentMethod}</Text>
              )}
              <Text>Subtotal: ${totals.subtotal.toFixed(2)}</Text>
              <Text>Tarifa 0: ${totals.tariff0.toFixed(2)}</Text>
              <Text>Tarifa 12: ${totals.tariff12.toFixed(2)}</Text>
              <Text>12% IVA: ${totals.iva12.toFixed(2)}</Text>
              <Text>Total: ${totals.total.toFixed(2)}</Text>
              <CustomButton
                text={"Send"}
                onPress={handleSubmit(onSubmitPressed)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton text={"Back"} onPress={onBackPressed} />
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerCol}>{renderStepContent()}</View>
      </View>
    </ScrollView>
  );
};

export default BillingScreen;
