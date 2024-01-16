import React from "react";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/Drawer/CustomDrawer";
import HomeScreen from "../screens/AppScreens/HomeScreen";
import SuppliersScreen from "../screens/AppScreens/SuppliersScreen";
import AccountingScreen from "../screens/AppScreens/AccountingScreen";
import InventoryScreen from "../screens/AppScreens/InventoryScreen";
import ClientsScreen from "../screens/AppScreens/ClientsScreen";
import SettingsScreen from "../screens/AppScreens/SettingsScreen";
import BillingScreen from "../screens/AppScreens/BillingScreen";

const Drawer = createDrawerNavigator();

function SideNavigation() {
  return (
    <Drawer.Navigator
      drawerLockMode={"locked-closed"}
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250,
        },
        headerStyle: {
          backgroundColor: "#531158",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#531158",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Inventory"
        options={{
          drawerLabel: "Inventory",
          title: "Inventory",
          drawerIcon: ({ color }) => (
            <Ionicons name="archive-outline" size={24} color={color} />
          ),
        }}
        component={InventoryScreen}
      />
      <Drawer.Screen
        name="Suppliers"
        options={{
          drawerLabel: "Suppliers",
          title: "Suppliers",
          drawerIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" size={24} color={color} />
          ),
        }}
        component={SuppliersScreen}
      />
      <Drawer.Screen
        name="Clients"
        options={{
          drawerLabel: "Clients",
          title: "Clients",
          drawerIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
        component={ClientsScreen}
      />
      <Drawer.Screen
        name="Billing"
        options={{
          drawerLabel: "Billing",
          title: "Billing",
          drawerIcon: ({ color }) => (
            <Ionicons name="basket-outline" size={24} color={color} />
          ),
        }}
        component={BillingScreen}
      />
      <Drawer.Screen
        name="Accounting"
        options={{
          drawerLabel: "Accounting",
          title: "Accounting",
          drawerIcon: ({ color }) => (
            <Ionicons name="calculator-outline" size={24} color={color} />
          ),
        }}
        component={AccountingScreen}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
}

export default SideNavigation;
