import React from "react";
import {} from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SuppliersScreen from "../screens/SuppliersScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import KardexScreen from "../screens/KardexScreen";
import InventoryScreen from "../screens/InventoryScreen";
import ClientsScreen from "../screens/ClientsScreen";
import SideNavigation from "./SideNavigation";
import NewClientForm from "../components/Forms/NewClientForm";
import NewSupplierForm from "../components/Forms/NewSupplierForm";
import NewProductForm from "../components/Forms/NewProductForm";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={SideNavigation} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        <Stack.Screen name="Suppliers" component={SuppliersScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="Kardex" component={KardexScreen} />
        <Stack.Screen name="Clients" component={ClientsScreen} />
        <Stack.Screen name="NewClient" component={NewClientForm} />
        <Stack.Screen name="NewSupplier" component={NewSupplierForm} />
        <Stack.Screen name="NewProduct" component={NewProductForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
