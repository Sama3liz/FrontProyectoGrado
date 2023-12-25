import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import CustomChart from "../../components/Charts/CustomChart";
import styles from "../../styles/styles";
import SalesOverviewCard from "../../components/Card/CustomSalesOverviewCard";

export default function HomeScreen() {
  const { logOut, user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 10 }}>
        Hello, {user.payload.name}
      </Text>
      <View styles={[styles.void, { flexDirection: "row" }]}>
        <CustomChart />
        <View styles={styles.containerRow}>
          <SalesOverviewCard
            title="Annual Sales"
            annualAmount="12,458"
            dailyAmount="880"
          />
        </View>
      </View>
    </View>
  );
}
