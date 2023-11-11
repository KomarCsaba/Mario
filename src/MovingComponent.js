import React, { useState, useEffect } from 'react';
import './MovingComponent.css'; // Create a CSS file for styling

const MovingComponent = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setComponents(prevComponents => {
        // Add a new component to the right
        const newComponent = <div key={Date.now()} className="moving-component" />;
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
