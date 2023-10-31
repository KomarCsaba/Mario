import './App.css';
import React from 'react';
import Plan from "./Obstacle";

function App() {
  return ( 
    <div className="App">
      <div className='component'>
        <Plan width="50px" height="50px" className="component"/> 
      </div>
      <div className='component'>
        <Plan width="50px" height="80px" className="component"/>
      </div>
      <div className='component'>
        <Plan width="50px" height="80px" className="component"/>
      </div>
      <div className='component'>
        <Plan width="50px" height="80px" className="component"/>
      </div>
      <div className='component'>
        <Plan width="50px" height="80px" className="component"/>
      </div>
    </div>
  ); 
}

export default App;
