import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { handleRemoveFromInvoice } from "../../utils/billing";

const SelectedCart = ({
  item,
  device,
  selectedProducts,
  setSelectedProducts,
}) => (
  <View style={styles.void}>
    <View
      style={[
        device === "web" ? styles.containerRow : styles.containerCol,
        styles.itemContainer,
        { marginRight: 1 },
      ]}
    >
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>Quantity: {item.quantity}</Text>
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
            handleRemoveFromInvoice(
              item.id,
              selectedProducts,
              setSelectedProducts
            )
          }
        >
          <Ionicons name="trash-bin-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default SelectedCart;
