import './Obstacle.css';
import React, {Component} from 'react';

class Plan extends Component{
    render() {
        const {id} = this.props;
        const divStyle1 = {
            width: "50px",
            height: "50px"
        };
        const divStyle2 = {
            width: "50px",
            height: "70px",
        };
        const divStyle3 = {
            width: "150px",
            height: "50px"
        }

        if (id == 1) {
            return (
                <div className='container'>   
                    <div className="content">
                        
                    </div>
                    <div style={divStyle1} className="square">
                        <p>Square1</p>
                    </div>
                </div>
            );
        }
        else if (id == 2) {
            return (
                <div className='container'>
                    <div className='content'>

                    </div>
                    <div style={divStyle2} className="square">
                        <p>Square2</p>
                    </div>
                </div>
            )
        }
        else if (id == 3) {
            return (
                <div className='container'>
                    <div className='content'>

                    </div>
                    <div style={divStyle3} className="floatingSquare">
                        <p>Sqare3</p>
                    </div>
                </div>
            )
        }

        
    }
}

export default Plan;