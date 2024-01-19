import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import BackButton from "../BackButton/BackButton";
import { Task, UrgentTask } from "../../App";
import { v4 as uuidv4 } from "uuid";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

type AddTaskFormPropsType = {
  addTask: (task: Task | UrgentTask) => void;
};

const AddTaskForm = ({ addTask }: AddTaskFormPropsType) => {
  const [task, setTask] = useState<string>("");
  const [urgent, setUrgent] = useState(false);

  const handleTaskGeneration = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(task.length > 0) {
      if (urgent) {
        addTask({ id: uuidv4(), value: task, urgency: true } as UrgentTask);
      } else {
        addTask({ id: uuidv4(), value: task } as Task);
      }
      setTask('')
    } else {
      return task
    }
  };

  return (
    <>
      <BackButton />
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Add Task Form
      </Typography>
      <form
        style={{ display: "flex", alignItems: "center" }}
        onSubmit={handleTaskGeneration}
      >
        <input
          style={{
            padding: "5px 15px",
            color: "#242424",
            width: "70%",
            fontSize: "1.2em",
          }}
          type="text"
          placeholder="Task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <FormControlLabel
          labelPlacement="top"
          control={
            <Checkbox
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              {...label}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
            />
          }
          label=""
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
        <span style={{ position: 'fixed', top: '120px', fontSize: '.8em' }}>* set ckeckbox state to <span style={{ color: 'red', textTransform: 'uppercase' }}>'checked'</span> if you want your task to be urgent</span>
      </form>
    </>
  );
};

export default AddTaskForm;
