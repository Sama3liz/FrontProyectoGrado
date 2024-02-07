import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../styles/styles";

const ResumeCart = ({ item }) => {
  return (
    <View style={styles.void}>
      <View
        style={[
          styles.containerRow,
          styles.itemContainer,
          { borderWidth: 1, borderColor: "#ccc" },
        ]}
      >
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>${item.price.toFixed(2)}</Text>
        </View>
        <View
          style={[
            styles.void,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <TextInput
            editable={false}
            style={styles.quantityInput}
            value={item.quantity.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default ResumeCart;
