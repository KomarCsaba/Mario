import logo from './logo.svg';
import './App.css';
import React from 'react';

function Square({ value, onSquareClick }) {
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
