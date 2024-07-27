import { TASK } from "@/types/Task.type";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h1>{title}</h1>
        <Droppable droppableId="lists" type="list" direction="vertical">
          {provided => (
            <ol
              {...provided.droppableProps}
              ref={provided.innerRef}
              className=" gap-x-3 h-full"
            >
              <div className="flex-shrink-0 w-1" />
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border p-3"
                    >
                      {task.title}
                    </div>
                  )}
                </Draggable>
              ))}
            </ol>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
});

export default Section;
