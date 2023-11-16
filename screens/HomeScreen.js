import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, Text, View } from "react-native";
import { globalStyles } from "../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/Buttons/CustomButton";

export default function HomeScreen() {
  const navigation = useNavigation();
  const onLogOutPress = () => {
    navigation.navigate("SignIn");
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, alignSelf: "center" }}>
        Home, sweet home
      </Text>
      <CustomButton
          text="Log Out"
          onPress={onLogOutPress}
          type="SECONDARY"
        />
    </View>
  );
}
