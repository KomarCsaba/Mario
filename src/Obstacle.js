import React, { useEffect, useRef, useState } from "react";
import "./Obstacle.css";
import EndDiv from "./End.js";

function Obstacle() {
  const obstacleType = ["kicsi", "nagy", "lebego"];
  const playerRef = useRef();
  const obstacleRef = useRef();
  const starRef = useRef();
  const [score, setScore] = useState(0);
  const [felteteTeljesult, setFeltetelTeljesult] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [end, setEnd] = useState(false);

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
    createObstacle();
    obstacleRef.current.classList.add("block");
    starRef.current.classList.remove("starGlide");
    setTimeout(() => {
      starRef.current.classList.add("starGlide")
    }, 1000);
  };

  function createObstacle() {
    /*TODO random obstacle typeba*/
    let type = obstacleType[0];
    obstacleRef.current.classList.add(type);
  }

  const startAnimation = () => {
    createObstacle();
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
        //alert(`Game Over! Your Score : ${score}`);
        if (score > highScore) {
          setHighScore(score);
        }
        setEnd(true);
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

    return (starLeft < 60 && starLeft > 0 && playerTop >= 360) || (starLeft < 60 && starLeft > 0 && playerBottom === 550 - starTop)
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
        console.log("Down") /*guggolás implementálás*/
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  

  const restartGame = () => {
    setScore(0);
    setFeltetelTeljesult(false);
    setEnd(false);
    restartAnimation();
  };
/*
  const props = {
    score,
    highScore,
    onRestart,
  };
*/
  return (
    <div className="game">
      <div className="score">
        <p>Score : {score}</p>
        <p id="high">High Score: {highScore}</p>
      </div>
      <div>
        <div id="player" ref={playerRef}/>
        <div className="flexDiv">
          <div ref={obstacleRef}/>
          <div id="star" ref={starRef}/>
          { end && <EndDiv score={score} highScore={highScore} onRestart={restartGame} /> /*and mark*/ }
        </div>
      </div>
    </div>
  );
}

/*
  -kellenek a képek
  -méretre szabás
  -guggolás
  -alertet javítani
  -több akadály
*/

export default Obstacle;