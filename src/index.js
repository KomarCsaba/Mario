import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Player from './Player';
import './Player.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    <div>
      <div>
        <h1>Score:</h1>
        
      </div>
    </div>
  <div className="App">  
      <div className="componentPlayer">
        <Player />
      </div>
      <div className='component moving-div'>
        <App/>
      </div> 
    </div>
  </React.StrictMode>
);

