import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import CustomCard from "../../components/Card/CustomCard";
import { fetchData } from "../../utils/dbFunctions";
import useNavigationHelpers from "../../utils/navigationHelpers";
import styles from "../../styles/styles";
import CustomCardProducts from "../../components/Card/CustomCardProducts";

const InventoryScreen = () => {
  const [products, setProducts] = useState([]);
  const { goTo } = useNavigationHelpers();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/inventory"
      );
      const body = JSON.parse(data.body);
      console.log(data)
      setProducts(body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateProducts = () => {
    loadData();
  };

  const onNewPressed = () => {
    goTo("NewProduct", { updateProducts });
  };

  const onPlusPressed = () => {
    console.log("Ingreso stock");
  };

  const onMinusPressed = () => {
    console.log("Salida srtock");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CustomButton text="New" onPress={onNewPressed} />
        <CustomButton text="+" onPress={onPlusPressed} type="SECONDARY" />
        <CustomButton text="-" onPress={onMinusPressed} type="SECONDARY" />
        <CustomCardProducts data={products} helper={"Details"}/>
      </View>
    </ScrollView>
  );
};

export default InventoryScreen;
