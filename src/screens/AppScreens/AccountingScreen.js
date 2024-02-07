import { View, Text, ScrollView } from "react-native";
import React from "react";
import CustomButton from "../../components/Buttons/CustomButton";
import useNavigate from "../../utils/navigation";
import styles from "../../styles/styles";

const AccountingScreen = () => {
  const { goTo } = useNavigate();

  const onButtonPress = (page) => {
    goTo(page);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View style={[styles.container, { justifyContent: "center" }]}>
        <CustomButton
          text={"Invoices"}
          onPress={() => onButtonPress("InvoiceList")}
        />
        <CustomButton text={"Kardex"} onPress={() => onButtonPress("Kardex")} />
        {/* <CustomButton
          text={"Reports"} onPress={() => onButtonPress("Reports")}
        /> */}
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
