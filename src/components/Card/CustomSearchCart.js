import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { handleAddToInvoice } from "../../utils/billing";
import styles from "../../styles/styles";

const SearchCart = ({ item, device, products, selectedProducts, setSelectedProducts }) => (
  <View style={styles.void}>
    <View
      style={[
        device === "web" ? styles.containerRow : styles.containerCol,
        styles.itemContainer,
      ]}
    >
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>Stock: {item.stock}</Text>
        <Text style={styles.itemDescription}>Price: ${item.price}</Text>
      </View>
      <View
        style={[
          styles.void,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() =>
            handleAddToInvoice(
              item.id,
              products,
              selectedProducts,
              setSelectedProducts
            )
          }
        >
          <Ionicons name="ios-add-circle-outline" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default SearchCart;