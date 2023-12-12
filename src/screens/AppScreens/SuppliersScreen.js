import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import CustomCard from "../../components/Card/CustomCard";
import { fetchData } from "../../utils/dbFunctions";
import styles from "../../styles/styles";


const SuppliersScreen = () => {
  const [users, setUsers] = useState([]);
  const { goTo } = useNavigationHelpers();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://c9ng6xj8f5.execute-api.us-east-1.amazonaws.com/getSup"
      );
      setUsers(data);
      console.log(data);
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
        <CustomCard data={users} helper={"Details"} type={"suppliers"} />
      </View>
    </ScrollView>
  );
};

export default SuppliersScreen;