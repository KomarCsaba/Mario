import React, { useEffect, useRef, useState } from "react";
import "./Obstacle.css";

function Obstacle() {
  const playerRef = useRef();
  const obstacleRef = useRef();
  const starRef = useRef();
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

      const obstacleLeft = parseInt(
        getComputedStyle(obstacleRef.current).getPropertyValue("left")
      );

      const starLeft = parseInt(
        getComputedStyle(starRef.current).getPropertyValue("left")
      );

      if (obstacleLeft < 60 && obstacleLeft > 0 && playerTop >= 360) { //ekkor ütközik az akadályokkal
        alert(`Game Over! Your Score : ${score}`);
        setScore(0); //a score-t 0-ra állítja
        restartAnimation(); //újrakezdődik a játék
      }

      if (starLeft < 60 && starLeft > 0 && playerTop < 360) { //ekkor ütközik a csillaggal
        setScore(score + 1); //növeljük a pontokat 1-gyel
        restartGlide();
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
        <div className="flexDiv">
          <div id="obstacle" ref={obstacleRef}/>
          <div id="star" ref={starRef}/>
        </div>
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