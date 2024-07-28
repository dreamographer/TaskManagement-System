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
  }, []);

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

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-30"></div>
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto space-y-4 z-10">
          <p>TaskDetails</p>
          <h1>{task?.title}</h1>
          <p>{task?.description}</p>
          <p>{task?.status}</p>
          <p>{task?.priority}</p>
          <Button
            variant={"outline"}
            className="w-[240px] pl-3 text-left font-normal"
          >
            {task?.dueDate ? (
              format(task?.dueDate, "PPP")
            ) : (
              <span>NO Date specified</span>
            )}{" "}
          </Button>
          <div className="flex gap-5">
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
