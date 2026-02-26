import React, { useState } from "react";
import { TaskForm } from "./taskForm";
import '../css-custom/listTasks.css';
import { Task } from "./task";
import { v4 as uuidv4 } from 'uuid';

export function ListTasks({ tasks, onUpdateTasks }) {

  const [filter, setFilter] = useState('todas');

  const addTask = (task) => {
    if (task.text.trim()) {
      const newTask = {
        id: uuidv4(),
        text: task.text.trim(),
        done: false,
        priority: task.priority || 'media',
        createdAt: new Date().toISOString()
      };
      onUpdateTasks([newTask, ...tasks]);
    }
  };

  const deleteTask = (id) => {
    onUpdateTasks(tasks.filter(t => t.id !== id));
  };

  const checkTask = (id) => {
    onUpdateTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const editTask = (id, newText) => {
    onUpdateTasks(tasks.map(t =>
      t.id === id ? { ...t, text: newText } : t
    ));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pendientes') return !t.done;
    if (filter === 'completadas') return t.done;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.done).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <>
      <TaskForm addTask={addTask} />

      <div className="stats-bar">
        <span className="stat">
          <span className="stat-number">{totalTasks}</span> total
        </span>
        <span className="stat stat-pending">
          <span className="stat-number">{pendingTasks}</span> pendientes
        </span>
        <span className="stat stat-done">
          <span className="stat-number">{completedTasks}</span> completadas
        </span>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'todas' ? 'filter-active' : ''}`}
          onClick={() => setFilter('todas')}
        >
          Todas
        </button>
        <button
          className={`filter-btn ${filter === 'pendientes' ? 'filter-active' : ''}`}
          onClick={() => setFilter('pendientes')}
        >
          Pendientes
        </button>
        <button
          className={`filter-btn ${filter === 'completadas' ? 'filter-active' : ''}`}
          onClick={() => setFilter('completadas')}
        >
          Completadas
        </button>
      </div>

      <div className="container_list_tasks">
        {filteredTasks.length === 0 && (
          <div className="empty-state">
            {tasks.length === 0
              ? "No hay tareas. \u00a1Agrega una nueva!"
              : "No hay tareas en esta categor\u00eda."
            }
          </div>
        )}
        {filteredTasks.map(t =>
          <Task
            key={t.id}
            id={t.id}
            text={t.text}
            done={t.done}
            priority={t.priority || 'media'}
            createdAt={t.createdAt}
            deleteTask={deleteTask}
            checkTask={checkTask}
            editTask={editTask}
          />
        )}
      </div>
    </>
  );
}
