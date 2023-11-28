import React, { useContext } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/GlobalStyles";
import CustomButton from "../components/Buttons/CustomButton";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const onCompanyPress = () => {
    navigation.navigate("Company");
  };
  return (
    <View style={globalStyles.container}>
      <Text>Here are the most important configurations, take care when you change it.</Text>
      <CustomButton text="Company" onPress={onCompanyPress} />
    </View>
  );
}
