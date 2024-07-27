import { TaskPriority } from "./taskPriority.enum";
import { TaskStatus } from "./taskStatus.enum";
import { ObjectId } from "mongoose";

export type EventData = {
  event: string;
  task: {
    _id: ObjectId,
    title?: string,
    description?: string,
    status?: TaskStatus,
    priority?:TaskPriority,
    section?:string,
    dueDate?:Date
  };
};
