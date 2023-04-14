import { checkDate } from "@/helpers/Helpers";
import { Task } from "@/types/TaskInterface";
import React from "react";
import TaskContainer from "./TaskContainer";

function TaskColumn({
  color = "default",
  tasks = [],
  type = "todo",
  removeTask,
  newColAsssign,
}: {
  color: "error" | "success" | "warning" | "default";
  tasks?: Task[];
  type: "todo" | "in_progress" | "done" | "expired";
  removeTask: (task) => void;
  newColAsssign: (task, type) => void;
}) {
  const getColor = {
    error: "bg-error-300",
    success: "bg-success-300",
    warning: "bg-warning-300",
    default: "bg-light-400",
  };

  const getTitle = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
    expired: "Expired",
  };

  return (
    <div
      className={`${getColor[color]} bg-opacity-40 min-h-[60px] xl:w-[270px] lg:w-[240px] sm:w-[300px] w-[280px] px-4 pt-2 pb-5 max-w-[800px] overflow-y-auto rounded-md`}
    >
      <h2 className="mx-auto w-[70%] border-b-2 border-dark-300 text-xl font-semibold pb-3 mb-8 pt-2 text-center border-opacity-50">
        {getTitle[type]}
      </h2>
      {tasks
        ?.filter((task) =>
          type === "expired"
            ? checkDate(task?.due_date ?? null)
            : task?.type === type && !checkDate(task?.due_date ?? null)
        )
        ?.map((task) => (
          <TaskContainer
            key={task?.id}
            task={task}
            removeTask={removeTask}
            newColAsssign={newColAsssign}
          />
        ))}
    </div>
  );
}

export default TaskColumn;
