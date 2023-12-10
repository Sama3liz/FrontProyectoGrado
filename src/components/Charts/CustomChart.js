import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
import { VictoryPie, VictoryLabel, VictoryTooltip } from "../../modules/charts";

const CustomChart = () => {
  const screenWidth = Dimensions.get("window").width;

  const categorias = [
    { label: "Ropa", valor: 50 },
    { label: "Electrónicos", valor: 30 },
    { label: "Libros", valor: 20 },
  ];

  const data = categorias.map((item) => ({ ...item, x: item.label, y: item.valor }));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 550,
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
  );
};

export default CustomChart;
