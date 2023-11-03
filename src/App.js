import './App.css';
import Plan from "./Obstacle";
import Score from "./Score";
import React, { useEffect, useRef, useState } from "react";
import { ReactDOM } from 'react';

let random1;
let random2;
let random3;

function App() {

  const myElementRef = useRef(null);
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    const el = myElementRef.current;
    const rect = el.getBoundingClientRect();
    setTop(rect.top);
    setBottom(rect.bottom);
    setLeft(rect.left);
    setRight(rect.right);
    setWidth(rect.width);
    setHeight(rect.height);
  }, []);

  

  for (let index = 1; index > 0; index++) {
    random1 = Math.floor(Math.random() * 3) + 1;
    random2 = Math.floor(Math.random() * 3) + 1;
    random3 = Math.floor(Math.random() * 3) + 1;
    return ( 
      <div className='component App'>

        <div className="container">
            <h3>React Js Get Element Position</h3>
            <div ref={myElementRef}>This is my element</div>

            <pre>Top: {top}</pre>
            <pre>Right: {right}</pre>
            <pre>Bottom: {bottom}</pre>
            <pre>Left: {left}</pre>
            <pre>Height: {height}</pre>
            <pre>Width: {width}</pre>
        </div>

        <div className='component'>
          <Plan id={random1}/>
        </div>

        <div className='component'>
          <Score/>
        </div>

        <div className='component'>
          <Plan id={random2}/>
        </div>

        <div className='component'>
          <Plan id={random3}/>
        </div>
      </div>
    ); 
  }
}

ReactDOM.render(<App />, document.querySelector(".App"));

export default App;