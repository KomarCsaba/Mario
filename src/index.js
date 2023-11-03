import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Player from './Player';
import './Player.css';
import ScrollingContainer from './ScrollingContainer.js';
import MovingComponent from './MovingComponent.js';
import React, { useState, useEffect } from 'react';


const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    <div className="page">
      <div className="content">
        
      </div>
      <div className="bottom-section">
        <div className="fixed-component">
          <Player/>
        </div>
        <div className="scroll-container">
          <ScrollingContainer/>
        </div>
        <div className="scroll-container">
          <ScrollingContainer/>
        </div>
        <div className="scroll-container">
          <ScrollingContainer/>
        </div>
      </div>
    </div>
  </React.StrictMode>
);

function ComponentA(){
  const [renderComponentB, setRenderComponentB] = useState(false);

  useEffect(() => {
    setRenderComponentB(true);
  }, []);

  return (
    <>
     <div id="parent">
       {renderComponentB && <ComponentB/>}
     </div>
    </>
  );
}