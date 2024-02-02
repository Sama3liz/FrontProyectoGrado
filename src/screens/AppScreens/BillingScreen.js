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
  calculateTotals,
  handleAddToInvoice,
  handleProductSelection,
  handleQuantityChange,
  calculateChange,
  getCurrentDate,
} from "../../utils/useBilling";
import styles from "../../styles/styles";
import { useForm } from "react-hook-form";
import { useError } from "../../context/ErrorContext";
import { ScrollView } from "react-native-gesture-handler";
import CartItem from "../../components/Card/CustomItemCard";
import { Ionicons } from "@expo/vector-icons";
import { searchCustomerById } from "../../utils/dbFunctions";
import CustomInputText from "../../components/Inputs/CustomInputText";
import { EMAIL_REGEX, RUC_REGEX } from "../../utils/constants";
import CustomInputNumber from "../../components/Inputs/CustomInputNumber";
import ResumeCart from "../../components/Card/CustomResumeCart";

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
  const cash = watch("cash");

  useEffect(() => {
    loadData(setProducts);
    calculateTotals(selectedProducts, setTotals);
    cashChange(cash);
  }, [selectedProducts]);

  const setSearchCustomer = (customerData) => {
    if (customerData !== null) {
      clearError();
      setValue("name", customerData.firstname);
      setValue("lastname", customerData.lastname);
      setValue("email", customerData.email);
      setValue("address", customerData.address);
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
        const data = await searchCustomerById(customerId);
        setSearchCustomer(data);
      } else {
        setErrorMessage("Give a valid CI/RUC for search");
      }
    } catch (error) {
      setErrorMessage(error);
      setCustomerData(null);
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const addToInvoice = (product) => {
    const productId = product.id;
    handleAddToInvoice(
      productId,
      products,
      selectedProducts,
      setSelectedProducts
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
    <View style={[styles.itemContainer, { marginRight: 1 }]}>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromInvoice(item.id)}
      >
        <Ionicons name="trash-bin-outline" size={24} color="red" />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  const renderProductList = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        {/* <Text style={styles.itemDescription}>Stock: {item.stock}</Text> */}
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
          <CustomInputNumber
            name="cash"
            placeholder="Insert cash value"
            label="Cash"
            control={control}
            handleInputChange={(text) => {
              clearError();
              setCashInput(text);
              cashChange(text, totals);
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

  const onNextPressed = (data) => {
    if (step === 1) {
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
          if (parseFloat(cashInput) >= totals.total.toFixed(2)) {
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
    clearError();
    setStep(step - 1);
  };

  const onSubmitPressed = (data) => {
    const date = getCurrentDate();
    const newBilling = {
      date,
      user: {}, // Deberia ir el RUC
      clientData: data,
      valuesTotals: { ...totals, paymentMethod, change },
      products: selectedProducts,
    };
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
            <Text style={[styles.title, { alignSelf: "center" }]}>
              Customer Data
            </Text>
            <View style={styles.customerDetails}>
              {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
              ) : null}
              <CustomInputText
                name="ci"
                placeholder="Insert a CI or RUC"
                label="CI/RUC"
                control={control}
                handleInputChange={handleIDChange}
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
                <CustomButton text={"Search"} onPress={searchCustomer} />
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
                handleInputChange={handleInputChange}
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
              <Text style={[styles.title, { alignSelf: "center" }]}>
                Select Products
              </Text>
              <View style={styles.customerDetails}>
                {errorMessage ? (
                  <Text style={styles.error}>{errorMessage}</Text>
                ) : null}
                <CustomInputText
                  name="search"
                  placeholder="Insert a name or code or just leave empty for list all"
                  label="Search"
                  control={control}
                  handleInputChange={(text) => setSearchQuery(text)}
                />
                <CustomButton text={"Search"} onPress={handleSearch} />
              </View>
              <View style={styles.containerRow}>
                {filteredProducts.length !== 0 ? (
                  <View style={[styles.searchProduct, { height: 400 }]}>
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
                  <View style={[styles.searchProduct, { height: 400 }]}>
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
              <View
                style={[
                  styles.containerRow,
                  {
                    width: "50%",
                  },
                ]}
              >
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
              <View style={styles.customerDetails}>
                {renderPaymentFields()}
              </View>
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
            <View
              style={[
                styles.containerCol,
                {
                  rowGap: 20,
                },
              ]}
            >
              <Text style={[styles.title, { alignSelf: "center" }]}>
                Resume
              </Text>
              <View style={styles.customerDetails}>
                <Text>CI/RUC: {id}</Text>
                <Text>Name: {firstName + " " + lastName} </Text>
                <Text>Email: {email}</Text>
                <Text>Phone: {phone}</Text>
                <Text>Address: {email}</Text>
              </View>
              <View style={styles.customerDetails}>
                {selectedProducts.map((product) => (
                  <ResumeCart key={product.id} item={product} />
                ))}
              </View>
              <View style={styles.billSummary}>
                {paymentMethod === "Cash" ? (
                  <>
                    <Text>Method: {paymentMethod}</Text>
                    <Text>Change: ${change}</Text>
                  </>
                ) : (
                  <Text>Method: {paymentMethod}</Text>
                )}
                <Text>Subtotal: ${totals.subtotal.toFixed(2)}</Text>
                <Text>Tarifa 0: ${totals.tariff0.toFixed(2)}</Text>
                <Text>Tarifa 12: ${totals.tariff12.toFixed(2)}</Text>
                <Text>12% IVA: ${totals.iva12.toFixed(2)}</Text>
                <Text>Total: ${totals.total.toFixed(2)}</Text>
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
                <CustomButton
                  text={"Send"}
                  onPress={handleSubmit(onSubmitPressed)}
                />
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
      <View
        style={[
          styles.container,
          { flex: 1, justifyContent: "center", alignContent: "flex-end" },
        ]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {renderStepContent()}
        </View>
      </View>
    </ScrollView>
  );
};

export default BillingScreen;
