import React, { useState } from "react";
import '../css-custom/projectSelector.css';

export function ProjectSelector({ projects, activeProjectId, setActiveProjectId, addProject, deleteProject }) {
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAdd = (ev) => {
    ev.preventDefault();
    if (newName.trim()) {
      addProject(newName.trim());
      setNewName('');
      setShowForm(false);
    }
  };

  return (
    <div className="project_selector">
      <div className="project_header">
        <span className="project_label">PROYECTOS</span>
        <button
          className="project_add_btn"
          onClick={() => setShowForm(!showForm)}
          title="Nuevo proyecto"
        >
          {showForm ? '×' : '+'}
        </button>
      </div>
      {showForm && (
        <form className="project_form" onSubmit={handleAdd}>
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Nombre del proyecto..."
            className="project_input"
            autoFocus
          />
          <button type="submit" className="project_submit">CREAR</button>
        </form>
      )}
      <div className="project_tabs">
        {projects.map(p => (
          <div
            key={p.id}
            className={`project_tab ${p.id === activeProjectId ? 'active' : ''}`}
            onClick={() => setActiveProjectId(p.id)}
          >
            <span className="project_name">{p.name}</span>
            <span className="project_count">{p.tasks.length}</span>
            {projects.length > 1 && (
              <span
                className="project_delete"
                onClick={(e) => { e.stopPropagation(); deleteProject(p.id); }}
                title="Eliminar proyecto"
              >
                ×
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
