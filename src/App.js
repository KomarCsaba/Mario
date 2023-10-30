import './App.css';
import React from 'react';

function Square({ value, onSquareClick }) { //létrehoz egy buttont amibe bele van írva a button
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function onClick(){
  return;
}

function App() {
  return (
    <div className="App">
      <Square value = {"valami"} onSquareClick={addEventListener("click", onClick())}/>

      
      
    </div>
  );
}

export default App;
