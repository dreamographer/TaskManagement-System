"use client";
import { TASK } from "@/types/Task.type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTaskForm from "@/components/task-form";
import { FormData } from "@/types/formData.type";
const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
const Page = ({ params: { taskId } }: { params: { taskId: string } }) => {
  const [task, setTask] = useState<TASK>();
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${SERVER_ENDPOINT}/${taskId}`);
        setTask(res.data);
      } catch (error) {
        console.log("error in retriving data", error);
      }
    }
    getData();
  }, []);
  async function updateTask(data: FormData) {
    try {
      const res = await axios.put(`${SERVER_ENDPOINT}/${taskId}`,data);
      setTask(res.data)
    } catch (error) {
      console.log("error in retriving data", error);
    }
  }

  function handleDelete() {}
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto space-y-4 ">
        <p>TaskDetails</p>
        <h1>{task?.title}</h1>
        <p>{task?.description}</p>
        <div className="flex gap-5">
              <CreateTaskForm type="update" onSubmit={updateTask} defaultValue={task} />
        
          <button
            className="bg-red-600 text-white px-3 rounded"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
