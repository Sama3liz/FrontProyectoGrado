import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import CustomCard from "../../components/Card/CustomCard";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import { fetchData } from "../../utils/dbFunctions";

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onNewPressed = () => {
    goTo("NewClient");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Suppliers List</Text>
        <CustomButton text="New" onPress={onNewPressed} />
        <CustomCard data={users} helper={"Details"} type={"suppliers"} />
      </View>
    </ScrollView>
  );
};

export default SuppliersScreen;
