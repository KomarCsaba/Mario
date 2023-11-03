import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Player from './Player';
import './Player.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    <div className="App">  
      <div className="componentPlayer moving-div">
        <Player />
      </div>
      <div className='component'>
        <App/>
      </div> 
    </div>
  </React.StrictMode>
);