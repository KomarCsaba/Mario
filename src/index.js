import ReactDOM from 'react-dom/client';
import React from 'react';
import Player from './Player.js';
import FinalObstacle from './FinalObstacle.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    {/* <Player/> */}
    <FinalObstacle/>
  </React.StrictMode>
);