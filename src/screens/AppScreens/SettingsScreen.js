import React from "react";
import { View, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import styles from "../../styles/styles";

export default function SettingsScreen() {
  const { goTo } = useNavigationHelpers();

  const onButtonPress = (page) => {
    goTo(page);
  };
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CustomButton text="Company" onPress={() => onButtonPress("Company")} />
        <CustomButton text="Profile" onPress={() => onButtonPress("User")} />
      </View>
    </ScrollView>
  );
}
