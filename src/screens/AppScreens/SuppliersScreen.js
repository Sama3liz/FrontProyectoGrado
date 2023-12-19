import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import { fetchData } from "../../utils/dbFunctions";
import styles from "../../styles/styles";
import CustomCardSuppliers from "../../components/Card/CustomCardSuppliers";


const SuppliersScreen = () => {
  const [users, setUsers] = useState([]);
  const { goTo } = useNavigationHelpers();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/suppliers"
      );
      const body = JSON.parse(data.body);
      console.log(body)
      setUsers(body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateSuppliers = () => {
    loadData();
  };

  const onNewPressed = () => {
    goTo("NewSupplier", { updateSuppliers });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CustomButton text="New" onPress={onNewPressed} />
        <CustomCardSuppliers data={users} helper={"Details"} type={"suppliers"} />
      </View>
    </ScrollView>
  );
};

export default SuppliersScreen;
