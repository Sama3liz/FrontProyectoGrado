import { Text, View, Image, Pressable, ImageBackground } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import USER from "../../assets/user-default-96.png";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  const { logOut, user } = useContext(AuthContext);
  const onLogOutPress = () => {
    logOut();
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#531158", paddingTop: 0 }}
      >
        <ImageBackground
          source={require("../../assets/background-side.jpg")}
          style={{
            padding: 20,
          }}
        >
          <Image
            source={USER}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {user.payload["name"]}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
            }}
          >
            {user.payload["cognito:username"]}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, paddingTop: 10, backgroundColor: "#fff" }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopColor: "#ccc",
          borderTopWidth: 1,
          padding: 20,
        }}
      >
        <Pressable onPress={onLogOutPress} style={[]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="log-out-outline" size={24} color="red" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: "red",
              }}
            >
              Log out
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomDrawer;
