import React, { useState } from "react";
import '../css-custom/taskForm.css';

export function TaskForm({ addTask }) {

  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('media');

  const manageSendForm = (ev) => {
    ev.preventDefault();
    if (input.trim()) {
      addTask({ text: input, priority });
      setInput('');
      setPriority('media');
    }
  };

  return (
    <form onSubmit={manageSendForm} className="taskForm">
      <div className="form-row">
        <input
          type="text"
          className="inputTask"
          placeholder="Escribe una tarea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="task_btn">Agregar</button>
      </div>
      <div className="priority-selector">
        <span className="priority-label">Prioridad:</span>
        <button
          type="button"
          className={`priority-btn priority-baja ${priority === 'baja' ? 'priority-selected' : ''}`}
          onClick={() => setPriority('baja')}
        >
          Baja
        </button>
        <button
          type="button"
          className={`priority-btn priority-media ${priority === 'media' ? 'priority-selected' : ''}`}
          onClick={() => setPriority('media')}
        >
          Media
        </button>
        <button
          type="button"
          className={`priority-btn priority-alta ${priority === 'alta' ? 'priority-selected' : ''}`}
          onClick={() => setPriority('alta')}
        >
          Alta
        </button>
      </div>
    </form>
  );
}
