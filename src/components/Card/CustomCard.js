import {
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const numColumns = 4;
const WIDTH = Dimensions.get("window").width;

const CustomCard = ({ data }) => {
  const [filter, setFilter] = useState([]);
  const [master, setMaster] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilter(data);
    setMaster(data);
  }, [data]);

  console.log(filter);

  const searchFilter = (text) => {
    if (text) {
      const newData = master.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilter(newData);
      setSearch(text);
    } else {
      setFilter(master);
      setSearch(text);
    }
  };
  return (
    <View>
      <TextInput
        placeholder="Search Here"
        value={search}
        onChangeText={(text) => searchFilter(text)}
      />
      <FlatList
        data={filter}
        numColumns={numColumns}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Image
                style={styles.cardImage}
                source={{ uri: item.images[0] }}
              />
              <Text style={styles.cardText}>{item.title}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()} // Asegúrate de ajustar esto a la propiedad que representa la clave única de cada elemento
      />
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginLeft: 20,
    width: "96%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    flex: 1,
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  cardText: {
    padding: 10,
    fontSize: 16,
  },
});
