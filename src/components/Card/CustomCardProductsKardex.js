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
import CustomButton from "../Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";

const numColumns = 3;

const CustomCardProductsKardex = ({ data, helper, type }) => {
  const { goTo } = useNavigationHelpers();
  const [filter, setFilter] = useState([]);
  const [master, setMaster] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilter(data);
    setMaster(data);
  }, [data]);

  const searchFilter = (text) => {
    if (text) {
      const newData = master.filter((item) => {
        const itemData = item.name
          ? item.name.toUpperCase()
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

  const onMorePressed = (item) => {
    goTo("HistoryProduct", { item: item });
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search Here"
          value={search}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>
      <FlatList
        data={filter}
        numColumns={numColumns}
        
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              {/* <Image
                  style={styles.cardImage}
                  source={{ uri: item.images[0] }}
                /> */}
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>Category: {item.category}</Text>
              <Text style={styles.cardText}>Main Code: {item.code}</Text>
              <CustomButton
                text={helper}
                type="TERTIARY"
                onPress={() => onMorePressed(item)}
              />
            </View>
          );
        }}
        /* keyExtractor={(item) => {
          item.id.toString();
        }} */
      />
    </>
  );
};

export default CustomCardProductsKardex;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginLeft: 10,
    width: "100%",
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
  cardSubText: {
    padding: 10,
    fontSize: 12,
  },
  container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});
