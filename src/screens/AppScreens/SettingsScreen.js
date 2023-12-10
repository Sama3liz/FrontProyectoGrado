import React from "react";
import { View } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import useNavigationHelpers from "../../utils/navigationHelpers";

export default function SettingsScreen() {
  const { goTo } = useNavigationHelpers();
  const onButtonPress = (page) => {
    goTo(page);
  };
  return (
    <View style={newPasswordStyles.root}>
      <CustomButton text="Company" onPress={() => onButtonPress("Company")} />
      <CustomButton text="Profile" onPress={() => onButtonPress("User")} />
      <CustomButton text="Appearance" onPress={()=> onButtonPress("Appearance")} />
    </View>
  );
}
