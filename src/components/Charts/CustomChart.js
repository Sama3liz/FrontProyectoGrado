import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
} from "../../modules/charts";

const CustomChart = () => {
  const screenWidth = Dimensions.get("window").width;

  const categorias = [
    { label: "Ropa", valor: 50 },
    { label: "Electrónicos", valor: 30 },
    { label: "Libros", valor: 20 },
  ];

  const productsData = [
    { id: 1, name: "Product 1", sales: 50, revenue: 2500 },
    { id: 2, name: "Product 2", sales: 30, revenue: 1800 },

    // Add more products here...
  ];

  const data = categorias.map((item) => ({
    ...item,
    x: item.label,
    y: item.valor,
  }));

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VictoryPie
            data={data}
            x="label"
            y="valor"
            innerRadius={100}
            labelComponent={<VictoryLabel />}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar data={productsData} x="name" y="sales" />
          </VictoryChart>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar data={productsData} x="name" y="revenue" />
          </VictoryChart>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productList: {
    width: "100%",
    paddingHorizontal: 20,
  },
});
export default CustomChart;
