import { Button, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../styles/GlobalStyles";

export default function DashboardScreen({ navigation }) {
  return (
    <View style={globalStyles.container}> 
      <Text>Dashboard Screen</Text>
      <Button
        title="Go to Home... again"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}


