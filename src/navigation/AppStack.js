import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotFoundScreen from "../screens/PublicScreens/NotFoundScreen";
import KardexScreen from "../screens/AppScreens/KardexScreen";
import SideNavigation from "./SideNavigation";
import NewClientForm from "../components/Forms/NewClientForm";
import NewSupplierForm from "../components/Forms/NewSupplierForm";
import NewProductForm from "../components/Forms/NewProductForm";
import Company from "../components/Forms/CompanyForm";
import ProfileScreen from "../screens/AppScreens/ProfileScreen";
import NewCategoryForm from "../components/Forms/NewCategoryForm";
import AccountsScreen from "../screens/AppScreens/AccountsScreen";
import JournalScreen from "../screens/AppScreens/JournalScreen";
import LedgerScreen from "../screens/AppScreens/LedgerScreen";
import CardexScreen from "../screens/AppScreens/CardexScreen";
import UserScreen from "../screens/AppScreens/UserScreen";
import AppearanceScreen from "../screens/AppScreens/AppearanceScreen";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        /* screenOptions={{ headerShown: false }} */
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={SideNavigation}
          options={{ headerShown: false }}
        />
        {/* Not Found */}
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ headerTitle: "Page not found" }}
        />
        {/* Suppliers */}
        <Stack.Screen
          name="NewSupplier"
          component={NewSupplierForm}
          options={{ headerTitle: "New Supplier" }}
        />
        {/* Inventory */}
        <Stack.Screen
          name="NewProduct"
          component={NewProductForm}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="NewCategory"
          component={NewCategoryForm}
          options={{ headerTitle: "" }}
        />
        {/* Clients */}
        <Stack.Screen
          name="NewClient"
          component={NewClientForm}
          options={{ headerTitle: "" }}
        />
        {/* Profile */}
        <Stack.Screen
          name="UserProfile"
          component={ProfileScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="ProductProfile"
          component={ProfileScreen}
          options={{ headerTitle: "" }}
        />
        {/* Accounting */}
        <Stack.Screen
          name="Kardex"
          component={KardexScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="HistoryProduct"
          component={CardexScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="Accounts"
          component={AccountsScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="Journal"
          component={JournalScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="Major"
          component={LedgerScreen}
          options={{ headerTitle: "" }}
        />
        {/* Settings */}
        <Stack.Screen
          name="Company"
          component={Company}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="Appearance"
          component={AppearanceScreen}
          options={{ headerTitle: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
