import "./Obstacle.js";

const EndDiv = ({score, highscore}) => {

    const divStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "blue",
      zIndex: "9999",
      textAlign: "center",
    }
  
    console.log("lefutottam");
  
    return (
      <div style = {divStyle}>
        <h1>score: {score}</h1>
        <h1>highscore: {highscore}</h1>
      </div>
    )
  };

  export default EndDiv;