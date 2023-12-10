/**
 * @format
 */
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigation from "./src/navigation/AppNavigation";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import { ThemeProvider } from "./src/context/ThemeContext";
import { ErrorProvider } from "./src/context/ErrorContext";
Amplify.configure(amplifyconfig, { ssr: true });

const App = () => {
  return (
    <AuthProvider>
      <ErrorProvider>
        <ThemeProvider>
          <AppNavigation />
        </ThemeProvider>
      </ErrorProvider>
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;
