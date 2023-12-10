import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import CustomCard from "../../components/Card/CustomCard";
import { fetchData } from "../../utils/dbFunctions";
import useNavigationHelpers from "../../utils/navigationHelpers";
import styles from "../../styles/styles";

const InventoryScreen = () => {
  const [products, setProducts] = useState([]);
  const { goTo } = useNavigationHelpers();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://c9ng6xj8f5.execute-api.us-east-1.amazonaws.com/getInv"
      );
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onNewPressed = () => {
    goTo("NewProduct");
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
        <CustomCard data={products} helper={"Details"} type={"inventory"}/>
      </View>
    </ScrollView>
  );
};

export default InventoryScreen;
