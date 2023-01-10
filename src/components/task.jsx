import React from 'react';

export function Task({text}) {
  return(
    <div className="container_task">
      <div className="text_task">
        {text}
      </div>
      <div className="icon_task">
        
      </div>
    </div>
  )
}