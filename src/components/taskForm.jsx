import React, { useState } from "react";
import '../css-custom/taskForm.css';
import { v4 as uuidv4 } from 'uuid';

export function TaskForm(props) {

  const [input, setInput] = useState('');

  const manageChangeInput = input => {
    setInput(input.target.value)
  }

  const manageSendForm = ev => {

    ev.preventDefault()
    ev.target.querySelector('input').value = ''
    setInput('')

    const newTask = {
      id: uuidv4(),
      text: input,
      done: false
    }

    props.addTask(newTask)
  }

  return(
    <form
    onSubmit={manageSendForm}
    action="" className="taskForm">
      <input type="text" className="inputTask" placeholder="Escribe una tarea" name="text" onChange={manageChangeInput}/>
      <button type="submit" className="task_btn">Agregar tarea</button>
    </form>
  );
}