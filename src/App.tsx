import './App.css';
import Character from './Character';
function App()  {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Starwar Character</h2>
          <Character url="https://swapi.dev/api/people/"></Character>
        </div>
      </header>
    </div>
  );
}

export default App;
