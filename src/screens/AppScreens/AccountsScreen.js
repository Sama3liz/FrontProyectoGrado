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
import { fetchData } from "../../utils/dbFunctions";

const AccountsScreen = () => {
  const [accounts, setAccounts] = useState([]);
  const { goTo, goBack } = useNavigationHelpers();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/accounts"
      );
      const body = JSON.parse(data.body);
      const sortedAccounts = body.sort((a, b) => {
        if (a.codigo_cuenta < b.codigo_cuenta) return -1;
        if (a.codigo_cuenta > b.codigo_cuenta) return 1;
        return 0;
      });
      setAccounts(sortedAccounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateList = () => {
    loadData();
  };

  const addAccount = () => {
    goTo("NewAccount", { updateList });
  };

  const editAccount = (item) => {
    goTo("EditAccount", { item, updateList });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemTable}>
      <Text style={styles.cellTable}>{item.codigo_cuenta}</Text>
      <Text style={[styles.cellTable, styles.nameTable]}>
        {item.nombre_cuenta}
      </Text>
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

  if (!accounts) {
    return (
      <View
        style={[
          styles.root,
          { alignItems: "center", justifyContent: "center", flex: 1 },
        ]}
      >
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <CustomButton text={"New"} onPress={addAccount} />
        <View style={[styles.containerTable, { marginTop: 10 }]}>
          <View style={styles.headerTable}>
            <Text style={styles.headerTextTable}>Código</Text>
            <Text style={styles.headerTextTable}>Nombre</Text>
            <Text style={styles.headerTextTable}>Actions</Text>
          </View>
          <FlatList
            data={accounts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id_cuenta.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountsScreen;
