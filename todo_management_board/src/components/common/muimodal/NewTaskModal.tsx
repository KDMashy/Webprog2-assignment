import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { Task } from "@/types/TaskInterface";
import { formatDate } from "@/helpers/Helpers";

export const NewTaskModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formData) => {
    const task: Task = {
      id: 0,
      title: formData.title,
      description: formData.description,
      due_date: formatDate(Date.parse(formData.due_date)),
      type: formData.type,
      created_at: formatDate(Date.now()),
      updated_at: formatDate(Date.now()),
    };

    console.log(formData.due_date);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Open Modal
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>TITLE</DialogTitle>

        <DialogContent>
          <TaskForm handleClose={handleClose} handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
