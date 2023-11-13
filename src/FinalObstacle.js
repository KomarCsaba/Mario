import React, { useEffect, useRef, useState } from "react";
import "./FinalObstacle.css";

function FinalObstacle() {
  //ref to get 'player' html element in js
  const playerRef = useRef();
  //ref to get 'obstacle' html element in js
  const obstacleRef = useRef();
  const [score, setScore] = useState(0);

  //method to add 'jump' class every '300ms' as the class jump css has jumping animation of 0.3s(300ms).
  //so on each key press we need to add animation and remove animation
  const jump = () => {
    if (!!playerRef.current && playerRef.current.classList !== "jump") {
      playerRef.current.classList.add("jump");
      setTimeout(function () {
        playerRef.current.classList.remove("jump");
      }, 300);
    }
  };

  //useEffect to track whether player position and obstacle position is intersecting
  //if yes, then game over.
  useEffect(() => {
    const isAlive = setInterval(function () {
      // get current player Y position
      const playerTop = parseInt(
        getComputedStyle(playerRef.current).getPropertyValue("top")
      );

      // get current obstacle X position
      let obstacleLeft = parseInt(
        getComputedStyle(obstacleRef.current).getPropertyValue("left")
      );

      // detect collision
      if (obstacleLeft < 40 && obstacleLeft > 0 && playerTop >= 140) {
        // collision
        alert("Game Over! Your Score : " + score);
        setScore(0);
      } else {
        setScore(score + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  });

  //hook to call jump method on any keypress
  useEffect(() => {
    document.addEventListener("keydown", jump);
    return () => document.removeEventListener("keydown", jump);
  }, []);

  return (
    <div className="game">
      Score : {score}
      <div id="player" ref={playerRef}></div>
      <div id="obstacle" ref={obstacleRef}></div>
    </div>
  );
}

export default FinalObstacle;