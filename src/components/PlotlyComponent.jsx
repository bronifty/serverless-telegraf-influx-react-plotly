import React from 'react';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

export default ({ data: { used, usedTime, available, availableTime } }) => {
  var trace1 = {
    x: availableTime.map((d) => new Date(d)),
    y: available,
    name: 'Available',
    type: 'bar',
  };
  var trace2 = {
    x: usedTime.map((d) => new Date(d)),
    y: used,
    name: 'Used',
    type: 'scatter',
  };
  var data = [trace1, trace2];
  return (
    <Plot
      data={data}
      layout={{ autosize: true, title: 'AWS Fargate Container Memory (Gb)' }}
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
    />
  );
};
