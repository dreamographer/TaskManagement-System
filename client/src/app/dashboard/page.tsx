"use client";
import Section from "@/components/Section";
import CreateTaskForm from "@/components/task-form";
import { TASK } from "@/types/Task.type";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CiSettings } from "react-icons/ci";
const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

export default function Home() {
  // State for Different sections
  const [inProgress, setinProgress] = useState<TASK[]>([]);
  const [todo, setTodo] = useState<TASK[]>([]);
  const [complete, setcomplete] = useState<TASK[]>([]);

  // Socket connection for reatime updates
  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    // listning for the event and excicuting changes based on the event
    socket.on("TaskEvent", (data: { event: string; task: TASK }) => {
      switch (data.event) {
        case "UPDATED": {
          updateTasks(data.task);
          break;
        }
        case "CREATED": {
          addTasks(data.task);
          break;
        }
        case "DELETED": {
          deleteTasks(data.task);
          break;
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Initial fetching of data
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${SERVER_ENDPOINT}`);
        res.data.forEach((task: TASK) => {
          addTasks(task);
        });
      } catch (error) {
        console.log("fetching error", error);
      }
    }
    getData();
  }, []);

  // functions for socket sideEffects
  function addTasks(task: TASK) {
    switch (task.status) {
      case "TODO": {
        setTodo(prev => [...prev, task]);
        break;
      }
      case "IN_PROGRESS": {
        setinProgress(prev => [...prev, task]);
        break;
      }
      case "COMPLETE": {
        setcomplete(prev => [...prev, task]);
        break;
      }
    }
  }

  function deleteTasks(task: TASK) {
    switch (task.status) {
      case "TODO": {
        setTodo(prev => [...prev.filter(ele => ele._id != task._id)]);
        break;
      }
      case "IN_PROGRESS": {
        setinProgress(prev => [...prev.filter(ele => ele._id != task._id)]);
        break;
      }
      case "COMPLETE": {
        setcomplete(prev => [...prev.filter(ele => ele._id != task._id)]);
        break;
      }
    }
  }

  function updateTasks(task: TASK) {
    switch (task.status) {
      case "TODO": {
        const NotexistingTask = todo.find(ele => ele._id == task._id);
        if (!NotexistingTask) {
          removeExistingTask(task._id);
          addTasks(task);
        } else {
          setTodo(prev => [
            ...prev.map(ele => (ele._id == task._id ? task : ele)),
          ]);
        }
        break;
      }
      case "IN_PROGRESS": {
        const NotexistingTask = inProgress.find(ele => ele._id == task._id);
        if (!NotexistingTask) {
          removeExistingTask(task._id);
          addTasks(task);
        } else {
          setinProgress(prev => [
            ...prev.map(ele => (ele._id == task._id ? task : ele)),
          ]);
        }
        break;
      }
      case "COMPLETE": {
        const NotexistingTask = complete.find(ele => ele._id == task._id);
        if (!NotexistingTask) {
          removeExistingTask(task._id);
          addTasks(task);
        } else {
          setcomplete(prev => [
            ...prev.map(ele => (ele._id == task._id ? task : ele)),
          ]);
        }
        break;
      }
    }
  }

  // Fns for kanban status updation
  async function updateStatus(taskId: string, status: string) {
    try {
      if (status == "INPROGRESS") {
        status = "IN_PROGRESS";
      }
      const res = await axios.put(`${SERVER_ENDPOINT}/${taskId}`, { status });
      console.log(res.data);
    } catch (error) {
      console.log("error in retriving data", error);
    }
  }

  function removeExistingTask(id: string) {
    setTodo(prev => [...prev.filter(ele => ele._id != id)]);

    setinProgress(prev => [...prev.filter(ele => ele._id != id)]);

    setcomplete(prev => [...prev.filter(ele => ele._id != id)]);
  }

  const onDragEnd = useCallback((result: any) => {
    const { destination, source, type, draggableId } = result;
    if (!destination || destination.droppableId == source.draggableId) {
      return;
    }

    updateStatus(draggableId, destination.droppableId.toUpperCase());
  },[]);

  return (
    <main className="flex-1">
      <div className="p-5 text-xl  flex justify-between">
        <h1>TASK MANGER</h1>
        <div className="w-10 h-10 bg-white p-3">
          <CiSettings />
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className=" w-full flex flex-1 justify-center gap-10 text-center"
            >
              <Section tasks={todo} title="Todo" />
              <Section tasks={inProgress} title="InProgress" />
              <Section tasks={complete} title="Complete" />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
