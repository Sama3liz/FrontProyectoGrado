import { Platform, Dimensions } from "react-native";
import React from "react";
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

const CustomChart = () => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const device = Platform.OS;
  const data = [
    { x: 1, y: 13000 },
    { x: 2, y: 16500 },
    { x: 3, y: 14250 },
    { x: 4, y: 19000 },
    { x: 5, y: 5642 },
    { x: 6, y: 2135 },
    { x: 7, y: 4567 },
    { x: 8, y: 4565 },
    { x: 9, y: 456 },
    { x: 10, y: 7895 },
    { x: 11, y: 738 },
    { x: 12, y: 4532 },
  ];
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
          data={data}
          
        />
        <VictoryScatter
          data={data}
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
