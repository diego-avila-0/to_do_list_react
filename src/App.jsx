import React, { useState, useEffect } from 'react';
import './App.css';
import { ListTasks } from './components/listTasks';
import { ProjectTabs } from './components/projectTabs';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'bttf_todo_data';

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error cargando datos:', e);
  }
  return null;
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error guardando datos:', e);
  }
}

function getDefaultState() {
  const defaultId = uuidv4();
  return {
    projects: [
      { id: defaultId, name: 'General', tasks: [] }
    ],
    activeProjectId: defaultId
  };
}

function App() {
  const [state, setState] = useState(() => {
    return loadFromStorage() || getDefaultState();
  });

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const activeProject = state.projects.find(p => p.id === state.activeProjectId)
    || state.projects[0];

  const handleSelectProject = (id) => {
    setState(prev => ({ ...prev, activeProjectId: id }));
  };

  const handleAddProject = (name) => {
    const newProject = { id: uuidv4(), name, tasks: [] };
    setState(prev => ({
      projects: [...prev.projects, newProject],
      activeProjectId: newProject.id
    }));
  };

  const handleDeleteProject = (id) => {
    setState(prev => {
      const filtered = prev.projects.filter(p => p.id !== id);
      const newActive = prev.activeProjectId === id
        ? filtered[0]?.id
        : prev.activeProjectId;
      return { projects: filtered, activeProjectId: newActive };
    });
  };

  const handleRenameProject = (id, newName) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, name: newName } : p
      )
    }));
  };

  const updateProjectTasks = (projectId, newTasks) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === projectId ? { ...p, tasks: newTasks } : p
      )
    }));
  };

  return (
    <div className="App">
      <div className="bttf-header">
        <div className="bttf-glow-line"></div>
        <h1 className="bttf-title">
          <span className="title-line1">MIS</span>
          <span className="title-line2">TAREAS</span>
        </h1>
        <p className="bttf-subtitle">Organizador Temporal de Tareas</p>
        <div className="bttf-glow-line"></div>
      </div>

      <div className="container_taks_list">
        <ProjectTabs
          projects={state.projects}
          activeProjectId={activeProject.id}
          onSelectProject={handleSelectProject}
          onAddProject={handleAddProject}
          onDeleteProject={handleDeleteProject}
          onRenameProject={handleRenameProject}
        />
        <ListTasks
          tasks={activeProject.tasks}
          onUpdateTasks={(newTasks) => updateProjectTasks(activeProject.id, newTasks)}
        />
      </div>
    </div>
  );
}

export default App;
