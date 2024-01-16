import React, { useContext } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import CustomChart from "../../components/Charts/CustomChart";
import styles from "../../styles/styles";
import SalesOverviewCard from "../../components/Card/CustomSalesOverviewCard";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const device = Platform.OS;
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        flex: device === "web" ? 1 : 0,
      }}
    >
      <View style={[styles.container, { flex: 1 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Hello, {user.payload.name}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18 }}>Your sales:</Text>
          <Text style={{ fontSize: 18, color: "#0aada8" }}>$1,000</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: device === "web" ? "row" : "column",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CustomChart />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              rowGap: device === "web" ? 0 : 15,
            }}
          >
            <SalesOverviewCard
              title="Daily Sales"
              annualAmount="458"
              dailyAmount="880"
            />
            <SalesOverviewCard
              title="Monthly Sales"
              annualAmount="12,458"
              dailyAmount="880"
            />
            <SalesOverviewCard
              title="Annual Sales"
              annualAmount="12,458"
              dailyAmount="880"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
