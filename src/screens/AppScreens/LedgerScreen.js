import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";

const LedgerScreen = () => {
  const { goBack } = useNavigationHelpers();
  const [ledgerEntries, setLedgerEntries] = useState([
    {
      id: 1,
      account: "Caja",
      debit: 1000,
      credit: 0,
    },
    {
      id: 2,
      account: "Ventas",
      debit: 0,
      credit: 1500,
    },
    // Add more ledger entries as needed...
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.cell}>{item.account}</Text>
      <Text style={styles.cell}>{item.debit}</Text>
      <Text style={styles.cell}>{item.credit}</Text>
      <Text style={styles.cell}>{item.debit - item.credit}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomButton text={"Back"} onPress={() => goBack()} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Cuenta</Text>
        <Text style={styles.headerText}>Débito</Text>
        <Text style={styles.headerText}>Crédito</Text>
        <Text style={styles.headerText}>Saldo</Text>
      </View>
      <FlatList
        data={ledgerEntries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default LedgerScreen;
