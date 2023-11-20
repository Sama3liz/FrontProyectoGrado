import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { newPasswordStyles } from "../styles/screenStyles/NewPasswordStyles";

const KardexScreen = () => {
  const navigation = useNavigation();

  const onNewPressed = () => {
    navigation.navigate("");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Kardex List</Text>
        <CustomButton text="New" onPress={onNewPressed} />
      </View>
    </ScrollView>
  );
};

export default KardexScreen;