import React, { useEffect, useRef, useState } from "react";
import "./Obstacle.css";
import EndDiv from "./End.js";

const obstacleTypes = ["kicsi", "nagy", "lebego"];

const Obstacle = () => {
  const playerRef = useRef();
  const obstacleRef = useRef();
  const starRef = useRef();

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [end, setEnd] = useState(false);
  const [isCrouching, setIsCrouching] = useState(false);
  const [feltetelTeljesult, setFeltetelTeljesult] = useState(false);

  const createObstacle = () => {
    const randomIndex = Math.floor(Math.random() * obstacleTypes.length);
    console.log(randomIndex)
    const type = obstacleTypes[randomIndex];
    obstacleTypes.forEach((type) => {
      obstacleRef.current.classList.remove(type);
    });
    obstacleRef.current.classList.add(type);
  };

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

  useEffect(() => {
    const isAlive = setInterval(() => {
      const playerTop = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("top"));
      const playerBottom = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("bottom"));
      const playerRight = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("right"));
      const obstacleLeft = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("left"));
      const obstacleTop = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("top"));
      const obstacleBottom = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("bottom"));
  
      if (obstacleRef.current.classList.contains("kicsi") || obstacleRef.current.classList.contains("nagy")) {
        if (obstacleLeft <= 99 - playerRight && playerBottom >= 98 - obstacleTop) {
          handleCollision();
        }
      }
  
      if (obstacleRef.current.classList.contains("lebego")) {
        if (obstacleLeft <= 99 - playerRight && playerTop >= 98 - obstacleBottom) {
          handleCollision();
        }
      }
    }, 10);

    return () => clearInterval(isAlive);
  }, [score, highScore]);

  useEffect(() => {
    const blockElement = obstacleRef.current;
  
    const handleAnimationIteration = () => {
      createObstacle();
    };
  
    blockElement.addEventListener("animationiteration", handleAnimationIteration);
  
    return () => {
      blockElement.removeEventListener("animationiteration", handleAnimationIteration);
    };
  }, [createObstacle]);

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

  const startAnimation = () => {
    createObstacle();
    obstacleRef.current.classList.add("block");
    setTimeout(() => {
      starRef.current.classList.add("starGlide");
    }, 1000);
  };

  const restartAnimation = () => {
    obstacleRef.current.classList.remove("block");
    obstacleRef.current.classList.add("block");
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
    const starLeft = parseFloat(getComputedStyle(starRef.current).getPropertyValue("left"));
    const playerBottom = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("bottom"));
    const starTop = parseFloat(getComputedStyle(starRef.current).getPropertyValue("top"));

    return ((starLeft < 99 && starLeft > 0 && playerBottom >= 98 - starTop));
  };

  const checkCollision = () => {
    const playerTop = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("top"));
    const playerBottom = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("bottom"));
    const playerRight = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("right"));

    const obstacleLeft = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("left"));
    const obstacleTop = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("top"));
    const obstacleBottom = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("bottom"));

    if (obstacleRef.current.classList.contains("kicsi") || obstacleRef.current.classList.contains("nagy")) {
      if (obstacleLeft <= 99 - playerRight && playerBottom >= 98 - obstacleTop) {
        handleCollision();
      }
    }

    if (obstacleRef.current.classList.contains("lebego")) {
      if (obstacleLeft <= 99 - playerRight && playerTop >= 98 - obstacleBottom) {
        handleCollision();
      }
    }
  };

  const handleCollision = () => {
    if (score > highScore) {
      setHighScore(score);
    }
    setEnd(true);
    restartAnimation();
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
          <div ref={obstacleRef} className="block"/>
          <div id="star" ref={starRef} />
          {end && !feltetelTeljesult && <EndDiv score={score} highScore={highScore} onRestart={restartGame} />}
        </div>
      </div>
    </div>
  );
};

/*
  -kellenek a képek
  -méretre szabás
  -guggolás
  -gyorsulás ahogy nő a pontszám
  -score ne változzon restart képernyőnél (stop animation metódus?!)
*/

export default Obstacle;