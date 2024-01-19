import { Box, Button, List, Typography } from "@mui/material";
import { Task, UrgentTask } from "../../App";
import TaskItem from "../TaskItem/TaskItem";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

type HomePropTypes = {
  tasks: Task[] | UrgentTask[];
  deleteTask: (id: string) => void;
  changeTasks: (tasks: Task[] | UrgentTask[]) => void;
};

const Home = ({ tasks, deleteTask, changeTasks }: HomePropTypes) => {
  const [isEditing, setIsEditing] = useState(false);
  const [shake, setShake] = useState(true);
  const navigate = useNavigate();

  const handleDragDrop = (results) => {
    const { source, destination } = results;
    console.log(source, destination);

    if (!destination) return;
    if (source.index === destination.index) return;

    const newTasks = [...tasks];
    const [deletedItem] = newTasks.splice(source.index, 1);

    const changedTasks = [...newTasks];
    changedTasks.splice(destination.index, 0, deletedItem);

    changeTasks(changedTasks);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button variant="outlined" onClick={() => setIsEditing(!isEditing)}>
          {!isEditing ? "Edit List" : "Set List"}
        </Button>
        <Typography sx={{ textAlign: "center" }} variant="h4">
          Tasks List:
        </Typography>
        <Button onClick={() => navigate("/new")} variant="contained">
          Add Task
        </Button>
      </Box>
      {!isEditing ? (
        <Box sx={{ padding: "50px" }}>
          <List sx={{ minWidth: "450px", marginTop: "20px" }}>
            {tasks.map((el) => (
              <TaskItem key={el.id} task={el} deleteTask={deleteTask} />
            ))}
          </List>
        </Box>
      ) : (
        <DragDropContext onDragEnd={handleDragDrop}>
          <Box
            onMouseEnter={() => setShake(false)}
            onMouseLeave={() => setShake(true)}
            style={{ padding: "50px" }}
          >
            <Droppable droppableId="ROOT" type="group">
              {(provided) => {
                return (
                  <List
                    sx={{ minWidth: "450px", marginTop: "20px" }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.map((el, index) => (
                      <Draggable draggableId={el.id} key={el.id} index={index}>
                        {(provided) => {
                          return (
                            <div
                              className={
                                shake ? "cssanimation coolVerticalShake" : ""
                              }
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <TaskItem
                                key={el.id}
                                task={el}
                                deleteTask={deleteTask}
                              />
                            </div>
                          );
                        }}
                      </Draggable>
                    ))}
                  </List>
                );
              }}
            </Droppable>
          </Box>
        </DragDropContext>
      )}
    </Box>
  );
};

export default Home;
