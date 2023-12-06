import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import useNavigationHelpers from "../../utils/navigationHelpers";
import CustomCard from "../../components/Card/CustomCard";
import { fetchData } from "../../utils/dbFunctions";

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

  const onNewPressed = () => {
    goTo("NewClient");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Clients</Text>
        <CustomButton text="New" onPress={onNewPressed} />
        <CustomCard data={users} helper={"Details"} type={"clients"}/>
      </View>
    </ScrollView>
  );
};

export default ClientsScreen;
