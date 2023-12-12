import { View, Text, ScrollView } from "react-native";
import React from "react";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigationHelpers from "../../utils/navigationHelpers";
import styles from "../../styles/styles";

const AccountingScreen = () => {
  const { goTo } = useNavigationHelpers();

  const onButtonPress = (page) => {
    goTo(page);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CustomButton text={"Kardex"} onPress={() => onButtonPress("Kardex")} />
        <CustomButton
          text={"Reports"} /* onPress={() => onButtonPress("Reports")} */
        />
        <CustomButton
          text={"Accounts"}
          onPress={() => onButtonPress("Accounts")}
        />
        <CustomButton text={"Diary"} onPress={() => onButtonPress("Journal")} />
        <CustomButton text={"Major"} onPress={() => onButtonPress("Major")} />
      </View>
    </ScrollView>
  );
};

export default AccountingScreen;
