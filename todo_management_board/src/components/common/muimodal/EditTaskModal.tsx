import { useState } from "react";
import { IconButton, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { TaskForm } from "./TaskForm";
import EditIcon from "@mui/icons-material/Edit";

import { Task } from "@/types/TaskInterface";

export const EditTaskModal = ({
  task,
  tasks,
  setTasks,
}: {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formData) => {
    let newDueDate;
    if (formData.due_date) {
      newDueDate = Date.parse(formData.due_date).toString();
    } else {
      newDueDate = task.due_date;
    }

    const newTask = {
      id: task.id,
      title: formData.title,
      description: formData.description,
      due_date: newDueDate,
      type: formData.type,
      created_at: task.created_at,
      updated_at: Date.now().toString(),
    };

    let tmp = tasks?.filter((item) => item?.id !== task.id);
    tmp.push(newTask);

    setTasks(tmp);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>TITLE</DialogTitle>

        <DialogContent>
          <TaskForm
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            defaultValues={task}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
