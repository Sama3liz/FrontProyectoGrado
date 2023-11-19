import React from "react";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import SuppliersScreen from "../screens/SuppliersScreen";
import KardexScreen from "../screens/KardexScreen";
import InventoryScreen from "../screens/InventoryScreen";
import ClientsScreen from "../screens/ClientsScreen";

const Drawer = createDrawerNavigator();

function SideNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250,
        },
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerActiveTintColor: "blue",
        drawerLabelStyle: {
          color: "#111",
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Inventory"
        options={{
          drawerLabel: "Inventory",
          title: "Inventory",
        }}
        component={InventoryScreen}
      />
      <Drawer.Screen
        name="Suppliers"
        options={{
          drawerLabel: "Suppliers",
          title: "Suppliers",
        }}
        component={SuppliersScreen}
      />
      <Drawer.Screen
        name="Kardex"
        options={{
          drawerLabel: "Kardex",
          title: "Kardex",
        }}
        component={KardexScreen}
      />
      <Drawer.Screen
        name="Clients"
        options={{
          drawerLabel: "Clients",
          title: "Clients",
        }}
        component={ClientsScreen}
      />
    </Drawer.Navigator>
  );
}

export default SideNavigation;
