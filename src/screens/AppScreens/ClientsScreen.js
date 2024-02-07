import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigate from "../../utils/navigation";
import { fetchData } from "../../utils/database";
import styles from "../../styles/styles";
import CustomCardClients from "../../components/Card/CustomCardClients";

const ClientsScreen = () => {
  const [users, setUsers] = useState([]);
  const { goTo } = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/customer"
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <CustomButton text="New" onPress={onNewPressed} />
        <CustomCardClients
          data={users}
          helper={"Details"}
          type={"clients"}
          refresher={updateClients}
        />
      </View>
    </ScrollView>
  );
};

export default ClientsScreen;
