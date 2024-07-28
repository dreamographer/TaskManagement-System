import { TASK } from "@/types/Task.type";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import Link from "next/link";
import React, { memo, useCallback } from "react";
import List from "./List";
interface Props {
  title: string;
  tasks: TASK[];
}

// Section for Status
const Section = memo(function Section({ title, tasks }: Props) {

  return (
    <div className="rounded-md relative bg-[#F4F4F4]  h-[35rem] min-w-[350px] overflow-y-scroll">
      <h1 className="bg-white p-3 rounded-lg text-left text-lg sticky  top-0">
        {title}
      </h1>
      <Droppable droppableId={title} type="card" direction="vertical">
        {provided => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className=" gap-x-3 h-full "
          >
            <div className="flex-shrink-0 flex flex-col gap-5 " />
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {provided => (
                  <Link href={`/dashboard/${task._id}`}>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-10"
                    >
                      <List task={task} />
                    </div>
                  </Link>
                )}
              </Draggable>
            ))}
          </ol>
        )}
      </Droppable>
    </div>
  );
});

export default Section;
