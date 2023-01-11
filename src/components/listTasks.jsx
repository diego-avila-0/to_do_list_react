import React, { useState } from "react";
import { TaskForm } from "./taskForm";
import '../css-custom/listTasks.css';
import { Task } from "./task";

export function ListTasks(){

  const [tasks, setTasks] = useState([]);

  const addTask = task => {
    
    if (task.text.trim()) {
      task.text = task.text.trim()
      const newArrTasks = [task, ...tasks]
      setTasks(newArrTasks)
    }

  }

  const deleteTask = id => {
    const arrTasksNew = tasks.filter(t => t.id !== id)

    setTasks(arrTasksNew)

  }

  const checkTask = id => {
    const arrTasksNew = tasks.map(t => {
      if(t.id === id){
        t.done = !t.done
      }

      return t
    })

    setTasks(arrTasksNew)
  }

  return(
    <>
      <TaskForm addTask={addTask} />
      <div className="container_list_tasks">
        {
          tasks.map(t =>
            <Task
            key={t.id}
            id={t.id}
            text={t.text}
            done={t.done}
            deleteTask={deleteTask}
            checkTask={checkTask}
             />
          )
        }
      </div>
    </>
  );
}