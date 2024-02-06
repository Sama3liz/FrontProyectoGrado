import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotFoundScreen from "../screens/PublicScreens/NotFoundScreen";
import KardexScreen from "../screens/AppScreens/KardexScreen";
import SideNavigation from "./SideNavigation";
import NewClientForm from "../components/Forms/NewClientForm";
import NewSupplierForm from "../components/Forms/NewSupplierForm";
import NewProductForm from "../components/Forms/NewProductForm";
import Company from "../components/Forms/CompanyDataForm";
import ProfileScreen from "../screens/AppScreens/ProfileScreen";
import NewCategoryForm from "../components/Forms/NewCategoryForm";
import AccountsScreen from "../screens/AppScreens/AccountsScreen";
import JournalScreen from "../screens/AppScreens/JournalScreen";
import LedgerScreen from "../screens/AppScreens/LedgerScreen";
import CardexScreen from "../screens/AppScreens/CardexScreen";
import UserScreen from "../screens/AppScreens/UserScreen";
import ProductScreen from "../screens/AppScreens/ProductScreen";
import NewAccountForm from "../components/Forms/NewAccountForm";
import StockScreen from "../screens/AppScreens/StockScreen";
import InvoiceScreen from "../screens/AppScreens/InvoiceScreen";
import DetailsScreen from "../screens/AppScreens/DetailsScreen";
import EditAccountForm from "../components/Forms/EditAccountForm";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        /* screenOptions={{ headerShown: false }} */
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#531158" },
          headerTintColor: "#fff",
        }}
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
          options={{ headerTitle: "New Product" }}
        />
        <Stack.Screen
          name="NewCategory"
          component={NewCategoryForm}
          options={{ headerTitle: "New Category" }}
        />
        <Stack.Screen
          name="StockChange"
          component={StockScreen}
          options={{ headerTitle: "Stock Change" }}
        />
        {/* Clients */}
        <Stack.Screen
          name="NewClient"
          component={NewClientForm}
          options={{ headerTitle: "New Costumer" }}
        />
        {/* Profile */}
        <Stack.Screen
          name="UserProfile"
          component={ProfileScreen}
          options={{ headerTitle: "User Profile" }}
        />
        <Stack.Screen
          name="ProductProfile"
          component={ProductScreen}
          options={{ headerTitle: "Product Profile" }}
        />
        {/* Accounting */}
        <Stack.Screen
          name="InvoiceList"
          component={InvoiceScreen}
          options={{ headerTitle: "Invoice List" }}
        />
        <Stack.Screen
          name="InvoiceDetails"
          component={DetailsScreen}
          options={{ headerTitle: "Invoice Details" }}
        />
        <Stack.Screen
          name="Kardex"
          component={KardexScreen}
          options={{ headerTitle: "Kardex Registry" }}
        />
        <Stack.Screen
          name="HistoryProduct"
          component={CardexScreen}
          options={{ headerTitle: "Product History" }}
        />
        <Stack.Screen
          name="Accounts"
          component={AccountsScreen}
          options={{ headerTitle: "Accounting Accounts" }}
        />
        <Stack.Screen
          name="NewAccount"
          component={NewAccountForm}
          options={{ headerTitle: "New Account" }}
        />
        <Stack.Screen
          name="EditAccount"
          component={EditAccountForm}
          options={{ headerTitle: "Edit Account" }}
        />
        <Stack.Screen
          name="Journal"
          component={JournalScreen}
          options={{ headerTitle: "Journal" }}
        />
        <Stack.Screen
          name="Major"
          component={LedgerScreen}
          options={{ headerTitle: "Major" }}
        />
        {/* Settings */}
        <Stack.Screen
          name="Company"
          component={Company}
          options={{ headerTitle: "Company Profile" }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ headerTitle: "User Data" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
