import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";

const CardexScreen = ({ route }) => {
  const { goBack } = useNavigationHelpers();
  const { id } = route.params;
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
    <View style={styles.item}>
      <Text>{item.date}</Text>
      <Text>{item.item}</Text>
      <Text>{item.quantity}</Text>
      <Text>{item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomButton text={"Back"} onPress={() => goBack()} />
      <Text>Product: {id}</Text>
      <View style={styles.header}>
        <Text>Fecha</Text>
        <Text>Producto</Text>
        <Text>Cantidad</Text>
        <Text>Tipo</Text>
      </View>
      <FlatList
        data={cardexEntries}
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
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default CardexScreen;
