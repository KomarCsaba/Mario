import React, { useEffect, useRef, useState } from "react";
import "./Obstacle.css";

function Obstacle() {
  const playerRef = useRef();
  const obstacleRef = useRef();
  const starRef = useRef();
  const [score, setScore] = useState(0);
  const [felteteTeljesult, setFeltetelTeljesult] = useState(false);

  const jump = () => {
    if (!!playerRef.current && playerRef.current.classList !== "jump") {
      playerRef.current.classList.add("jump");
      setTimeout(function () {
        playerRef.current.classList.remove("jump");
      }, 1000);
    }
  };

  const restartAnimation = () => {
    obstacleRef.current.classList.remove("block");
    obstacleRef.current.classList.add("block");
    starRef.current.classList.remove("starGlide");
    setTimeout(() => {
      starRef.current.classList.add("starGlide")
    }, 1000);
  };

  const startAnimation = () => {
    obstacleRef.current.classList.add("block");
    setTimeout(() => {
      starRef.current.classList.add("starGlide")
    }, 1000);
  };

  const restartGlide = () => {
    starRef.current.classList.remove("starGlide");
    starRef.current.classList.add("starGlide");
  }

  useEffect(() => {
    startAnimation();
  }, []);

  useEffect(() => {
    const isAlive = setInterval(function () {

      const playerTop = parseInt(
        getComputedStyle(playerRef.current).getPropertyValue("top")
      );

      const playerBottom = parseInt(
        getComputedStyle(playerRef.current).getPropertyValue("bottom")
      );

      const obstacleLeft = parseInt(
        getComputedStyle(obstacleRef.current).getPropertyValue("left")
      );

      if (obstacleLeft < 60 && obstacleLeft > 0 && playerTop >= 360) { //ekkor ütközik az akadályokkal
        alert(`Game Over! Your Score : ${score}`);
        setScore(0); //a score-t 0-ra állítja
        restartAnimation(); //újrakezdődik a játék
      }
    }, 10);

    return () => clearInterval(isAlive);
  });

  const checkCondition = () => {
    const playerTop = parseInt(
      getComputedStyle(playerRef.current).getPropertyValue('top')
    );

    const starLeft = parseInt(
      getComputedStyle(starRef.current).getPropertyValue('left')
    );

    const playerBottom = parseInt(
      getComputedStyle(playerRef.current).getPropertyValue("bottom")
    );

    const starTop = parseInt(
      getComputedStyle(starRef.current).getPropertyValue("top")
    );

    return (starLeft < 60 && starLeft > 0 && playerTop >= 360) || (starLeft < 60 && starLeft > 0 && playerBottom == 550 - starTop)
  };

  const handleCondition = () => {
    if (checkCondition()) {
      setScore((prevScore) => prevScore + 1);
      setFeltetelTeljesult(true);
      restartGlide();
    } else {
      setFeltetelTeljesult(false);
    }
  };

  const setupInterval = () => {
    console.log('Pont');
    // Set up an interval to check the condition every 100 milliseconds
    const intervalId = setInterval(handleCondition, 300);
    return intervalId;
  };

  useEffect(() => {
    const intervalId = setupInterval();
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " " || event.key === "ArrowUp") {
        jump();
      }
      if (event.key === "ArrowDown") {
        console.log("Down") /*gugolás implementálás*/
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  
  return (
    <div className="game">
      <div className="score">
        <p>Score : {score}</p>
      </div>
      <div>
        <div id="player" ref={playerRef}/>
        <div className="flexDiv">
          <div id="obstacle" ref={obstacleRef}/>
          <div id="star" ref={starRef}/>
        </div>
      </div>
      
    </div>
  );
}

/*
  -kellenek a képek
  -méretre szabás
  -guggolás
  -High score
  -alertet javítani
  -több akadály
*/

export default Obstacle;