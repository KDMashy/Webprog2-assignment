import { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { TaskForm } from "./TaskForm";
import EditIcon from "@mui/icons-material/Edit";

import { Task } from "@/types/TaskInterface";

export const EditTaskModal = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formData) => {
    const result = {
      id: task.id,
      title: formData.title,
      description: formData.description,
      due_data: Date.parse(formData.due_date),
      type: formData.type,
      updated_at: Date.now(),
    };

    console.log(result);
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
