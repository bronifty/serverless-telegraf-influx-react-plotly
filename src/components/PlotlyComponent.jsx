import React from 'react';
import Plot from 'react-plotly.js';

export default ({ data }) => {
  console.log(data);
  let x = [];
  let y = [];
  data.map((d) => {
    x.push(d._time);
    y.push(d._value);
  });
  console.log({ x, y });
  return (
    <Plot
      data={[
        {
          x,
          y,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
        // { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
      ]}
      layout={{ width: 400, height: 400, title: 'A Fancy Plot' }}
    />
  );
};
