import { useState, useEffect } from 'react';
import './App.css';
import { ListTasks } from './components/listTasks';
import { ProjectSelector } from './components/projectSelector';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'bttf_tasks_data';

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // corrupted data, start fresh
  }
  const defaultId = uuidv4();
  return {
    projects: [{ id: defaultId, name: 'General', tasks: [] }],
    activeProjectId: defaultId
  };
}

function App() {
  const [data, setData] = useState(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const activeProject = data.projects.find(p => p.id === data.activeProjectId) || data.projects[0];

  const setActiveProjectId = (id) => {
    setData(prev => ({ ...prev, activeProjectId: id }));
  };

  const addProject = (name) => {
    const newProject = { id: uuidv4(), name, tasks: [] };
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
      activeProjectId: newProject.id
    }));
  };

  const deleteProject = (id) => {
    setData(prev => {
      const newProjects = prev.projects.filter(p => p.id !== id);
      if (newProjects.length === 0) {
        const defaultId = uuidv4();
        return {
          projects: [{ id: defaultId, name: 'General', tasks: [] }],
          activeProjectId: defaultId
        };
      }
      return {
        projects: newProjects,
        activeProjectId: prev.activeProjectId === id ? newProjects[0].id : prev.activeProjectId
      };
    });
  };

  const addTask = (task) => {
    if (task.text.trim()) {
      task.text = task.text.trim();
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(p =>
          p.id === prev.activeProjectId
            ? { ...p, tasks: [task, ...p.tasks] }
            : p
        )
      }));
    }
  };

  const deleteTask = (taskId) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === prev.activeProjectId
          ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) }
          : p
      )
    }));
  };

  const checkTask = (taskId) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === prev.activeProjectId
          ? { ...p, tasks: p.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t) }
          : p
      )
    }));
  };

  return (
    <div className="App">
      <div className="scanlines"></div>
      <div className="container_taks_list">
        <div className="title_section">
          <div className="flux_indicator"></div>
          <h1>FLUX TASKS</h1>
          <p className="subtitle">Gestor de Tareas Temporal</p>
        </div>
        <ProjectSelector
          projects={data.projects}
          activeProjectId={data.activeProjectId}
          setActiveProjectId={setActiveProjectId}
          addProject={addProject}
          deleteProject={deleteProject}
        />
        <ListTasks
          tasks={activeProject ? activeProject.tasks : []}
          addTask={addTask}
          deleteTask={deleteTask}
          checkTask={checkTask}
        />
      </div>
    </div>
  );
}

export default App;
