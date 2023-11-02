import './Obstacle.css';
import React, {Component} from 'react';

class Plan extends Component{
    constructor(props) {
        super(props);
        this.myDivRef = React.createRef();
    }

    getStartingPosition(){
        //this.myDivRef.current.focus();
        const myDiv = this.myDivRef.current; //.value
        const rect = myDiv.getBoundingClientRect();

        const startingPosition = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
        return startingPosition;
    }

    render() {
        const {width, height} = this.props;
        const startingPosition = this.getStartingPosition();
        const divStyle = {
            width: width,
            height: height,
            left: startingPosition.left
        };
        return (
            <div className='container'>   
                <div className="content"></div>
                <div ref={this.myDivRef} style={divStyle} className="square">
                    <p>Square</p>
                </div>
            </div>
        );
    }
}

export default Plan;