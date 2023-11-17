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
  const [isCrouching, setIsCrouching] = useState(false);

  useEffect(() => {
    createObstacle();
    startAnimation();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " " || event.key === "ArrowUp") jump();
      if (event.key === "ArrowDown") crouchStart();
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowDown") crouchStop();
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const intervalId = setupInterval();
    return () => clearInterval(intervalId);
  }, []);

  const jump = () => {
    if (!!playerRef.current && !playerRef.current.classList.contains("jump")) {
      playerRef.current.classList.add("jump");
      setTimeout(() => {
        playerRef.current.classList.remove("jump");
      }, 1000);
    }
  };

  const crouchStart = () => {
    setIsCrouching(true);
    playerRef.current.classList.add("playerGuggolas");
  };

  const crouchStop = () => {
    setIsCrouching(false);
    playerRef.current.classList.remove("playerGuggolas");
  };

  const createObstacle = () => {
    const randomIndex = Math.floor(Math.random() * obstacleType.length);
    const type = obstacleType[randomIndex];
    obstacleRef.current.classList.add(type);
  };

  const startAnimation = () => {
    createObstacle();
    obstacleRef.current.classList.add("block");

    const animationDuration = `${5 - score * 0.5}s`;
    document.documentElement.style.setProperty("--animation-duration", animationDuration);

    setTimeout(() => {
      starRef.current.classList.add("starGlide");
    }, 1000);
  };

  const restartAnimation = () => {
    obstacleRef.current.classList.remove("block");
    obstacleRef.current.classList.add("block");

    const animationDuration = `${5 - score * 0.5}s`;
    document.documentElement.style.setProperty("--animation-duration", animationDuration);

    setTimeout(() => {
      starRef.current.classList.add("starGlide");
    }, 1000);
  };

  const stopAnimation = () => {
    obstacleRef.current.classList.remove("block");
  };

  const restartGame = () => {
    setScore(0);
    setFeltetelTeljesult(false);
    setEnd(false);
    createObstacle();
    restartAnimation();
  };

  const restartGlide = () => {
    starRef.current.classList.remove("starGlide");
    starRef.current.classList.add("starGlide");
  };

  const setupInterval = () => {
    const intervalId = setInterval(handleCondition, 300);
    return intervalId;
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

  const checkCondition = () => {
    const playerTop = parseInt(getComputedStyle(playerRef.current).getPropertyValue("top"));
    const starLeft = parseInt(getComputedStyle(starRef.current).getPropertyValue("left"));
    const playerBottom = parseInt(getComputedStyle(playerRef.current).getPropertyValue("bottom"));
    const starTop = parseInt(getComputedStyle(starRef.current).getPropertyValue("top"));

    return (
      (starLeft < 60 && starLeft > 0 && playerTop >= 360) ||
      (starLeft < 60 && starLeft > 0 && playerBottom === 550 - starTop)
    );
  };

  return (
    <div className="game">
      <div className="score">
        <p>Score: {score}</p>
        <p id="high">High Score: {highScore}</p>
      </div>
      <div>
        <div className={`player ${isCrouching ? "playerGuggolas" : ""}`} ref={playerRef} />
        <div className="flexDiv">
          <div ref={obstacleRef} />
          <div id="star" ref={starRef} />
          {end && !felteteTeljesult && <EndDiv score={score} highScore={highScore} onRestart={restartGame} />}
        </div>
      </div>
    </div>
  );
}

export default Obstacle;