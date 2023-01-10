import './App.css';
import logoFreecodecamp from './images/freecodecamp-logo.png';

function App() {
  return (
    <div className="App">
      <div className="container_logo_freecodecamp">
        <img src={logoFreecodecamp} alt="" className="logo_freecodecamp" />
      </div>
      <div className="container_taks_list">
        <h1>
          Mis tareas
        </h1>
        
      </div>
    </div>
  );
}

export default App;
