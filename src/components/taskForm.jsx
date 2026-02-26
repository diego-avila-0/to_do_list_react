import React, { useState } from "react";
import '../css-custom/taskForm.css';
import { v4 as uuidv4 } from 'uuid';

export function TaskForm(props) {
  const [input, setInput] = useState('');

  const manageChangeInput = input => {
    setInput(input.target.value);
  };

  const manageSendForm = ev => {
    ev.preventDefault();
    if (!input.trim()) return;

    const newTask = {
      id: uuidv4(),
      text: input,
      done: false
    };

    props.addTask(newTask);
    setInput('');
  };

  return (
    <form onSubmit={manageSendForm} className="taskForm">
      <input
        type="text"
        className="inputTask"
        placeholder="Ingresa una nueva tarea..."
        name="text"
        value={input}
        onChange={manageChangeInput}
      />
      <button type="submit" className="task_btn">
        <span className="btn_icon">+</span> Agregar
      </button>
    </form>
  );
}
