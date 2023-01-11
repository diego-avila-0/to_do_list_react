import './App.css';
import { ListTasks } from './components/listTasks';

function App() {
  return (
    <div className="App">
      <div className="container_taks_list">
        <h1>
          Mis tareas
        </h1>
        <ListTasks />
      </div>
    </div>
  );
}

export default App;
