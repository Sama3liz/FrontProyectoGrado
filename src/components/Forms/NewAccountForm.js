import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useError } from "../../context/ErrorContext";
import CustomInputText from "../../components/Inputs/CustomInputText";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Buttons/CustomButton";
import { loadData } from "../../utils/useBilling";
import { Ionicons } from "@expo/vector-icons";
import CustomInputNumber from "../../components/Inputs/CustomInputNumber";

const NewAccountForm = ({ route }) => {
  const { errorMessage, setErrorMessage, clearError } = useError();
  const { control, handleSubmit, watch, setValue } = useForm();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newCode, setNewCode] = useState([]);

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
        splitCodeAndSum(product.code);
      }
    }
  };

  const renderProductList = ({ item }) => (
    <View
      style={[
        styles.itemContainer,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>Stock: {item.stock}</Text>
        <Text style={styles.itemDescription}>Code: {item.code}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleStock(item)}
      >
        <Ionicons name="ios-add-circle-outline" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );

  const splitCodeAndSum = (code) => {
    const splitCode = code.split("-");
    const level = 1;
    const summedCode = Number(splitCode[level]) + 1;
    const newCodeComplete = splitCode[0] + "-" + summedCode;
    setValue("code", newCodeComplete);
  };

  const onSavePressed = (data) => {
    console.log(data);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={styles.root}
    >
      <View style={styles.container}>
        {selectedProducts.length === 0 ? (
          <View style={styles.customerDetails}>
            {errorMessage !== "Cantidad invalida" ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            <CustomInputText
              name="search"
              placeholder="Insert a name or code or empty for list all"
              label="Search"
              control={control}
              handleInputChange={(text) => setSearchQuery(text)}
            />
            <CustomButton text={"Search"} onPress={handleSearch} />
          </View>
        ) : null}
        <View style={styles.containerCol}>
          {selectedProducts.length !== 0 ? (
            <View style={[styles.customerDetails, { height: 400 }]}>
              <View style={[styles.itemContainer, { marginRight: 1 }]}>
                <View style={styles.itemDetails}>
                  <Text style={[styles.title, { alignSelf: "center" }]}>
                    Father
                  </Text>
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

                  <View style={styles.customerDetails}>
                    <Text style={[styles.title, { alignSelf: "center" }]}>
                      Child
                    </Text>
                    <CustomInputText
                      placeholder="Insert a code"
                      name="code"
                      label="Code"
                      control={control}
                      rules={{
                        required: "Code is required",
                      }}
                      handleInputChange={() => clearError()}
                    />
                    <CustomInputText
                      placeholder="Insert a name"
                      name="name"
                      label="Name"
                      control={control}
                      disabled
                      rules={{
                        required: "Name is required",
                      }}
                      handleInputChange={() => clearError()}
                    />
                    <CustomButton
                      text={"Save"}
                      onPress={handleSubmit(onSavePressed)}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : filteredProducts.length !== 0 ? (
            <View style={[styles.customerDetails, { height: 300 }]}>
              <FlatList
                data={filteredProducts}
                renderItem={renderProductList}
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

export default NewAccountForm;
