import React, { useContext } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const onCompanyPress = () => {
    navigation.navigate("Company");
  };
  return (
    <View style={newPasswordStyles.root}>
      <CustomButton text="Company" onPress={onCompanyPress} />
      <CustomButton text="Profile" />
      <CustomButton text="Appearance" />
    </View>
  );
}
