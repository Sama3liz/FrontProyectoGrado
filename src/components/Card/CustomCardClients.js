import { Text, FlatList, Image, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import CustomSearchInput from "../Inputs/CustomSearchInput";
import { useForm } from "react-hook-form";
import styles from "../../styles/styles";

const device = Platform.OS;
const numColumns = device === "web" ? 6 : 2;

const CustomCardClients = ({ data, helper }) => {
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
        const itemData = item.lastname
          ? item.lastname.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        const firstNameData = item.firstname
          ? item.firstname.toUpperCase()
          : "".toUpperCase();
        const ciData = item.ci
          ? item.ci.toString().toUpperCase()
          : "".toUpperCase();
        return (
          itemData.indexOf(textData) > -1 ||
          firstNameData.indexOf(textData) > -1 ||
          ciData.indexOf(textData) > -1
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
    goTo("UserProfile", { person: item });
  };
  
  return (
    <>
      <View
        style={[
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
        ]}
      >
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
        renderItem={({ item, index }) => {
          return (
            <View style={styles.card}>
              {/* <Image style={styles.cardImage} source={{ uri: item.image }} /> */}
              <Text style={styles.cardText}>
                {item.lastname} {item.firstname}
              </Text>
              <Text style={styles.cardText}>{item.ci}</Text>
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

export default CustomCardClients;
