"use client";
import Section from "@/components/Section";
import { DragDropContext } from "@hello-pangea/dnd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
interface TASKS {
  _id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS";
  priority?: "P1" | "P2" | "P3" | "P4"
  dueDate?: Date;
}

export default function Home() {
  const [data, setData] = useState<TASKS[]>([]);
  useEffect(() => {
    async function getData() {
      try {
        
        const res = await axios.get(`${SERVER_ENDPOINT}`);
        setData(res.data);
      } catch (error) {
        console.log("fetching error",error);
        
      }
    }
    getData();
  }, []);
  const onDragEnd = useCallback(() => {
      //drag end logic
  }, []);
  return (
    <main className="min-w-screen">
      <div className=" w-full flex-1 justify-center gap-10 text-center">
        <DragDropContext onDragEnd={onDragEnd}>
          {data.map(task => (
            <li key={task._id}>{task.title}</li>
          ))}
          <Section id="1" title="Ongoing" />
          <Section id="2" title="Complete" />
          <Section id="3" title="Pending" />
        </DragDropContext>
      </div>
    </main>
  );
}
