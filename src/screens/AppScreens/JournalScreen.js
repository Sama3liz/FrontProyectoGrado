import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";

const JournalScreen = () => {
  const { goBack } = useNavigationHelpers();

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
    <View style={styles.item}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.account}</Text>
      <Text style={styles.cell}>{item.invoice}</Text>
      <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
        <Text style={styles.expand}>
          {expandedEntry === item.id ? "-" : "+"}
        </Text>
      </TouchableOpacity>
      {expandedEntry === item.id && (
        <View style={styles.expanded}>
          <Text>{item.details}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomButton text={"Back"} onPress={() => goBack()} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Fecha</Text>
        <Text style={styles.headerText}>Cuenta</Text>
        <Text style={styles.headerText}>Factura</Text>
        <Text style={styles.headerText}></Text>
      </View>
      <FlatList
        data={journalEntries}
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
  expand: {
    textAlign: "center",
    fontSize: 20,
    width: 30,
  },
  expanded: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginTop: 5,
    marginLeft: 20,
  },
});

export default JournalScreen;
