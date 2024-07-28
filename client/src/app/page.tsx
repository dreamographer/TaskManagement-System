"use client";
import Section from "@/components/Section";
import CreateTaskForm from "@/components/task-form";
import { TASK } from "@/types/Task.type";
import { DragDropContext } from "@hello-pangea/dnd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

export default function Home() {
  const [inProgress, setinProgress] = useState<TASK[]>([]);
  const [todo, setTodo] = useState<TASK[]>([]);
  const [complete, setcomplete] = useState<TASK[]>([]);
  const [allTasks, setAllTasks] = useState<TASK[]>([]);
  useEffect(() => {
    const socket = io("http://localhost:3001"); 

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("TaskEvent", (data: { event: string; task: TASK }) => {
      console.log("Received message:", data);
      switch (data.event) {
        case "UPDATED": {
          updateTasks(data.task)
          break;
        }
        case "CREATED": {
          addTasks(data.task);
          break;
        }
        case "DELETED": {
          deleteTasks(data.task)
          break;
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${SERVER_ENDPOINT}`);
        res.data.forEach((task:TASK) => {
          addTasks(task);
        });
      } catch (error) {
        console.log("fetching error", error);
      }
    }
    getData();
  }, []);

  function addTasks(task:TASK) {
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

  function deleteTasks(task:TASK) {
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
  function updateTasks(task:TASK) {
      switch (task.status) {
        case "TODO": {
          setTodo(prev => [...prev.map(ele => ele._id == task._id?task:ele)]);
          break;
        }
        case "IN_PROGRESS": {
          setinProgress(prev => [...prev.map(ele => ele._id == task._id?task:ele)]);
          break;
        }
        case "COMPLETE": {
          setcomplete(prev => [...prev.map(ele => ele._id == task._id?task:ele)]);
          break;
        }
      }
  }

  return (
    <main className="min-w-screen">
      <div className=" w-full flex flex-1 justify-center gap-10 text-center">
        <Section tasks={todo} title="Todo" />
        <Section tasks={inProgress} title="InProgress" />
        <Section tasks={complete} title="Complete" />
        <CreateTaskForm />
      </div>
    </main>
  );
}
