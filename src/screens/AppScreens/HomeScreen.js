import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import CustomChart from "../../components/Charts/CustomChart";
import styles from "../../styles/styles";

export default function HomeScreen() {
  const { logOut, user } = useContext(AuthContext);

  console.log(user);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 10 }}>
        Hello, {user.payload.name}
      </Text>
      <CustomChart />
    </View>
  );
}
