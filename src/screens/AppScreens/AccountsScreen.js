import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles/styles";

const AccountsScreen = () => {
  const [accounts, setAccounts] = useState([]);
  const { goTo, goBack } = useNavigationHelpers();

  // Simulated data for accounts
  const initialAccounts = [
    { id: 1, code: "1.0.00", name: "Activo" },
    { id: 2, code: "1.0.01", name: "Corriente" },
    { id: 3, code: "2.0.00", name: "Pasivo" },
    { id: 4, code: "2.0.00", name: "Patrimonio" },
    // Add more accounts as needed...
  ];

  useEffect(() => {
    setAccounts(initialAccounts);
  }, []);

  const updateList = () => {
    /* loadData(); */
    console.log("List Updated");
  };

  const addAccount = () => {
    goTo("NewAccount", { updateList });
  };

  const editAccount = (item) => {
    
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemTable}>
      <Text style={styles.cellTable}>{item.code}</Text>
      <Text style={[styles.cellTable, styles.nameTable]}>{item.name}</Text>
      <View style={styles.cellRowTable}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => editAccount(item)}
        >
          <MaterialCommunityIcons
            name="progress-pencil"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <CustomButton text={"New"} onPress={() => addAccount()} />
        <View style={[styles.containerTable, { marginTop: 10 }]}>
          <View style={styles.headerTable}>
            <Text style={styles.headerTextTable}>Código</Text>
            <Text style={styles.headerTextTable}>Nombre</Text>
            <Text style={styles.headerTextTable}>Actions</Text>
          </View>
          <FlatList
            data={accounts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountsScreen;
