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

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
