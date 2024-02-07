import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import useNavigate from "../../utils/navigation";
import styles from "../../styles/styles";
import { fetchData } from "../../utils/database";

const CardexScreen = ({ route }) => {
  const { goBack } = useNavigate();
  const { item } = route.params;
  const [cardexEntries, setCardexEntries] = useState(null);
  const id = item.id;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        `https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/kardex/${id}`
      );
      const body = JSON.parse(data.body);
      setCardexEntries(body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!cardexEntries) {
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

  if (cardexEntries.length === 0) {
    return (
      <View
        style={[
          styles.root,
          { alignItems: "center", justifyContent: "center", flex: 1 },
        ]}
      >
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Text>No entries registered</Text>
        </View>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemTable}>
      <Text style={styles.cellTable}>{item.fecha}</Text>
      <Text style={styles.cellTable}>{item.cantidad}</Text>
      <Text style={styles.cellTable}>{item.tipo_movimiento}</Text>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={styles.root}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Product: {item.name}</Text>
        <Text style={styles.title}>Stock: {item.stock}</Text>
        <View style={[styles.containerTable, styles.topMargin]}>
          <View style={styles.headerTable}>
            <Text style={styles.headerTextTable}>Fecha</Text>
            <Text style={styles.headerTextTable}>Cantidad</Text>
            <Text style={styles.headerTextTable}>Tipo</Text>
          </View>
          <FlatList
            data={cardexEntries}
            renderItem={renderItem}
            keyExtractor={(item) => item.id_registro.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CardexScreen;
