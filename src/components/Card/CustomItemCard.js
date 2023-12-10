import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styles";

const CartItem = ({
  item,
  onRemoveProduct,
  onQuantityIncrease,
  onQuantityDecrease,
  onQuantityChange,
}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.removeButton} onPress={onRemoveProduct}>
        <Ionicons name="trash-bin-outline" size={24} color="red" />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemDescription}>${item.price.toFixed(2)}</Text>
      </View>
      {item.quantity !== 0 && item.quantity !== 1 ? (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onQuantityDecrease}
        >
          <Ionicons name="ios-remove-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
      ) : null}
      <TextInput
        style={styles.quantityInput}
        value={item.quantity.toString()}
        onChangeText={onQuantityChange}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={onQuantityIncrease}
      >
        <Ionicons name="ios-add-circle-outline" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
