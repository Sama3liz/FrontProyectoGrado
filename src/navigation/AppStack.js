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

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={SideNavigation} />
        {/* Not Found */}
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        {/* Suplliers */}
        <Stack.Screen name="NewSupplier" component={NewSupplierForm} />
        {/* Inventory */}
        <Stack.Screen name="NewProduct" component={NewProductForm} />
        <Stack.Screen name="NewCategory" component={NewCategoryForm} />
        {/* Profile */}
        <Stack.Screen name="UserProfile" component={ProfileScreen} />
        <Stack.Screen name="ProductProfile" component={ProfileScreen} />
        {/* Accounting */}
        <Stack.Screen name="Kardex" component={KardexScreen} />
        <Stack.Screen name="Accounts" component={AccountsScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="Major" component={LedgerScreen} />
        {/* Settings */}
        <Stack.Screen name="Company" component={Company} />
        {/* Clients */}
        <Stack.Screen name="NewClient" component={NewClientForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
