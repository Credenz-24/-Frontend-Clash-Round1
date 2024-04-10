import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ChartsOverviewDemo({ data }) {
  if(data){
  const { a, b, c, d } = data;

  const xAxisConfig = {
    lineColor: 'white', // Change the color of the x-axis line to white
    tickTextColor: 'white', // Change the color of the x-axis tick labels to white
  };

  const yAxisConfig = {
    lineColor: 'white', // Change the color of the y-axis line to white
    tickTextColor: 'white', // Change the color of the y-axis tick labels to white
  };

  return (
    <BarChart
      series={[
        { data: [a, b, c, d] },
      ]}
      height={190}
      className='text-white'
      xAxis={[{ data: ['A', 'B', 'C', 'D'], scaleType: 'band', config: xAxisConfig }]}
      yAxis={[{ config: yAxisConfig }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
}
