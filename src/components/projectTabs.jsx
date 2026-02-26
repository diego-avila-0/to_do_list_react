import React, { useState } from "react";
import '../css-custom/projectTabs.css';
import { AiOutlinePlus, AiOutlineClose, AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';

export function ProjectTabs({ projects, activeProjectId, onSelectProject, onAddProject, onDeleteProject, onRenameProject }) {

  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAdd = (ev) => {
    ev.preventDefault();
    if (newName.trim()) {
      onAddProject(newName.trim());
      setNewName('');
      setShowInput(false);
    }
  };

  const handleStartEdit = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  const handleConfirmEdit = (id) => {
    if (editName.trim()) {
      onRenameProject(id, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="project-tabs">
      <div className="tabs-list">
        {projects.map(p => (
          <div
            key={p.id}
            className={`tab ${p.id === activeProjectId ? 'tab-active' : ''}`}
            onClick={() => onSelectProject(p.id)}
          >
            {editingId === p.id ? (
              <form onSubmit={(e) => { e.preventDefault(); handleConfirmEdit(p.id); }} className="tab-edit-form">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="tab-edit-input"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
                <AiOutlineCheck
                  className="tab-icon tab-confirm"
                  onClick={(e) => { e.stopPropagation(); handleConfirmEdit(p.id); }}
                />
              </form>
            ) : (
              <>
                <span className="tab-name">{p.name}</span>
                <div className="tab-actions">
                  <AiOutlineEdit
                    className="tab-icon tab-edit"
                    onClick={(e) => { e.stopPropagation(); handleStartEdit(p.id, p.name); }}
                  />
                  {projects.length > 1 && (
                    <AiOutlineClose
                      className="tab-icon tab-delete"
                      onClick={(e) => { e.stopPropagation(); onDeleteProject(p.id); }}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        ))}

        {showInput ? (
          <form onSubmit={handleAdd} className="tab-new-form">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nombre..."
              className="tab-new-input"
              autoFocus
            />
            <button type="submit" className="tab-new-btn">
              <AiOutlineCheck />
            </button>
            <button type="button" className="tab-cancel-btn" onClick={() => { setShowInput(false); setNewName(''); }}>
              <AiOutlineClose />
            </button>
          </form>
        ) : (
          <button className="tab-add" onClick={() => setShowInput(true)}>
            <AiOutlinePlus />
          </button>
        )}
      </div>
    </div>
  );
}
