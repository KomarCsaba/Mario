import './Plan.css';
import React, { Component } from 'react';

class Plan extends Component{
    render({width, height}) {
        const divStyle = {
            width: width,
            height: height
        };
        return (
            <div style={divStyle} className='square'>
                <p>Square</p>
            </div>
        );
    }
}

export default Plan;
