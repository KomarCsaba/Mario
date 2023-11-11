import React, { useState, useEffect } from 'react';
import './MovingComponent.css'; // Import the CSS file for styling

const MovingComponent = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setComponents(prevComponents => {
        // Generate a random color for each component
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        
        // Add a new component to the right with a random background color
        const newComponent = <div key={Date.now()} className="moving-component" style={{ backgroundColor: randomColor }} />;
        
        return [...prevComponents, newComponent];
      });
    }, 200); // Adjust the interval based on your preference

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
