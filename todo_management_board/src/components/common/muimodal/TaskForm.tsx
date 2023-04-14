import { Button, DialogActions, Stack } from "@mui/material";
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

export const TaskForm = ({
  handleSubmit,
  handleClose,
  defaultValues = null,
}) => {
  return (
    <FormContainer
      onSuccess={handleSubmit}
      defaultValues={
        defaultValues
          ? defaultValues
          : {
              type: "todo",
            }
      }
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
          ]}
        />
      </Stack>

      <DialogActions
        sx={{
          mt: 1,
          px: 0,
        }}
      >
        <Button
          variant="contained"
          className="bg-error-500 opacity-70 hover:bg-error-600 hover:opacity-90"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          className="bg-success-300 opacity-70 hover:bg-success-300 hover:opacity-80"
          type="submit"
        >
          Save
        </Button>
      </DialogActions>
    </FormContainer>
  );
};
