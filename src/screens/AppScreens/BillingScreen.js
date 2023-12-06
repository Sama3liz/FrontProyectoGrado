import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { ProgressBar } from "react-native-elements";
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
import { signInStyles } from "../../styles/screenStyles/SignInStyles";
import CustomInput from "../../components/Inputs/CustomInput";
import { useForm } from "react-hook-form";

const BillingScreen = () => {
  const { goTo } = useNavigationHelpers();
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

  useEffect(() => {
    loadData(setProducts);
    calculateTotals(selectedProducts, setTotals);
  }, [selectedProducts]);

  const searchCustomer = async () => {
    const isCustomerFound = await searchCustomerById(
      customerId,
      setCustomerData
    );
    if (isCustomerFound) {
      console.log("Customer found");
      setValue("ssn", customerData.ssn);
      setValue("name", customerData.firstName + " " + customerData.lastName);
      setValue("email", customerData.email);
      setValue("address", customerData.address.address);
      setValue("phone", customerData.phone);
    } else {
      console.log("Customer not found");
      setValue("ssn", "");
      setValue("name", "");
      setValue("email", "");
      setValue("address", "");
      setValue("phone", "");
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const addToInvoice = (productId) => {
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

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <View>
        <Text>{item.title}</Text>
        <Text>${item.price.toFixed(2)}</Text>
      </View>
      <View style={signInStyles.root}>
        <CustomButton
          text={"-"}
          type="SECONDARY"
          onPress={() => quantityChange(item.id, item.quantity - 1)}
        />
        <TextInput
          style={styles.quantityInput}
          value={item.quantity.toString()}
          onChangeText={(text) => quantityChange(item.id, text)}
          keyboardType="numeric"
        />
        <CustomButton
          text={"+"}
          type="SECONDARY"
          onPress={() => productSelection(item)}
        />
        <CustomButton
          text={"Remove"}
          type="SECONDARY"
          onPress={() => removeFromInvoice(item.id)}
        />
      </View>
    </View>
  );

  const renderPaymentFields = () => {
    if (paymentMethod === "Efectivo") {
      return (
        <>
          <View style={signInStyles.root}>
            <Text>Total:</Text>
            <Text style={styles.input}>${totals.total.toFixed(2)}</Text>
            <Text>Cash:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Ingrese el monto"
              onChangeText={(text) => {
                cashChange(text, totals);
              }}
            />
            <Text>Change:</Text>
            <Text style={styles.input}>${change ? change : 0}</Text>
          </View>
        </>
      );
    } else if (
      paymentMethod === "Tarjeta" ||
      paymentMethod === "Transferencia"
    ) {
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
      setStep(step + 1);
    }
    if (step === 2) {
      if (selectedProducts.length === 0) {
        console.log("Please add at least one product to the invoice");
      } else {
        setStep(step + 1);
      }
    }
    if (step === 3) {
      console.log(change);
      setStep(step + 1);
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
      products: selectedProducts,
    };
    console.log(newBilling);
    setValue("ci", "");
    setValue("ssn", "");
    setValue("name", "");
    setValue("email", "");
    setValue("address", "");
    setValue("phone", "");
    setSelectedProducts([]);
    setChange("");
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.title}>Customer Data</Text>
            <View style={styles.customerDetails}>
              <CustomInput
                name="ci"
                placeholder="CI/RUC"
                control={control}
                handleInputChange={setCustomerId}
                rules={{ required: "CI/RUC is required" }}
              />
              <CustomButton text={"Search"} onPress={searchCustomer} />
              <CustomInput name="ssn" placeholder="SSN" control={control} />
              <CustomInput
                name="name"
                placeholder="Name"
                control={control}
                rules={{ required: "Name is required" }}
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
            <CustomButton text={"Next"} onPress={handleSubmit(onNextPressed)} />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>Products</Text>
            <View style={signInStyles.root}>
              <TextInput
                style={styles.input}
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                placeholder="Search by name or code"
              />
              <CustomButton text={"Search"} onPress={handleSearch} />
            </View>
            <FlatList
              data={filteredProducts}
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <Text>{item.title}</Text>
                  <Text>${item.price.toFixed(2)}</Text>
                  <CustomButton
                    text={"+"}
                    onPress={() => addToInvoice(item.id)}
                  />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.cartContainer}>
              <FlatList
                data={selectedProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
            <View style={styles.billSummary}>
              <Text>Total: ${totals.total.toFixed(2)}</Text>
            </View>
            <CustomButton text={"Next"} onPress={handleSubmit(onNextPressed)} />
            <CustomButton text={"Back"} onPress={onBackPressed} />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>Choose Payment</Text>
            <View style={styles.customerDetails}>
              <CustomButton
                text={"Cash"}
                onPress={() => setPaymentMethod("Efectivo")}
              />
              <CustomButton
                text={"Card"}
                onPress={() => setPaymentMethod("Tarjeta")}
              />
              <CustomButton
                text={"Transfer"}
                onPress={() => setPaymentMethod("Transferencia")}
              />
              {renderPaymentFields()}
            </View>
            <CustomButton text={"Next"} onPress={handleSubmit(onNextPressed)} />
            <CustomButton text={"Back"} onPress={onBackPressed} />
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.title}>Resume</Text>
            <View style={styles.cartContainer}>
              <FlatList
                data={selectedProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
            <View style={styles.billSummary}>
              <Text>Subtotal: ${totals.subtotal.toFixed(2)}</Text>
              <Text>Tarifa 0: ${totals.tariff0.toFixed(2)}</Text>
              <Text>Tarifa 12: ${totals.tariff12.toFixed(2)}</Text>
              <Text>12% IVA: ${totals.iva12.toFixed(2)}</Text>
              <Text>Total: ${totals.total.toFixed(2)}</Text>
              {change !== "" ? <Text>Change: ${change}</Text> : ""}
              {/* Botón para procesar el pago */}
              <CustomButton
                text={"Send"}
                onPress={handleSubmit(onSubmitPressed)}
              />
            </View>
            <CustomButton text={"Back"} onPress={onBackPressed} />
          </>
        );
      default:
        return null;
    }
  };

  const goToPayment = () => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>{renderStepContent()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // O el tipo de espaciado que desees
    marginTop: 20, // Esto es opcional, según la separación que desees
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  customerDetails: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "right",
  },
  quantityInput: {
    padding: 8,
    marginVertical: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 14, // Tamaño de la fuente para el input
    width: 40, // Ancho máximo para tres dígitos
    textAlign: "center", // Alineación del texto al centro
  },
  billSummary: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    alignItems: "center",
  },
  progressBar: {
    height: 5,
    backgroundColor: "lightgray",
  },
  progressBarContainer: {
    width: "100%",
    height: 5,
  },
  progressBarIndicator: {
    backgroundColor: "blue",
  },
});

export default BillingScreen;
