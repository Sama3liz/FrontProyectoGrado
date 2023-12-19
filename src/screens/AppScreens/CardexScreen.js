import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import styles from "../../styles/styles";

const CardexScreen = ({ route }) => {
  const { goBack } = useNavigationHelpers();
  const { id } = route.params.item;
  const [cardexEntries, setCardexEntries] = useState([
    {
      id: 1,
      date: "2023-12-01",
      item: "Producto A",
      quantity: 10,
      type: "Entrada",
    },
    {
      id: 2,
      date: "2023-12-05",
      item: "Producto B",
      quantity: 5,
      type: "Salida",
    },
    // Add more cardex entries as needed...
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.itemTable}>
      <Text style={styles.cellTable}>{item.date}</Text>
      <Text style={styles.cellTable}>{item.quantity}</Text>
      <Text style={styles.cellTable}>{item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product: {id}</Text>
      <View style={styles.customerDetails}>
        <View style={[styles.containerTable, { marginTop: 10 }]}>
          <View style={styles.headerTable}>
            <Text style={styles.headerTextTable}>Fecha</Text>
            <Text style={styles.headerTextTable}>Cantidad</Text>
            <Text style={styles.headerTextTable}>Tipo</Text>
          </View>
          <FlatList
            data={cardexEntries}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default CardexScreen;
