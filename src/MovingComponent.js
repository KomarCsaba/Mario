import React, { useState, useEffect } from 'react';
import './MovingComponent.css'; // Import the CSS file for styling

const MovingComponent = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setComponents(prevComponents => {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        const newComponent = <div key={Date.now()} className="moving-component" style={{ backgroundColor: randomColor }} />;
        return [...prevComponents, newComponent];
      });
    }, 1000); // Adjust the interval (changed to 1000ms) based on your preference for a slower animation

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="moving-container">
      {components.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
    </div>
  );
};

export default MovingComponent;
