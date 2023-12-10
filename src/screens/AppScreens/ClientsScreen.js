import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import CustomCard from "../../components/Card/CustomCard";
import { fetchData } from "../../utils/dbFunctions";
import styles from "../../styles/styles";

const ClientsScreen = () => {
  const [users, setUsers] = useState([]);
  const { goTo } = useNavigationHelpers();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://c9ng6xj8f5.execute-api.us-east-1.amazonaws.com/getClients"
      );
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateClients = () => {
    loadData();
  };

  const onNewPressed = () => {
    goTo("NewClient", { updateClients });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CustomButton text="New" onPress={onNewPressed} />
        <CustomCard data={users} helper={"Details"} type={"clients"} />
      </View>
    </ScrollView>
  );
};

export default ClientsScreen;
