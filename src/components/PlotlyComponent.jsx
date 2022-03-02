import React from 'react';
import Plot from 'react-plotly.js';

export default ({ data: { used, usedTime, available, availableTime } }) => {
  console.log({ used, usedTime, available, availableTime });
  // console.log({ used, usedTime, available, availableTime });
  return (
    <Plot
      data={[
        {
          x: usedTime.map((d) => new Date(d)),
          y: used,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
        {
          type: 'bar',
          x: availableTime.map((d) => new Date(d)),
          y: available,
          marker: { color: 'blue' },
        },
      ]}
      layout={{ autosize: true, title: 'AWS Fargate Container Memory (Gb)' }}
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
    />
  );
};
