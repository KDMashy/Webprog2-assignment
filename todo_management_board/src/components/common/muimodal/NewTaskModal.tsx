import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TaskForm } from "./TaskForm";
import { Task } from "@/types/TaskInterface";

export const NewTaskModal = ({
  tasks,
  setTasks,
}: {
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
      newDueDate = null;
    }

    let id = localStorage.getItem("task_id");

    if (!id) {
      localStorage.setItem("task_id", JSON.stringify(0));
    } else {
      localStorage.setItem("task_id", JSON.stringify(parseInt(id) + 1));
    }

    const newTask: Task = {
      id: parseInt(id) + 1,
      title: formData.title,
      description: formData.description,
      due_date: newDueDate,
      type: formData.type,
      created_at: Date.now().toString(),
      updated_at: Date.now().toString(),
    };

    setTasks([...tasks, newTask]);

    handleClose();
  };

  return (
    <div>
      <Button
        className="bg-light-400 hover:bg-light-400 hover:opacity-50"
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          my: 2,
        }}
      >
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>

        <DialogContent>
          <TaskForm handleClose={handleClose} handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
