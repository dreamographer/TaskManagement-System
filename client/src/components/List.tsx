"user client";
import { TASK } from "@/types/Task.type";
import React from "react";

import { format } from "date-fns";

const List = ({ task }: { task: TASK }) => {
  const priorityMap = {
    P1: "High",
    P2: "Medium",
    P3: "Low",
    P4: "Very low",
  };
  const priorityColors = {
    P1: "bg-red-500",
    P2: "bg-yellow-400",
    P3: "bg-green-400",
    P4: "bg-gray-300",
  };

  return (
    <div className="w-[301px] h-[180px] p-5 mb-10 flex flex-col gap-3  bg-white m-5 ">
      <div className="flex justify-between">
        {task.priority && (
          <div
            className={`inline-block px-2 py-1 rounded-full text-sm font-medium text-white ${
              priorityColors[task.priority]
            }`}
          >
            {priorityMap[task.priority]}{" "}
          </div>
        )}
        <div className="w-pl-3 text-left text-sm">
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
        <p className=" line-clamp-3">{task.description}</p>
      </div>
    </div>
  );
};

export default List;
