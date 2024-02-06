import {
  Text,
  FlatList,
  Image,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import { useForm } from "react-hook-form";
import CustomSearchInput from "../Inputs/CustomSearchInput";
import styles from "../../styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const device = Platform.OS;

const CustomCardInvoices = ({ data }) => {
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
        const itemData = item.date ? item.date.toUpperCase() : "".toUpperCase();
        const itemCodeData = item.invoice
          ? item.code.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return (
          itemData.indexOf(textData) > -1 || itemCodeData.indexOf(textData) > -1
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
    goTo("InvoiceDetails", { item: item });
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
      <View style={styles.customerDetails}>
        <View style={styles.headerTable}>
          <Text style={styles.headerTextTable}>Date</Text>
          <Text style={styles.headerTextTable}>Document</Text>
          <Text style={styles.headerTextTable}>Client</Text>
          <Text style={styles.headerTextTable}>More</Text>
        </View>
        <FlatList
          data={filter}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemTable}>
                <View style={{ flexDirection: "column", width: "100%" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.cellTable}>{item.date}</Text>
                    <Text style={styles.cellTable}>{item.id}</Text>
                    <Text style={styles.cellTable}>{item.client}</Text>
                    <View style={styles.cellRowTable}>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => onMorePressed(item)}
                      >
                        <MaterialCommunityIcons
                          name="plus-circle-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          /* keyExtractor={(item) => {
          item.id.toString();
        }} */
        />
      </View>
    </>
  );
};

export default CustomCardInvoices;
