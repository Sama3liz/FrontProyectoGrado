import React from "react";
import { View, ScrollView } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigate from "../../utils/navigation";
import styles from "../../styles/styles";

export default function SettingsScreen() {
  const { goTo } = useNavigate();

  const onButtonPress = (page) => {
    goTo(page);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View style={[styles.container, { justifyContent: "center" }]}>
        <CustomButton text="Company" onPress={() => onButtonPress("Company")} />
        <CustomButton text="Profile" onPress={() => onButtonPress("User")} />
      </View>
    </ScrollView>
  );
}
