import React, { useContext } from "react";
import "react-native-gesture-handler";
import { Text, View, Image, Dimensions } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import USER from "../assets/user-default-96.png";
import HomeScreen from "../screens/AppScreens/HomeScreen";
import SuppliersScreen from "../screens/AppScreens/SuppliersScreen";
import AccountingScreen from "../screens/AppScreens/AccountingScreen";
import InventoryScreen from "../screens/AppScreens/InventoryScreen";
import ClientsScreen from "../screens/AppScreens/ClientsScreen";
import SettingsScreen from "../screens/AppScreens/SettingsScreen";
import { AuthContext } from "../context/AuthContext";
import BillingScreen from "../screens/AppScreens/BillingScreen";

const Drawer = createDrawerNavigator();

function SideNavigation() {
  const { logOut, user } = useContext(AuthContext);
  const onLogOutPress = () => {
    logOut();
  };
  return (
    <Drawer.Navigator
      drawerLockMode={"locked-closed"}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <View
            style={{
              height: "200",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: "#f4f4f4",
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}
          >
            <Image
              source={USER}
              style={{ height: 130, width: 130, borderRadius: 65 }}
            />
            <Text
              style={{
                fontSize: 22,
                marginVertical: 6,
                fontWeight: "bold",
                color: "#111",
              }}
            >
              {user.payload["name"]}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#111",
              }}
            >
              {user.payload["cognito:username"]}
            </Text>
          </View>
          <DrawerItemList {...props} />
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderTopColor: "#f4f4f4",
              borderTopWidth: 1,
            }}
          ></View>
          <DrawerItem
            label="Log out"
            onPress={onLogOutPress}
            icon={() => <MaterialIcons name="logout" size={24} color="red" />}
            style={[{ justifyContent: "space-between", alignItems: "center" }]}
          />
        </DrawerContentScrollView>
      )}
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
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerActiveTintColor: "blue",
        drawerLabelStyle: {
          color: "#111",
        },
        drawerActiveTintColor: "#531158",
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
          drawerIcon: () => (
            <MaterialCommunityIcons name="home" size={20} color={"#808080"} />
          ),
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Inventory"
        options={{
          drawerLabel: "Inventory",
          title: "Inventory",
          drawerIcon: () => (
            <MaterialIcons name="inventory" size={20} color={"#808080"} />
          ),
        }}
        component={InventoryScreen}
      />
      <Drawer.Screen
        name="Suppliers"
        options={{
          drawerLabel: "Suppliers",
          title: "Suppliers",
          drawerIcon: () => (
            <FontAwesome name="user-secret" size={20} color={"#808080"} />
          ),
        }}
        component={SuppliersScreen}
      />
      <Drawer.Screen
        name="Clients"
        options={{
          drawerLabel: "Clients",
          title: "Clients",
          drawerIcon: () => (
            <FontAwesome name="users" size={20} color={"#808080"} />
          ),
        }}
        component={ClientsScreen}
      />
      <Drawer.Screen
        name="Billing"
        options={{
          drawerLabel: "Billing",
          title: "Billing",
          drawerIcon: () => (
            <FontAwesome5 name="money-bill" size={20} color={"#808080"} />
          ),
        }}
        component={BillingScreen}
      />
      <Drawer.Screen
        name="Accounting"
        options={{
          drawerLabel: "Accounting",
          title: "Accounting",
          drawerIcon: () => (
            <FontAwesome5 name="cash-register" size={20} color={"#808080"} />
          ),
        }}
        component={AccountingScreen}
      />
      <Drawer.Screen
        name="Settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: () => (
            <MaterialIcons name="settings" size={20} color={"#808080"} />
          ),
        }}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
}

export default SideNavigation;
