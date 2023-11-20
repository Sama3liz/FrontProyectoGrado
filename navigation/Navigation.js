import React from "react";
import {  } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import SignInScreen from "../screens/SignInScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import TermsUseScreen from "../screens/TermsUseScreen";
import SuppliersScreen from "../screens/SuppliersScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import KardexScreen from "../screens/KardexScreen";
import InventoryScreen from "../screens/InventoryScreen";
import ClientsScreen from "../screens/ClientsScreen";
import SideNavigation from "./SideNavigation";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
        <Stack.Screen name="Home" component={SideNavigation} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        <Stack.Screen name="Suppliers" component={SuppliersScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="Kardex" component={KardexScreen} />
        <Stack.Screen name="Clients" component={ClientsScreen} />

        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{ title: "Privacy Policy", headerShown: true }}
        />
        <Stack.Screen
          name="TermsUse"
          component={TermsUseScreen}
          options={{ title: "Terms of Use", headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;