"use client";
import { TASK } from "@/types/Task.type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateTaskForm from "@/components/task-form";
import { FormData } from "@/types/formData.type";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import DeleteAlert from "@/components/DeleteAlert";

const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

// intersecting Route for TaskView
const Page = ({ params: { taskId } }: { params: { taskId: string } }) => {
  const [task, setTask] = useState<TASK>();
  const router = useRouter();

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
  }, [taskId]);

  async function updateTask(data: FormData) {
    try {
      const res = await axios.put(`${SERVER_ENDPOINT}/${taskId}`, data);
      setTask(res.data);
    } catch (error) {
      console.log("error in retriving data", error);
    }
  }

  async function handleDelete() {
    try {
      const res = await axios.delete(`${SERVER_ENDPOINT}/${taskId}`);
      console.log(res.data);

      router.back();
    } catch (error) {
      console.log("error in retriving data", error);
    }
  }

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
    <>
      <div className="h-screen w-full flex items-center justify-center z-50">
        
        <div className="bg-white  rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto space-y-4 z-10">
          <p>TaskDetails</p>
          <div className="flex justify-between">
            {task?.priority && (
              <div
                className={`inline-block px-2 py-1 rounded-full text-sm font-medium text-white ${
                  priorityColors[task.priority]
                }`}
              >
                {priorityMap[task.priority]}{" "}
              </div>
            )}
            <div className="w-pl-3 text-left text-sm ">
              <span className="font-medium">Due:</span>
              {task?.dueDate ? (
                format(task?.dueDate, "PPP")
              ) : (
                <span>NO Date specified</span>
              )}{" "}
            </div>
          </div>
          <h1 className="font-bold text-xl">{task?.title}</h1>

          <p>{task?.description}</p>
          <p>{task?.status}</p>

          <div className="flex gap-5 justify-end w-full">
            <CreateTaskForm
              type="update"
              onSubmit={updateTask}
              defaultValue={task}
            />
            <DeleteAlert handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
