import './App.css';
import React from 'react';
import Plan from "./Obstacle";
import Player from './Player';

function App() {
  return ( 
    <div className="App">
      <div className='componentPlayer'>
        <Player/>
      </div>

      <div className='component'>
        <Plan width="50px" height="50px"/> 
      </div>
      <div className='component'>
        <Plan width="50px" height="80px"/>
      </div>
      <div className='component'>
        <Plan width="50px" height="80px"/>
      </div>
      <div className='floatingSquare'>
        <Plan width="200px" height="50px"/>
      </div>
    </div>
  ); 
}

export default App;
