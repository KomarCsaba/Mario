import React, { Component } from 'react';
import './ScrollingContainer.css';
import Plan from "./Obstacle";

class ScrollingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPos: 0,
    };
  }

  componentDidMount() {
    this.scrollInterval = setInterval(this.moveComponents, 16); // Adjust the interval for your desired animation speed
  }

  componentWillUnmount() {
    clearInterval(this.scrollInterval);
  }

  moveComponents = () => {
    this.setState((prevState) => ({
      scrollPos: prevState.scrollPos + 1,
    }));
  };

  render() {
    const { scrollPos } = this.state;

    return (
      <div className="scroll-container" style={{ transform: `translateX(${-scrollPos}px)` }}>
        <Plan />
      </div>
    );
  }
}

export default ScrollingContainer;
