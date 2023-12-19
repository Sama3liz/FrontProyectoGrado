import React from "react";
import {} from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialConfigScreen from "../screens/ConfigScreens/InitialConfigScreen";

const Stack = createNativeStackNavigator();

function ConfigStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Config"
      >
        <Stack.Screen name="Config" component={InitialConfigScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ConfigStack;
