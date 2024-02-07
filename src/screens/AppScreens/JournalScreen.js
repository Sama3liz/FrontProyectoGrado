import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles/styles";
import { getCurrentDate } from "../../utils/billing";

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
      <View style={{ flexDirection: "column", width: "100%" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.cellTable}>{item.date}</Text>
          <Text style={styles.cellTable}>{item.invoice}</Text>
          <View style={styles.cellRowTable}>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => toggleExpanded(item.id)}
            >
              {expandedEntry === item.id ? (
                <MaterialCommunityIcons
                  name="minus-circle-outline"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  size={24}
                  color="black"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ justifyContent: "row" }}>
          {expandedEntry === item.id && (
            <View style={styles.customerDetails}>
              <Text>Account: {item.account}</Text>
              <Text>Details: {item.details}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.customerDetails}>
        <View style={styles.headerTable}>
          <Text style={styles.headerTextTable}>Date</Text>
          <Text style={styles.headerTextTable}>Document</Text>
          <Text style={styles.headerTextTable}>More</Text>
        </View>
        <FlatList
          data={journalEntries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default JournalScreen;
