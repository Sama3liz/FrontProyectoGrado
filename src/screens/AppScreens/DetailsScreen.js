import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import styles from "../../styles/styles";

export default function DetailsScreen({ route }) {
  const { item } = route.params;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View style={[styles.container, { justifyContent: "center" }]}>
        <View style={styles.itemContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require("../../assets/product_default.jpg")}
            />
          </View>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.category}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
          <Text style={styles.itemDetails}>{item.details}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
