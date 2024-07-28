"use client";
import { TASK } from "@/types/Task.type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTaskForm from "@/components/task-form";
import { FormData } from "@/types/formData.type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { redirect, useRouter } from "next/navigation";

const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
const Page = ({ params: { taskId } }: { params: { taskId: string } }) => {
  const [task, setTask] = useState<TASK>();
  const router=useRouter()
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

  async function handleDelete(id?: string) {
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
          <div className="flex gap-5">
            <CreateTaskForm
              type="update"
              onSubmit={updateTask}
              defaultValue={task}
            />
            <AlertDialog>
              <AlertDialogTrigger>
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-red-700 text-white rounded"
                >
                  DELETE
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(task?._id)}>YES
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
