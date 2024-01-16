import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import styles from "../../styles/styles";

const LedgerScreen = () => {
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
    <View style={styles.itemTable}>
      <Text style={styles.cellTable}>{item.account}</Text>
      <Text style={[styles.cellTable, { color: "green" }]}>{item.debit}</Text>
      <Text style={[styles.cellTable, { color: "red" }]}>{item.credit}</Text>
      <Text
        style={[
          styles.cellTable,
          { borderRightWidth: 0 },
          item.debit - item.credit > 0 ? { color: "green" } : { color: "red" },
        ]}
      >
        {item.debit - item.credit}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.customerDetails}>
        <View style={styles.headerTable}>
          <Text style={styles.headerTextTable}>Account</Text>
          <Text style={styles.headerTextTable}>Debit</Text>
          <Text style={styles.headerTextTable}>Credit</Text>
          <Text style={styles.headerTextTable}>Total</Text>
        </View>
        <FlatList
          data={ledgerEntries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default LedgerScreen;
