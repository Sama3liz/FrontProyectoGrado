import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomCard from "../../components/Card/CustomCard";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import { fetchData } from "../../utils/dbFunctions";
import styles from "../../styles/styles";
import CustomCardProducts from "../../components/Card/CustomCardProducts";
import CustomCardProductsKardex from "../../components/Card/CustomCardProductsKardex";

const KardexScreen = () => {
  const [products, setProducts] = useState([]);
  const { goTo, goBack } = useNavigationHelpers();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/inventory"
      );
      const body = JSON.parse(data.body);
      setProducts(body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <CustomCardProductsKardex
          data={products}
          helper={"History"}
          type={"cardex"}
        />
      </View>
    </ScrollView>
  );
};

export default KardexScreen;
