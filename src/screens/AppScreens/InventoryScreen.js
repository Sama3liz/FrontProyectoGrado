import React, { useEffect, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
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
    goTo("StockChange", { type: "add" });
  };

  const onMinusPressed = () => {
    goTo("StockChange", { type: "rest" });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={styles.root}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.containerCol,
            { alignItems: "baseline", width: "100%" },
          ]}
        >
          <View style={[styles.void, { width: "100%" }]}>
            <CustomButton text="New" onPress={onNewPressed} />
          </View>
          <View
            style={[
              styles.containerRow,
              {
                width: "50%",
              },
            ]}
          >
            <CustomButton text="+" onPress={onPlusPressed} type="SECONDARY" />
            <CustomButton text="-" onPress={onMinusPressed} type="SECONDARY" />
          </View>
        </View>

        <CustomCardProducts data={products} helper={"Details"} />
      </View>
    </ScrollView>
  );
};

export default InventoryScreen;
