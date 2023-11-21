import * as React from "react";
import { View, Text } from "react-native";
import CustomButton from "../components/Buttons/CustomButton";
import useNavigationHelpers from "../utils/navigationHelpers";

export default function ProfileScreen({ route }) {
  const { id } = route.params;
  const { goBack } = useNavigationHelpers()
  const onBackPress = () => {
    goBack();
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 16, fontWeight: "700" }}>Profile Screen</Text>
      <Text>Product: {id}</Text>
      <CustomButton text="Go Back" onPress={onBackPress}/>
    </View>
  );
}
