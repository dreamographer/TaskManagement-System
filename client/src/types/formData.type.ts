export type FormData = {
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETE";
  priority: "P1" | "P2" | "P3" | "P4";
  dueDate: Date;
};