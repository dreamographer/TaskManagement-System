import { TASK } from "@/types/Task.type";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import Link from "next/link";
import React, { memo, useCallback } from "react";
interface Props {
  title: string;
  tasks: TASK[];
}
const Section = memo(function Section({ title, tasks }: Props) {
  const onDragEnd = useCallback(() => {
    //drag end logic
  }, []);
  return (
    <div>
      <h1>{title}</h1>
      <Droppable droppableId={title} type="card" direction="vertical">
        {provided => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className=" gap-x-3 h-full"
          >
            <div className="flex-shrink-0 w-1" />
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index} >
                {provided => (
                  <Link href={`/dashboard/${task._id}`}>
                    {" "}
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border p-3"
                    >
                      {task.title}
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
