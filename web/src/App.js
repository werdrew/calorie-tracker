import React from 'react';
import CS3200Project from './cs3200project/cs3200project';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CS3200Project/>
      </BrowserRouter>
    </div>
  );
}

export default App;
