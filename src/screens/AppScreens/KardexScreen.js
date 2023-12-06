import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomCard from "../../components/Card/CustomCard";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import { fetchData } from "../../utils/dbFunctions";

const KardexScreen = () => {
  const [products, setProducts] = useState([]);
  const { goTo, goBack } = useNavigationHelpers();

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <CustomButton text={"Back"} onPress={() => goBack()} />
        <Text style={newPasswordStyles.title}>Products List</Text>
        <CustomCard data={products} helper={"Registry"} type={"inventory"} />
      </View>
    </ScrollView>
  );
};

export default KardexScreen;
