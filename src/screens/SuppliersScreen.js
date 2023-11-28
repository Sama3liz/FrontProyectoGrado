import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../components/Inputs/CustomInput";
import CustomButton from "../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { newPasswordStyles } from "../styles/screenStyles/NewPasswordStyles";

const SuppliersScreen = () => {
  const navigation = useNavigation();

  const onNewPressed = () => {
    navigation.navigate("NewSupplier");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Suppliers List</Text>

        <CustomButton text="New" onPress={onNewPressed} />

      </View>
    </ScrollView>
  );
};

export default SuppliersScreen;