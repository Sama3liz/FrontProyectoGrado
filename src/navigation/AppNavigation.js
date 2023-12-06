import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const AppNavigation = () => {
  const { loading, user } = useContext(AuthContext);

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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
