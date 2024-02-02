import React, { useState } from "react";
import { View } from "react-native";
import styles from "../../styles/styles";
import CustomCardInvoices from "../../components/Card/CustomCardInvoices";

const InvoiceScreen = () => {
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: "2023-12-01",
      invoice: "INV-001",
    },
    {
      id: 2,
      date: "2023-12-02",
      invoice: "INV-002",
    },
    // Add more journal entries as needed...
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.customerDetails}>
        <CustomCardInvoices data={journalEntries} />
      </View>
    </View>
  );
};

export default InvoiceScreen;
