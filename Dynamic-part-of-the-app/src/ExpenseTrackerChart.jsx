import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
export function ExpenseTrackerChart({ data }) {
  return (
    <PieChart
      series={[
        {
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          data,
          startAngle: 0,
          endAngle: 360,
          paddingAngle: 5,
          innerRadius: 30,
          cornerRadius: 5,
          
        },
      ]}
      width={550}
      height={250}
    />
  );
}
