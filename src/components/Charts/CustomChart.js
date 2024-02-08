import { Platform, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from "../../modules/charts";
import { fetchHistoricalSales } from "../../utils/reports";

const CustomChart = (data) => {
  const [historicalSales, setHistoricalSales] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const historicalSalesData = await fetchHistoricalSales();
      setHistoricalSales(historicalSalesData);
    };
    fetchData();
  }, []);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const device = Platform.OS;

  return (
    <>
      <VictoryChart
        theme={VictoryTheme.material}
        width={screenWidth}
        height={device === "web" ? screenHeight : 300}
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={historicalSales}
        />
        <VictoryScatter
          data={historicalSales}
          size={7}
          style={{ data: { fill: "#c43a31" } }}
        />
        <VictoryAxis style={{ grid: { stroke: "transparent" } }} />
        <VictoryAxis
          dependentAxis
          style={{ axis: { stroke: "transparent" }, grid: { stroke: "grey" } }}
        />
      </VictoryChart>
    </>
  );
};

export default CustomChart;
