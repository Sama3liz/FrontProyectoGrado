import React from "react";
import {} from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import ConfirmEmailScreen from "../screens/AuthScreens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/AuthScreens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/AuthScreens/NewPasswordScreen";
import SignInScreen from "../screens/AuthScreens/SignInScreen";
import PrivacyPolicyScreen from "../screens/PublicScreens/PrivacyPolicyScreen";
import TermsUseScreen from "../screens/PublicScreens/TermsUseScreen";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SignIn"
      >
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

export default AuthStack;
