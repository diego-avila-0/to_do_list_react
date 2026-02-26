import React from 'react';
import '../css-custom/task.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export function Task({ id, text, done, checkTask, deleteTask }) {
  return(
    <div className={`container_task ${ done ? 'done' : ''}`}>
      <div className="text_task" onClick={() => checkTask(id)}>
        {text}
      </div>
      <div className="container_icons_task" onClick={() => deleteTask(id)}>
        <AiOutlineCloseCircle  className='icon_task'/>
      </div>
    </div>
  )
}