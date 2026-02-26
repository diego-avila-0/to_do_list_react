import React from "react";
import { TaskForm } from "./taskForm";
import '../css-custom/listTasks.css';
import { Task } from "./task";

export function ListTasks({ tasks, addTask, deleteTask, checkTask }) {
  return (
    <>
      <TaskForm addTask={addTask} />
      <div className="container_list_tasks">
        {tasks.map(t =>
          <Task
            key={t.id}
            id={t.id}
            text={t.text}
            done={t.done}
            deleteTask={deleteTask}
            checkTask={checkTask}
          />
        )}
        {tasks.length === 0 && (
          <div className="empty_state">
            No hay tareas registradas en esta linea temporal
          </div>
        )}
      </div>
    </>
  );
}
