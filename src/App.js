import './App.css';
import Plan from "./Obstacle";
import Score from "./Score";
function App() {
  for (let index = 1; index > 0; index++) {
    let random1 = Math.floor(Math.random() * 3) + 1;
    let random2 = Math.floor(Math.random() * 3) + 1;
    let random3 = Math.floor(Math.random() * 3) + 1;
    return ( 
      <div className='component App'>
        <div className='component'>
          <Plan id={random1}/>
        </div>

        <div className='component'>
          <Score/>
        </div>

        <div className='component'>
          <Plan id={random2}/>
        </div>

        <div className='component'>
          <Plan id={random3}/>
        </div>
      </div>
    ); 
  }
}

export default App;