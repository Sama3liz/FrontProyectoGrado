import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import CustomButton from "../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { newPasswordStyles } from "../styles/screenStyles/NewPasswordStyles";
import CustomCard from "../components/Card/CustomCard";

const InventoryScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProducts(data.products)
    } catch (e) {
      console.error("Error fetching data:", error);
    }
  };

  const onNewPressed = () => {
    navigation.navigate("NewProduct");
  };

  const onPlusPressed = () => {
    console.log("Ingreso stock");
  };

  const onMinusPressed = () => {
    console.log("Salida srtock");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Inventory</Text>
        <CustomButton text="New" onPress={onNewPressed} />
        <CustomButton text="+" onPress={onPlusPressed} type="SECONDARY" />
        <CustomButton text="-" onPress={onMinusPressed} type="SECONDARY" />
        <CustomCard data={products}/>
      </View>
    </ScrollView>
  );
};

export default InventoryScreen;
