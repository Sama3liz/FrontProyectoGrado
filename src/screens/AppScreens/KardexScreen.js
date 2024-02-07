import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomCard from "../../components/Card/CustomCard";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigate from "../../utils/navigation";
import { fetchData } from "../../utils/database";
import styles from "../../styles/styles";
import CustomCardProducts from "../../components/Card/CustomCardProducts";
import CustomCardProductsKardex from "../../components/Card/CustomCardProductsKardex";

const KardexScreen = () => {
  const [products, setProducts] = useState([]);
  const { goTo, goBack } = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/inventory"
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
      nestedScrollEnabled={true}
      style={styles.root}
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
