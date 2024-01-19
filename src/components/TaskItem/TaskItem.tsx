import { ListItem, Button, ListItemText, Box } from "@mui/material";
import { Task, UrgentTask } from "../../App";
import { useNavigate } from "react-router-dom";


type TaskItemPropTypes<T> = {
  task: T;
  deleteTask: (id: string) => void;
};

const TaskItem = <T extends Task | UrgentTask>({
  task,
  deleteTask,
}: TaskItemPropTypes<T>) => {
  const navigate = useNavigate();
  const isUrgencyTask = (task: Task | UrgentTask): task is UrgentTask => {
    return (task as UrgentTask).urgency !== undefined;
  };
  return (
    <ListItem
      disablePadding
      sx={{
        border: "1px solid whitesmoke",
        borderRadius: "5px",
        marginBottom: "30px",
        padding: "5px 20px",
        position: 'relative'
      }}
    >
      <ListItemText primary={task.value} />
      <Box>
        <Button onClick={() => navigate(`:${task.id}`)}>Edit</Button>
        <Button onClick={() => deleteTask(task.id)}>Delete</Button>
        {isUrgencyTask(task) && (
          <span
            style={{
              cursor: 'pointer',
              position: "absolute",
              backgroundColor: "red",
              padding: "5px",
              borderRadius: "50px",
              fontSize: '12px',
              top: '-10px'
            }}
          >
            URGENT
          </span>
        )}
      </Box>
    </ListItem>
  );
};

export default TaskItem;
