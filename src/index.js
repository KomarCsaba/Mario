import ReactDOM from 'react-dom/client';
import './index.css';
import './Player.css';
import React, { useState, useEffect } from 'react';
import MovingComponent from './MovingComponent.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    <MovingComponent/>
  </React.StrictMode>
);

/*
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
*/