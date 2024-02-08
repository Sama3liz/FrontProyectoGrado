import React, { useEffect } from "react";
import { View, Text, FlatList, Platform } from "react-native";
import styles from "../../../styles/styles";
import CustomInputText from "../../Inputs/CustomInputText";
import CustomButton from "../../Buttons/CustomButton";
import SearchCart from "../../Card/CustomSearchCart";
import SelectedCart from "../../Card/CustomSelectedCart";
import { loadData } from "../../../utils/billing";

const BillingStep2 = ({
  errorMessage,
  control,
  searchQuery,
  setSearchQuery,
  filteredProducts,
  setFilteredProducts,
  products,
  setProducts,
  selectedProducts,
  setSelectedProducts,
  onBackPressed,
  onNextPressed,
  handleSubmit
}) => {
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
  return (
    <>
      <View style={[styles.containerCol, { flex: 1, flexDirection: "column" }]}>
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
        <View style={[styles.containerRow, { width: "50%" }]}>
          {filteredProducts.length !== 0 ? (
            <View style={[styles.searchProduct, { height: 400 }]}>
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
            <View style={styles.searchProduct}>
              <Text>Search a product</Text>
            </View>
          )}
          {selectedProducts.length !== 0 ? (
            <View style={[styles.searchProduct, { height: 400 }]}>
              <FlatList
                data={selectedProducts}
                renderItem={({ item }) => (
                  <SelectedCart
                    item={item}
                    device={device}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          ) : (
            <View style={styles.searchProduct}>
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
          <CustomButton text={"Next"} onPress={handleSubmit(onNextPressed)} />
        </View>
      </View>
    </>
  );
};

export default BillingStep2;
