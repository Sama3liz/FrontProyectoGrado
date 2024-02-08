import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import CustomChart from "../../components/Charts/CustomChart";
import styles from "../../styles/styles";
import SalesOverviewCard from "../../components/Card/CustomSalesOverviewCard";
import {
  fetchTotalSales,
  fetchTotalSalesByDay,
  fetchTotalSalesByMonth,
  fetchTotalSalesByYear,
} from "../../utils/reports";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const [totalSalesByDay, setTotalSalesByDay] = useState(null);
  const [totalSalesByMonth, setTotalSalesByMonth] = useState(null);
  const [totalSalesByYear, setTotalSalesByYear] = useState(null);
  const [totalSales, setTotalSales] = useState(null);
  const [loading, setLoading] = useState(true); 
  const device = Platform.OS;

  useEffect(() => {
    const fetchData = async () => {
      const totalSalesByDayData = await fetchTotalSalesByDay();
      setTotalSalesByDay(totalSalesByDayData);

      const totalSalesByMonthData = await fetchTotalSalesByMonth();
      setTotalSalesByMonth(totalSalesByMonthData);

      const totalSalesByYearData = await fetchTotalSalesByYear();
      setTotalSalesByYear(totalSalesByYearData);

      const totalSalesData = await fetchTotalSales();
      setTotalSales(totalSalesData);

      setLoading(false); 
    };
    fetchData();
  }, []);

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
          style={[
            styles.customerDetails,
            {
              marginVertical: 15,
              flexDirection: "row",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text style={{ fontSize: 18 }}>Your sales:</Text>
          <Text style={{ fontSize: 18, color: "#0aada8" }}>${Number(totalSales).toFixed(2)}</Text>
        </View>
        {loading ? ( // Mostrar indicador de carga si loading es true
          <ActivityIndicator size="large" color="#0aada8" />
        ) : (
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
                subtitle={"Gain per hour"}
                annualAmount={totalSalesByDay}
                dailyAmount={(totalSalesByDay/8).toFixed(2)}
              />
              <SalesOverviewCard
                title="Monthly Sales"
                subtitle={"Gain per day"}
                annualAmount={totalSalesByMonth}
                dailyAmount={(totalSalesByMonth/30).toFixed(2)}
              />
              <SalesOverviewCard
                title="Annual Sales"
                subtitle={"Gain per month"}
                annualAmount={totalSalesByYear}
                dailyAmount={(totalSalesByYear/12).toFixed(2)}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
