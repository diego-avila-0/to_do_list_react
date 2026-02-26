import React, { useState } from 'react';
import '../css-custom/task.css';
import { AiOutlineCloseCircle, AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';

const PRIORITY_LABELS = {
  alta: 'ALTA',
  media: 'MEDIA',
  baja: 'BAJA'
};

export function Task({ id, text, done, priority, createdAt, checkTask, deleteTask, editTask }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleConfirmEdit = () => {
    if (editText.trim()) {
      editTask(id, editText.trim());
      setIsEditing(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
  };

  return (
    <div className={`container_task ${done ? 'done' : ''} priority-${priority}`}>
      <div className={`priority-indicator priority-${priority}`}>
        {PRIORITY_LABELS[priority] || 'MEDIA'}
      </div>

      <div className="task-content" onClick={() => !isEditing && checkTask(id)}>
        {isEditing ? (
          <form onSubmit={(e) => { e.preventDefault(); handleConfirmEdit(); }} className="edit-form">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edit-input"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
            <AiOutlineCheck
              className="icon_task icon-confirm"
              onClick={(e) => { e.stopPropagation(); handleConfirmEdit(); }}
            />
          </form>
        ) : (
          <>
            <div className="text_task">{text}</div>
            {createdAt && <div className="task-date">{formatDate(createdAt)}</div>}
          </>
        )}
      </div>

      <div className="container_icons_task">
        {!isEditing && !done && (
          <AiOutlineEdit
            className="icon_task icon-edit"
            onClick={() => { setEditText(text); setIsEditing(true); }}
          />
        )}
        <AiOutlineCloseCircle
          className="icon_task icon-delete"
          onClick={() => deleteTask(id)}
        />
      </div>
    </div>
  );
}
