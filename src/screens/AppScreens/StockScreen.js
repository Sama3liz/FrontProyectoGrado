import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useError } from "../../context/ErrorContext";
import CustomInputText from "../../components/Inputs/CustomInputText";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Buttons/CustomButton";
import { loadData } from "../../utils/billing";
import { Ionicons } from "@expo/vector-icons";
import CustomInputNumber from "../../components/Inputs/CustomInputNumber";
import SearchCart from "../../components/Card/CustomSearchCart";
import { updateData } from "../../utils/database";
import useNavigate from "../../utils/navigation";

const StockScreen = ({ route }) => {
  const { type } = route.params;
  const { errorMessage, setErrorMessage, clearError } = useError();
  const { control, handleSubmit, watch, setValue } = useForm();
  const { goBack } = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const device = Platform.OS;

  useEffect(() => {
    loadData(setProducts);
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleStock = (product) => {
    const productId = product.id;
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
      const existingProduct = selectedProducts.find(
        (product) => product.id === productId
      );
      if (existingProduct) {
        const updatedProducts = selectedProducts.map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        setSelectedProducts(updatedProducts);
      } else {
        const newProduct = { ...productToAdd, quantity: 1 };
        setSelectedProducts((prev) => [...prev, newProduct]);
      }
    }
  };

  const onSubmitPressed = async (data) => {
    const id = selectedProducts[0].id;
    const newStock =
      type === "add"
        ? Number(data.quantity) + Number(selectedProducts[0].stock)
        : Number(selectedProducts[0].stock) >= Number(data.quantity)
        ? Number(selectedProducts[0].stock) - Number(data.quantity)
        : setErrorMessage("Cantidad invalida");
    try {
      const updatedProduct = await updateData(
        "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/inventory/stock", 
        id,
        { quantity: newStock } 
      );
      console.log("Producto actualizado:", updatedProduct);
      route.params.updateProducts();
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
      nestedScrollEnabled={true}
      style={styles.root}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { alignSelf: "center" }]}>
          {type === "add" ? "Add to inventory" : "Get from inventory"}
        </Text>
        {selectedProducts.length === 0 ? (
          <View style={styles.customerDetails}>
            {errorMessage !== "Cantidad invalida" ? (
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
        ) : null}
        <View style={styles.containerCol}>
          {selectedProducts.length !== 0 ? (
            <View style={[styles.customerDetails, { height: 300 }]}>
              <View style={[styles.itemContainer, { marginRight: 1 }]}>
                <View style={styles.itemDetails}>
                  <View
                    style={[styles.containerRow, { alignSelf: "baseline" }]}
                  >
                    <Text style={styles.itemName}>Name: </Text>
                    <Text style={styles.itemDescription}>
                      {selectedProducts[0].name}
                    </Text>
                  </View>
                  <View
                    style={[styles.containerRow, { alignSelf: "baseline" }]}
                  >
                    <Text style={styles.itemName}>Code: </Text>
                    <Text style={styles.itemDescription}>
                      {selectedProducts[0].code}
                    </Text>
                  </View>
                  <View
                    style={[styles.containerRow, { alignSelf: "baseline" }]}
                  >
                    <Text style={styles.itemName}>Stock: </Text>
                    <Text style={styles.itemDescription}>
                      {selectedProducts[0].stock}
                    </Text>
                  </View>
                  <View style={styles.customerDetails}>
                    <CustomInputNumber
                      placeholder="Insert a quantity"
                      name="quantity"
                      label={
                        type === "add"
                          ? "Quantity to add"
                          : "Quantity to retrieve"
                      }
                      control={control}
                      type={"number"}
                      showDecimals={false}
                      rules={{
                        required: "Stock is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Only numbers allowed",
                        },
                      }}
                      handleInputChange={() => clearError()}
                    />
                    {errorMessage === "Cantidad invalida" ? (
                      <Text style={styles.error}>{errorMessage}</Text>
                    ) : null}
                    <CustomButton
                      text={"Save"}
                      onPress={handleSubmit(onSubmitPressed)}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : filteredProducts.length !== 0 ? (
            <View style={[styles.customerDetails, { height: 300 }]}>
              <FlatList
                data={filteredProducts}
                renderItem={({ item }) => (
                  <SearchCart
                    item={item}
                    device={device}
                    products={products}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          ) : (
            <View style={styles.customerDetails}>
              <Text>Search a product</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default StockScreen;
