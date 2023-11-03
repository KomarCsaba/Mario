import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Player from './Player';
import './Player.css';
import ScrollingContainer from './ScrollingContainer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    <div className="App">  
      <div className="componentPlayer">
        <Player />
      </div>
      <div className='component moving-div'>
        {/* <App/> */}
        <ScrollingContainer/>
      </div> 
    </div>
  </React.StrictMode>
);