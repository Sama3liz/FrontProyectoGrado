import 'react-native-gesture-handler';
import React from "react";
import { AppRegistry } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import AppNavigation from "./navigation/AppNavigation";
import {name as appName} from './app.json';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;
