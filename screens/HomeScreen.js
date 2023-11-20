import React, { useContext } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/GlobalStyles";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { logOut, user } = useContext(AuthContext);
  const onLogOutPress = () => {
    logOut();
  };
  return (
    <View style={globalStyles.container}>
      <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 10 }}>
        Hello, 
      </Text>
      <Text
        onPress={onLogOutPress}
        style={{
          width: "100%",
          textAlign: "center",
          color: "red",
          marginTop: "auto",
          marginVertical: 20,
          fontSize: 20,
        }}
      >
        Sign out
      </Text>
    </View>
  );
}
