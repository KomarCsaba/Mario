import './App.css';
import React from 'react';
import Plan from "./Obstacle";
import Player from './Player';


function App() {

  for (let index = 1; index > 0; index++) {
    return ( 
  
      <div className="App">
        
        <div className='componentPlayer'>
          <Player/>
        </div>
  
        <div className='component'>
          <Plan id={1}/>
        </div>
  
        <div className='component'>
          <Plan id={2}/>
        </div>
  
        <div className='component'>
          <Plan id={3}/>
        </div>
        
      </div>
    ); 
  }
  
}

export default App;