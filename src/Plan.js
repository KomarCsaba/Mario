import './Plan.css';
import React from 'react';

class Plan{
    squareCreate(width, height) {
        const elem = document.createElement("div");
        elem.style.width = width;
        elem.style.height = height;
        const pg = document.createElement("p");
        elem.appendChild(pg);
        return elem;
    }
}
   
export default Plan;
