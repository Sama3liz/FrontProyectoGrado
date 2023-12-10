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

const numColumns = 4;

const CustomCard = ({ data, helper, type }) => {
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
        if (type === "clients") {
          const itemData = item.firstName
            ? item.firstName.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
        if (type === "inventory" || type === "cardex") {
          const itemData = item.nombre_producto
            ? item.nombre_producto.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
        if (type === "suppliers") {
          const itemData = item.nombre_comercial
            ? item.nombre_comercial.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilter(newData);
      setSearch(text);
    } else {
      setFilter(master);
      setSearch(text);
    }
  };

  const onMorePressed = (item) => {
    if (type === "suppliers") {
      goTo("UserProfile", { id: item.id_proveedor });
    }
    if (type === "clients") {
      goTo("UserProfile", { id: item.id_cliente });
    }
    if (type === "inventory") {
      goTo("ProductProfile", { id: item.id_producto });
    }
    if (type === "cardex") {
      goTo("HistoryProduct", { id: item.id_producto });
    }
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
        style={styles.container}
        renderItem={({ item }) => {
          if (type === "clients") {
            return (
              <View style={styles.card}>
                {/* <Image style={styles.cardImage} source={{ uri: item.image }} /> */}
                <Text style={styles.cardText}>{item.apellido}</Text>
                <Text style={styles.cardText}>{item.nombre}</Text>
                <CustomButton
                  text={helper}
                  type="TERTIARY"
                  onPress={() => onMorePressed(item)}
                />
              </View>
            );
          }
          if (type === "inventory") {
            return (
              <View style={styles.card}>
                {/* <Image
                  style={styles.cardImage}
                  source={{ uri: item.images[0] }}
                /> */}
                <Text style={styles.cardText}>{item.nombre_producto}</Text>
                <CustomButton
                  text={helper}
                  type="TERTIARY"
                  onPress={() => onMorePressed(item)}
                />
              </View>
            );
          }
          if (type === "cardex") {
            return (
              <View style={styles.card}>
                {/* <Image
                  style={styles.cardImage}
                  source={{ uri: item.images[0] }}
                /> */}
                <Text style={styles.cardText}>{item.nombre_producto}</Text>
                <CustomButton
                  text={helper}
                  type="TERTIARY"
                  onPress={() => onMorePressed(item)}
                />
              </View>
            );
          }
          if (type === "suppliers") {
            return (
              <View style={styles.card}>
                {/* <Image style={styles.cardImage} source={{ uri: item.image }} /> */}
                <Text style={styles.cardText}>{item.nombre_comercial}</Text>
                <Text style={styles.cardText}>RUC: {item.identificacion}</Text>
                <CustomButton
                  text={helper}
                  type="TERTIARY"
                  onPress={() => onMorePressed(item)}
                />
              </View>
            );
          }
        }}
        keyExtractor={(item) => {
          if (type === "inventory" || type === "cardex") {
            item.id_producto.toString();
          }
          if (type === "clients") {
            item.id_cliente.toString();
          }
          if (type === "suppliers") {
            item.id_proveedor.toString();
          }
        }}
      />
    </>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginLeft: 20,
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
