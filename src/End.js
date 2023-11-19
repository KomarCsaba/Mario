import "./Obstacle.js";

const EndDiv = ({score, highScore, onRestart}) => {

  const hatter = `url(${require('./assets/scorehatter.jpg')})`;

    const divStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: "9999",
      textAlign: "center",
      fontFamily: "Inconsolata",
      backgroundImage: hatter,
      backgroundSize: "100% 100%"
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