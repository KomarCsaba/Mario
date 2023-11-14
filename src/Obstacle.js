import React, { useEffect, useRef, useState } from "react";
import "./Obstacle.css";

let score;

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

  const restartAnimation = () => {
    obstacleRef.current.classList.remove("block");
    obstacleRef.current.classList.add("block");
  };

  const startAnimation = () => {
    obstacleRef.current.classList.add("block");
  };

  const getscore = () => {
    score = 0;
  }

  useEffect(() => {
    startAnimation();
  }, []);

  useEffect(() => {
    const isAlive = setInterval(function () {
      const playerTop = parseInt(
        getComputedStyle(playerRef.current).getPropertyValue("top")
      );
      let obstacleLeft = parseInt(
        getComputedStyle(obstacleRef.current).getPropertyValue("left")
      );

      if (obstacleLeft < 60 && obstacleLeft > 0 && playerTop >= 360) {
        alert("Game Over! Your Score : " + score);
        setScore(0);
        restartAnimation();
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
        <div id="obstacle" ref={obstacleRef}/>
      </div>
      
    </div>
  );
}

/*
  -be kell rakni a pontokat
   és megcsinálni
  -kellenek a képek
  -méretre szabás
  -guggolás
  -High score
  -alertet javítani
  -több akadály (köztük csillaggal)
*/

export default Obstacle;