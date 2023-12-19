import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles/styles";

const JournalScreen = () => {
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: "2023-12-01",
      account: "Caja",
      invoice: "INV-001",
      details: "Detalles de la transacción 1...",
    },
    {
      id: 2,
      date: "2023-12-02",
      account: "Bancos",
      invoice: "INV-002",
      details: "Detalles de la transacción 2...",
    },
    // Add more journal entries as needed...
  ]);

  const [expandedEntry, setExpandedEntry] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedEntry(expandedEntry === id ? null : id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemTable}>
      <Text style={styles.cellTable}>{item.date}</Text>
      <Text style={styles.cellTable}>{item.account}</Text>
      <View style={styles.cellRowTable}>
        <TouchableOpacity style={styles.removeButton}>
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
        <Text style={styles.expand}>
          {expandedEntry === item.id ? "-" : "+"}
        </Text>
      </TouchableOpacity>
      {expandedEntry === item.id && (
        <View style={styles.expanded}>
          <Text>{item.details}</Text>
        </View>
      )} */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.customerDetails}>
        <View style={[styles.containerTable, { marginTop: 10 }]}>
          <View style={styles.headerTable}>
            <Text style={styles.headerTextTable}>Fecha</Text>
            <Text style={styles.headerTextTable}>Cuenta</Text>
            <Text style={styles.headerTextTable}>More</Text>            
          </View>
          <FlatList
            data={journalEntries}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default JournalScreen;
