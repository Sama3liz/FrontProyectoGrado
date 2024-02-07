import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigate from "../../utils/navigation";
import { fetchData } from "../../utils/database";
import styles from "../../styles/styles";
import CustomCardSuppliers from "../../components/Card/CustomCardSuppliers";

const SuppliersScreen = () => {
  const [users, setUsers] = useState([]);
  const { goTo } = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/suppliers"
      );
      const body = JSON.parse(data.body);
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={styles.root}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <CustomButton text="New" onPress={onNewPressed} />
        <CustomCardSuppliers
          data={users}
          helper={"Details"}
          type={"suppliers"}
          refresher={updateSuppliers}
        />
      </View>
    </ScrollView>
  );
};

export default SuppliersScreen;
