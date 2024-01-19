import { Container } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";
import EditTask from "./components/EditTask/EditTask";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./useLocalStorageHook";
import { deleteTask, changeTask } from "./tasks.utils";


export type Task = {
  id: string;
  value: string;
};

export type UrgentTask = Task & {
  urgency: boolean;
};


const App = () => {
  const [tasks, setTasks] = useLocalStorage<Task[] | UrgentTask[]>("TASKS", [
    {
      id: uuidv4(),
      value: "TS",
    },
    {
      id: uuidv4(),
      value: "JS",
    },
    {
      id: uuidv4(),
      value: "Generics",
      urgency: true
    } as UrgentTask,
  ]);

  const changeTasks = (tasks: Task[] | UrgentTask[]) => {
    setTasks(tasks);
  }  

  const handleTaskDelete = (id: string) => {
    setTasks(deleteTask(id, tasks));
  };

  const handleTaskChange = (id: string, newValue: string) => {
    newValue.length > 0 && setTasks(changeTask(id, tasks, newValue));
  };

  const handleAddTask = <T extends UrgentTask | Task>(task: T) => {
    if ("urgency" in task) {
      setTasks([
        ...tasks,
        { id: task.id, value: task.value, urgency: task.urgency },
      ]);
    } else {
      setTasks([...tasks, { id: task.id, value: task.value }]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: "20px" }}>
      <Routes>
        <Route
          path="/"
          element={<Home changeTasks={changeTasks} tasks={tasks} deleteTask={handleTaskDelete} />}
        />
        <Route path="/new" element={<AddTaskForm addTask={handleAddTask} />} />
        <Route
          path="/:id"
          element={
            <EditTask tasks={tasks} handleTaskChange={handleTaskChange} />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};

export default App;
