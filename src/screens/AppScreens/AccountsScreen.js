import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import styles from "../../styles/styles";

const AccountsScreen = () => {
  const [accounts, setAccounts] = useState([]);
  const { goBack } = useNavigationHelpers();

  // Simulated data for accounts
  const initialAccounts = [
    { id: 1, code: "100", type: "Activo", name: "Caja" },
    { id: 2, code: "101", type: "Activo", name: "Bancos" },
    { id: 3, code: "200", type: "Pasivo", name: "Proveedores" },
    // Add more accounts as needed...
  ];

  useEffect(() => {
    // Simulated API call or data fetch
    // Replace this with your actual data retrieval logic
    setAccounts(initialAccounts);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemTable}>
      <Text style={styles.cellTable}>{item.code}</Text>
      <Text style={styles.cellTable}>{item.type}</Text>
      <Text style={[styles.cellTable, styles.nameTable]}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.containerTable}>
      <CustomButton text={"Back"} onPress={() => goBack()} />
      <View style={styles.headerTable}>
        <Text style={styles.headerTextTable}>Código</Text>
        <Text style={styles.headerTextTable}>Tipo</Text>
        <Text style={styles.headerTextTable}>Nombre</Text>
      </View>
      <FlatList
        data={accounts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AccountsScreen;
