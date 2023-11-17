import "./Obstacle.js";

const EndDiv = ({score, highScore, onRestart}) => {

    const divStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "blue",
      zIndex: "9999",
      textAlign: "center",
      fontFamily: "Inconsolata",
    }
  
    console.log("lefutottam");
  
    return (
      <div style = {divStyle}>
        <h1>score: {score}</h1>
        <h1>highscore: {highScore}</h1>
        <button onClick = {onRestart}>Restart</button>
      </div>
    )
  };

  export default EndDiv;
  
/*
  -kellenek a képek
  -méretre szabás
  -guggolás
  -több akadály
  -gyorsulás ahogy nő a pontszám
  -score ne változzon restart képernyőnél (stop animation metódus?!)
*/