/**
 * @format
 */
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { expo } from "./app.json";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigation from "./src/navigation/AppNavigation";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import { ErrorProvider } from "./src/context/ErrorContext";
Amplify.configure(amplifyconfig);

const App = () => {
  return (
    <AuthProvider>
      <ErrorProvider>
          <AppNavigation />
      </ErrorProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent("ProyectoGrado", () => App);

export default App;
