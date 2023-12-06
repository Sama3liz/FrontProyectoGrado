import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";

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
    <View style={styles.item}>
      <Text style={styles.cell}>{item.code}</Text>
      <Text style={styles.cell}>{item.type}</Text>
      <Text style={[styles.cell, styles.name]}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomButton text={"Back"} onPress={() => goBack()} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Código</Text>
        <Text style={styles.headerText}>Tipo</Text>
        <Text style={styles.headerText}>Nombre</Text>
      </View>
      <FlatList
        data={accounts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1, // Para ocupar igualmente el espacio
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1, // Para ocupar igualmente el espacio
    textAlign: 'center',
  },
  name: {
    textAlign: 'left',
  },
});

export default AccountsScreen;
