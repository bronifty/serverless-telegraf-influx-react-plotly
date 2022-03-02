import { useState } from 'react';
import logo from './logo.svg';
import data from '../data/data.js';
import PlotlyComponent from './components/PlotlyComponent';

function App() {
  return (
    <>
      <PlotlyComponent data={data} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
