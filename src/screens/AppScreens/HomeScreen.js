import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import CustomChart from "../../components/Charts/CustomChart";
import styles from "../../styles/styles";
import { useTheme } from "../../context/ThemeContext";

export default function HomeScreen() {
  const { logOut, user } = useContext(AuthContext);
  const { theme } = useTheme();

  const onLogOutPress = () => {
    logOut();
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 10 }}>
        Hello, <Text style={{ color: theme.color }}>{user.payload.name}</Text>
      </Text>
      <CustomChart/>
    </View>
  );
}
