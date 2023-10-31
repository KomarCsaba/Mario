import './Obstacle.css';
import React, {Component} from 'react';

class Plan extends Component{
    render() {
        const {width, height} = this.props;
        const divStyle = {
            width: width,
            height: height
        };
        return (
            <div className='container'>
                <div className="content">
                    
                </div>
                <div style={divStyle} className="square bottom-div">
                    <p>Square</p>
                </div>
            </div>
        );
    }
}

export default Plan;