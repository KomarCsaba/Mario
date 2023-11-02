import './App.css';
import React from 'react';
import Plan from "./Obstacle";



function App() {

  for (let index = 1; index > 0; index++) {
    let random1 = Math.floor(Math.random() * 3) + 1;
    let random2 = Math.floor(Math.random() * 3) + 1;
    let random3 = Math.floor(Math.random() * 3) + 1;
    return ( 
      <div className="App">
        <div className='component'>
          <Plan id={random1}/>
        </div>

        <div className='component'>
          <Plan id={random2}/>
        </div>

        <div className='component'>
          <Plan id={random3}/>
        </div>
      </div>
    ); 
  }
}

export default App;