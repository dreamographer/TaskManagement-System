"use client"
import React from 'react'
import { RxAvatar } from "react-icons/rx";
import CreateTaskForm from './task-form';
import axios from 'axios';

const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

const Navigation = () => {
  // Creating new Task
  const createTask = async (data: FormData) => {
    try {
      await axios.post(`${SERVER_ENDPOINT}`, data);

      console.log("Task created successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="bg-white h-screen p-5">
      <div className='flex justify-center flex-col text-center item-center'>
        <RxAvatar className="text-4xl" />
        <CreateTaskForm onSubmit={createTask} type="CREATE Task" />
      </div>
    </div> 
  );
}

export default Navigation