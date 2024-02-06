import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "../../styles/styles";
import CustomCardInvoices from "../../components/Card/CustomCardInvoices";
import { fetchData } from "../../utils/dbFunctions";

const InvoiceScreen = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/invoice"
      );
      const body = JSON.parse(data.body);
      setJournalEntries(body);
      console.log(body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomCardInvoices data={journalEntries} />
    </View>
  );
};

export default InvoiceScreen;
