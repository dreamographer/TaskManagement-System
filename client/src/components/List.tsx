"user client"
import { TASK } from '@/types/Task.type'
import React from 'react'
import { Button } from './ui/button';
import { format } from 'date-fns';

const List = ({task}:{task:TASK}) => {
  return (
    <div className="h-60 p-7  bg-white m-5 ">
      <div className="flex justify-between">
        <div>{task.priority} </div>
        <div
          className="w-pl-3 text-left font-normal"
        >
          {task?.dueDate ? (
            format(task?.dueDate, "PPP")
          ) : (
            <span>NO Date specified</span>
          )}{" "}
        </div>
      </div>
      <div>
        <h2 className="font-bold">{task.title}</h2>
      </div>
      <div>
        <p>{task.description}</p>
      </div>
    </div>
  );
}

export default List