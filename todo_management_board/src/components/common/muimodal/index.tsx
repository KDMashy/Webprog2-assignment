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
import {
  FormContainer,
  TextFieldElement,
  TextareaAutosizeElement,
  DateTimePickerElement,
  SelectElement,
} from "react-hook-form-mui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const MuiModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formData) => {
    const task = {
      id: 0,
      title: formData.title,
      description: formData.description,
      due_data: Date.parse(formData.due_date),
      type: formData.type,
      created_at: Date.now(),
    };

    // console.log(formatDate(formData.due_date));
    console.log(task);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Open Modal
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>TITLE</DialogTitle>

        <DialogContent>
          <FormContainer
            onSuccess={handleSubmit}
            defaultValues={{ type: "todo" }}
          >
            <Stack
              spacing={2}
              sx={{
                pt: 1,
              }}
            >
              <TextFieldElement required label="Title" name="title" fullWidth />

              <TextareaAutosizeElement
                label="Description"
                name="description"
                rows={3}
                resizeStyle="vertical"
                fullWidth
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePickerElement label="Date Picker" name="due_date" />
              </LocalizationProvider>

              <SelectElement
                label="Column"
                name="type"
                options={[
                  {
                    id: "todo",
                    label: "ToDo",
                  },
                  {
                    id: "in_progress",
                    label: "In progress",
                  },
                  {
                    id: "done",
                    label: "Done",
                  },
                  {
                    id: "expired",
                    label: "Expired",
                  },
                ]}
              />
            </Stack>

            <DialogActions
              sx={{
                mt: 1,
                px: 0,
              }}
            >
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancel
              </Button>

              <Button variant="contained" color="success" type="submit">
                Save
              </Button>
            </DialogActions>
          </FormContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function formatDate(date) {
  const unixTimeStamp = Date.parse(date);
  const parsedDate = new Date(unixTimeStamp);

  const formatedDate =
    parsedDate.getFullYear() +
    "." +
    String(parsedDate.getMonth() + 1).padStart(2, "0") +
    "." +
    String(parsedDate.getDate()).padStart(2, "0") +
    " " +
    String(parsedDate.getHours()).padStart(2, "0") +
    ":" +
    String(parsedDate.getMinutes()).padStart(2, "0");

  return formatedDate;
}
