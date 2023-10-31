import './App.css';
import React from 'react';
import Plan from "./Obstacle";
import Player from './Player';

function App() {
  return ( 
    <div className="App"> {/**/}
      <Plan width="50px" height="50px"/> 
      <Plan width="50px" height="80px"/>

    </div>
  ); 
}

export default App;
