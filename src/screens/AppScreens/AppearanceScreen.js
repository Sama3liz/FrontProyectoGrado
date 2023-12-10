// src/screens/ColorExperimentScreen.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import styles from "../../styles/styles";

const AppearanceScreen = () => {
  const { theme, setTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.color }}>Hello, world!</Text>
      <TouchableOpacity onPress={() => setTheme({ color: "red" })}>
        <Text>Color Rojo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme({ color: "green" })}>
        <Text>Color Verde</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme({ color: "blue" })}>
        <Text>Color Azul</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppearanceScreen;
