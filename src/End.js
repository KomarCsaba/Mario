import "./Obstacle.js";

const EndDiv = ({score, highScore, onRestart}) => {

  const hatter = `url(${require('./assets/scorehatter.jpg')})`;

    const divStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: "9999",
      textAlign: "center",
      fontFamily: "Inconsolata",
      backgroundImage: hatter,
      backgroundSize: "100vw 100vh"
    }

    const buttonStyle = {
      backgroundColor: '#4CAF50', 
      color: 'white',             
      padding: '10px 20px',       
      borderRadius: '8px',       
      border: 'none',             
      cursor: 'pointer',          
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease-in-out',
    };
  
    console.log("lefutottam");
  
    return (
      <div style = {divStyle}>
        <h1>score: {score}</h1>
        <h1>highscore: {highScore}</h1>
        <button style={buttonStyle} onClick = {onRestart}>Restart</button>
      </div>
    )
  };

export default EndDiv;