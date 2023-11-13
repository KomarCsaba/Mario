import React, { useEffect, useRef, useState } from "react";
import "./Obstacle.css";

function Obstacle() {
  const playerRef = useRef();
  const obstacleRef = useRef();
  const [score, setScore] = useState(0);

  const jump = () => {
    if (!!playerRef.current && playerRef.current.classList !== "jump") {
      playerRef.current.classList.add("jump");
      setTimeout(function () {
        playerRef.current.classList.remove("jump");
      }, 1000);
    }
  };

  useEffect(() => {
    const isAlive = setInterval(function () {
      const playerTop = parseInt(
        getComputedStyle(playerRef.current).getPropertyValue("top")
      );
      let obstacleLeft = parseInt(
        getComputedStyle(obstacleRef.current).getPropertyValue("left")
      );

      if (obstacleLeft < 40 && obstacleLeft > 0 && playerTop >= 140) {
        alert("Game Over! Your Score : " + score);
        setScore(0);
      } else {
        setScore(score + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  });


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " " || event.key === "ArrowUp") {
        jump();
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  
  return (
    <div className="game">
      <p className="score">Score : {score}</p>
      <div id="player" ref={playerRef}></div>
      <div id="obstacle" ref={obstacleRef}></div>
    </div>
  );
}

export default Obstacle;