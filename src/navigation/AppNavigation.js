import {
  ActivityIndicator,
  SafeAreaView,
  View,
} from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useError } from "../context/ErrorContext";
import { useTheme } from "../context/ThemeContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import styles from "../styles/styles";

const AppNavigation = () => {
  const { loading, user } = useContext(AuthContext);
  const { error } = useError();
  const { theme } = useTheme();

  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      {user ? <AppStack /> : <AuthStack />}
    </SafeAreaView>
  );
};

export default AppNavigation;
