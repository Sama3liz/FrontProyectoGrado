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
import HomeScreen from "../screens/HomeScreen";
import SuppliersScreen from "../screens/SuppliersScreen";
import KardexScreen from "../screens/KardexScreen";
import InventoryScreen from "../screens/InventoryScreen";
import ClientsScreen from "../screens/ClientsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { Divider, Flex } from "@aws-amplify/ui-react";

const Drawer = createDrawerNavigator();

function SideNavigation() {
  const { logOut, user } = useContext(AuthContext);
  const onLogOutPress = () => {
    logOut();
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <View
            style={{
              height: 200,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: "#f4f4f4",
              borderBottomWidth: 1,
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
              {user.payload.name}
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
          <Text
            onPress={onLogOutPress}
            style={{
              width: "100%",
              textAlign: "center",
              color: "red",
              marginTop: "auto",
              marginVertical: 20,
              fontSize: 20,
            }}
          >
            Sign out
          </Text>
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
        drawerActiveTintColor: "#531158"
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
        name="Accounting"
        options={{
          drawerLabel: "Accounting",
          title: "Accounting",
          drawerIcon: () => (
            <FontAwesome5 name="cash-register" size={20} color={"#808080"} />
          ),
        }}
        component={KardexScreen}
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
