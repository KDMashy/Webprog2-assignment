import { Task } from "@/types/TaskInterface";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "./Button";
import { checkDate } from "@/helpers/Helpers";

function TaskContainer({
  task,
  removeTask,
  newColAsssign,
}: {
  task: Task;
  removeTask: (task) => void;
  newColAsssign: (task, type) => void;
}) {
  const returnNormalDate = (date) => {
    if (!date) return "-";
    return new Date(parseInt(date)).toLocaleDateString("sv-SE");
  };

  const options = [
    {
      label: "To Do",
      type: "todo",
    },
    {
      label: "In Progress",
      type: "in_progress",
    },
    {
      label: "Done",
      type: "done",
    },
  ];

  const getOptions = () => {
    let returnOptions = [
      options?.filter((option) => option?.type === task?.type)[0],
    ];
    returnOptions = [
      ...returnOptions,
      ...options?.filter((option) => option?.type !== task?.type),
    ];
    return returnOptions;
  };

  const handleSelect = (e) => {
    let selected: any = e?.target;
    if (task?.type !== selected?.value) newColAsssign(task, selected?.value);
  };

  return (
    <div className="px-3 py-5 bg-light-200 bg-opacity-60 rounded-md w-[99%] mx-auto my-3 text-center relative transition-all ease-in-out duration-150 hover:bg-opacity-70">
      <div className="absolute right-1 top-1">
        <Button
          icon={<DeleteIcon />}
          circular
          clickHandler={() => removeTask(task)}
        />
      </div>
      <h3 className="text-lg font-semibold pt-1 pb-3">{task?.title}</h3>
      <p className="text-sm py-2 break-words">{task?.description}</p>
      <div className="flex justify-between w-full">
        <p className="pr-2">Updated: </p>
        <p className="">{returnNormalDate(task?.updated_at)}</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="pr-2">Created: </p>
        <p className="">{returnNormalDate(task?.created_at)}</p>
      </div>
      {task?.due_date ? (
        <div className="flex justify-between w-full">
          <p className="pr-2">Expiration: </p>
          <p className="">{returnNormalDate(task?.due_date)}</p>
        </div>
      ) : (
        <></>
      )}
      <div>
        {!checkDate(task?.due_date ?? null) ? (
          <select
            name="task-col-selector"
            id="task-col-selector-id"
            className="px-3 py-1 font-medium border-2 border-dark-200 border-opacity-30 rounded-md mt-3"
            onClick={(e) => handleSelect(e)}
          >
            {getOptions()?.map((option, index) => (
              <option key={`${index}-${option?.label}`} value={option?.type}>
                {option?.label}
              </option>
            ))}
          </select>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default TaskContainer;
