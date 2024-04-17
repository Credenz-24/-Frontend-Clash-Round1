import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ChartsOverviewDemo({ data }) {
  if (data) {
    const { a, b, c, d } = data;

    return (
      <BarChart
        series={[
          { data: [a, b, c, d] },
        ]}
        height={190}
        sx={{
          "& .MuiChartsAxis-root": {
            stroke: "white"
          },
          "& .MuiChartsAxis-tickLabel": {
            fill: "white"
          },
          "& .MuiChartsAxis-line": {
            stroke: "white"
          },
          "& .MuiChartsAxis-directionX .MuiChartsAxis-line": {
            stroke: "white"
          },
          "& .MuiChartsAxis-directionY .MuiChartsAxis-line": {
            stroke: "white"
          }
        }}
        xAxis={[{ data: ['A', 'B', 'C', 'D'], scaleType: 'band' }]}
        yAxis={[]} // Since we're styling both the X-axis and Y-axis, we don't need to pass specific props for Y-axis
        margin={{ top: 20, bottom: 20, left: 30, right: 30 }}
      />
    );
  }
}
