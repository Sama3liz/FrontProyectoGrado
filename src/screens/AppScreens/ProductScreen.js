import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Pressable,
} from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import styles from "../../styles/styles";

export default function ProductScreen({ route }) {
  const { item } = route.params;
  const { goBack } = useNavigationHelpers();

  const onBackPress = () => {
    goBack();
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>Profile Screen</Text>
        <View style={styles.itemContainer}>
          {/* <Image
          style={styles.image}
          source={{ uri: "https://example.com/your-image-url.jpg" }}
        /> */}
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.category}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
          <Text style={styles.itemDetails}>{item.details}</Text>
          <CustomButton text="Go Back" onPress={onBackPress} />
        </View>
      </View>
      {/* <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: product.imageUrl }} />
      </View> */}
    </ScrollView>
  );
}
