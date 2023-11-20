import React, { useEffect, useRef, useState } from "react";
import "./Obstacle.css";
import EndDiv from "./End.js";

const obstacleTypes = ["kicsi", "nagy", "lebego"];

const Obstacle = () => {
  const playerRef = useRef();
  const obstacleRef = useRef();
  const starRef = useRef();
  const gameRef = useRef();

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [end, setEnd] = useState(false);
  const [isCrouching, setIsCrouching] = useState(false);
  const [pontNoveles, setPontNoveles] = useState(false);

  const createObstacle = () => {
    const randomIndex = Math.floor(Math.random() * obstacleTypes.length);
    const type = obstacleTypes[randomIndex];
    obstacleTypes.forEach((type) => {
      obstacleRef.current.classList.remove(type);
    });
    obstacleRef.current.classList.add(type);
  };

  const startAnimation = () => {
    createObstacle();
    if (obstacleRef.current.classList.contains("block")) {
        obstacleRef.current.classList.remove("block");
    }
    obstacleRef.current.classList.add("block");
    setTimeout(() => {
      starRef.current.classList.add("starGlide");
    }, 1000);
  };

  const restartGame = () => {
    setScore(0);
    setPontNoveles(false);
    setEnd(false);
    startAnimation();
  };

  useEffect(() => {
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
    const isAlive = setInterval(() => {
      const playerTop = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("top"));
      const playerBottom = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("bottom"));
      const playerRight = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("right"));
      const playerLeft = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("left"));
      const playerWidth = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("width"));
      const playerHeight = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("height"));

      const obstacleLeft = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("left"));
      const obstacleTop = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("top"));
      const obstacleBottom = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("bottom"));
      const obstacleHeight = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("height"));
      const obstacleWidth = parseFloat(getComputedStyle(obstacleRef.current).getPropertyValue("width"));     
  
      if (obstacleRef.current.classList.contains("kicsi")) {
        if (obstacleLeft <= 100 - playerRight && Math.abs(playerBottom) >= obstacleTop) {
          handleCollision();
        }
      }

      if (obstacleRef.current.classList.contains("nagy")) {
        if (obstacleLeft <= 100 - playerRight && Math.abs(playerBottom) >= obstacleTop) {
          handleCollision();
        }
      }
  
      if (obstacleRef.current.classList.contains("lebego")) {
        if (obstacleLeft <= 100 - playerRight && !playerRef.current.classList.contains("playerGuggolas")) {
          console.log(isCrouching);
          console.log();
          handleCollision();
        }
      }
    }, 10);

    return () => clearInterval(isAlive);
  }, [score, highScore]);

  
  const handleCollision = () => {
    stopAnimation();
    if (score > highScore) {
      setHighScore(score);
    }
    setEnd(true);
  };

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

  const stopAnimation = () => {
    if (obstacleRef.current.classList.contains("block")) {
      obstacleRef.current.classList.remove("block");
    
    if (starRef.current.classList.contains("starGlide")) {
        starRef.current.classList.remove("starGlide");
    }}
  };

  const restartGlide = () => {
    starRef.current.classList.remove("starGlide");
    starRef.current.classList.add("starGlide");
  };

  //Pontszerzes
  useEffect(() => {
    const intervalId = setupInterval();
    return () => clearInterval(intervalId);
  }, []);
  const setupInterval = () => {
    const intervalId = setInterval(handleCondition, 300);
    return intervalId;
  };
  const handleCondition = () => {
    if (checkCondition()) {
      setScore((prevScore) => prevScore + 1);
      setPontNoveles(true);
      restartGlide();
    } else {
      setPontNoveles(false);
    }
  };
  const checkCondition = () => {
    const starLeft = parseFloat(getComputedStyle(starRef.current).getPropertyValue("left"));
    const playerBottom = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("bottom"));
    const starTop = parseFloat(getComputedStyle(starRef.current).getPropertyValue("top"));
    const playerRight = parseFloat(getComputedStyle(playerRef.current).getPropertyValue("right"));
    

    return (starLeft <= 100 - playerRight && Math.abs(playerBottom) >= starTop);
  };

  const scoreStyle = {
    paddingLeft: "5vw",
  }; 

  const jatekter = {
    backgroundImage: `url(${require('./assets/hatter.png')})`,
    backgroundSize: "100vw 100vh",
    width: "100vw",
    height: "100vh",
  };

  //idáig
  return (
    <div className="game" ref={gameRef}>
      <div className="score" style={scoreStyle}>
        <p>Score: {score}</p>
        <p id="high">High Score: {highScore}</p>
      </div>
      <div style={jatekter}>
        <div className={`player ${isCrouching ? "playerGuggolas" : ""}`} ref={playerRef} />
        <div className="flexDiv">
          <div ref={obstacleRef} className="block"/>
          <div id="star" ref={starRef} />
          {end && !pontNoveles && <EndDiv score={score} highScore={highScore} onRestart={restartGame} />}
        </div>
      </div>
    </div>
  );
};

/*
  -kellenek a képek
  -méretre szabás
  -guggolás
  -gyorsulás ahogy nő a pont
  -score ne változzon restart képernyőnél (stop animation metódus?!)
*/

export default Obstacle;