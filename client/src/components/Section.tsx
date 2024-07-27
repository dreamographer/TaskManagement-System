import {DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React from "react";
interface Props {
  title: string;
  id:string
}
const Section = ({ title,id }: Props) => {
  return (
    <div>
      <h1>{title}</h1>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {provided => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            <div className="flex-shrink-0 w-1" />
            <Draggable draggableId={id} index={0}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  Hello
                </div>
              )}
            </Draggable>
          </ol>
        )}
      </Droppable>
      <div className="border">item</div>
    </div>
  );
};

export default Section;
