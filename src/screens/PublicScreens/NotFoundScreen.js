import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";

import CustomButton from "../../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";

const NotFoundScreen = () => {
  const navigation = useNavigation();

  const onNewPressed = () => {
    navigation.navigate("");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Sorry component not found</Text>
        <CustomButton text="New" onPress={onNewPressed} />
      </View>
    </ScrollView>
  );
};

export default NotFoundScreen;
