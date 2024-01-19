import { Navigate, useParams } from "react-router-dom";
import { Task } from "../../App";
import { Box, TextField, Typography, styled } from "@mui/material";
import BackButton from "../BackButton/BackButton";

type EditTaskPropTypes = {
  tasks: Task[];
  handleTaskChange: (id: string, newValue: string) => void;
};

const EditTask = ({ tasks, handleTaskChange }: EditTaskPropTypes) => {
  const { id } = useParams();
  const idToFind = id?.slice(1, id.length);
  const task = tasks.find((task) => task.id === idToFind);
  if (task == null) return <Navigate to="/" replace />;
  console.log(task);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ marginBottom: "20px" }} variant="h4">
        Edit task:
      </Typography>
      <CssTextField
        fullWidth
        label={task.value}
        color="success"
        id="fullWidth"
        onChange={(e) => handleTaskChange(task.id, e.target.value)}
      />
      <BackButton />
    </Box>
  );
};

export default EditTask;




const CssTextField = styled(TextField)({
  '& input': {
    color: 'whitesmoke'
  },
  '& label': {
    color: 'whitesmoke'
  },
  '& input: label': {
    color: 'whitesmoke'
  },
  '& label.Mui-focused': {
    color: 'whitesmoke',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});
