import {
  Text,
  FlatList,
  Image,
  View,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import { useForm } from "react-hook-form";
import CustomSearchInput from "../Inputs/CustomSearchInput";
import styles from "../../styles/styles";

const device = Platform.OS;
const numColumns = device === "web" ? 6 : 2;

const CustomCardProducts = ({ data, helper }) => {
  const { goTo } = useNavigationHelpers();
  const { control } = useForm();
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
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const itemCodeData = item.code
          ? item.code.toUpperCase()
          : "".toUpperCase();
        const itemAuxData = item.aux
          ? item.aux.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return (
          itemData.indexOf(textData) > -1 ||
          itemCodeData.indexOf(textData) > -1 ||
          itemAuxData.indexOf(textData) > -1
        );
      });
      setFilter(newData);
      setSearch(text);
    } else {
      setFilter(master);
      setSearch(text);
    }
  };

  const onMorePressed = (item) => {
    goTo("ProductProfile", { item: item });
  };

  return (
    <>
      <View style={[
          styles.void,
          {
            backgroundColor: "white",
            width: "100%",
            borderColor: "#e8e8e8",
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginVertical: 5,
          },
        ]}>
        <CustomSearchInput
          placeholder="Keyword Here"
          name={"search"}
          label={"Search"}
          control={control}
          handleInputChange={(text) => searchFilter(text)}
        />
      </View>
      <FlatList
        data={filter}
        numColumns={numColumns}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Image
                  style={styles.cardImage}
                  source={require("../../assets/product_default.jpg")}
                />
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>Main Code: {item.code}</Text>
              <Text style={styles.cardText}>Code: {item.aux}</Text>
              <Text style={styles.cardText}>Stock: {item.stock}</Text>
              <Text style={styles.cardText}>Price: {item.price}</Text>
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

export default CustomCardProducts;