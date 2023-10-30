import './Plan.css';
import React from 'react';

function squareCreate(width, height) {
    const elem = document.createElement("div");
    elem.style.width = width;
    elem.style.height = height;

    const pg = document.createElement("p");
    elem.appendChild(pg);
    return (

        <div  class="square">
        <p class="text">Square text</p>
        </div> 

    )
}
   
export default squareCreate;
