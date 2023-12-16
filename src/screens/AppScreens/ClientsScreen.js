import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import { fetchData } from "../../utils/dbFunctions";
import styles from "../../styles/styles";
import CustomCardClients from "../../components/Card/CustomCardClients";

const ClientsScreen = () => {
  const [users, setUsers] = useState([]);
  const { goTo } = useNavigationHelpers();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/clients"
      );
      const body = JSON.parse(data.body);
      setUsers(body);
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
        <CustomCardClients data={users} helper={"Details"} type={"clients"} />
      </View>
    </ScrollView>
  );
};

export default ClientsScreen;
