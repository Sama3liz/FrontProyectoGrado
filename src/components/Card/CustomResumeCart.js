import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../styles/styles";

const ResumeCart = ({ item }) => {
  return (
    <View style={styles.void}>
      <View
        style={[styles.containerRow, { borderBottomWidth: 1, borderColor: "#ccc" }]}
      >
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>${item.price.toFixed(2)}</Text>
        </View>
        <TextInput
          editable={false}
          style={styles.quantityInput}
          value={item.quantity.toString()}
        />
      </View>
    </View>
  );
};

export default ResumeCart;
