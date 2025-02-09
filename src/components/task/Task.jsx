import React, { useEffect, useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, Toaster } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { debounce } from "lodash";
import { Button, Card, IconButton, Tooltip } from "@mui/material";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import "../../css/switchstyle.css";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import LogoutIcon from '@mui/icons-material/Logout';



const Task = () => {
  const [edit, setEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [taskData, setTaskData] = useState(() => {
  const storedData = JSON.parse(localStorage.getItem("task_data"));
    return storedData || [];
  });
  const [taskvalues, setTaskvalues] = useState({
    task_id: "",
    task_name: "",
    task_status: "",
    due_date:"",
  });


  const handleEdit = (task) => setEdit(task);

  const handleUpdate = () => {
    if (!edit.task.trim()) {
      toast.error("Task name cannot be empty.");
      return;
    }
    const updatedTasks = taskData.map((task) =>
      task.id === edit.id ? edit : task
    );
    setTaskData(updatedTasks);
    setEdit(null);
    localStorage.setItem("task_data", JSON.stringify(updatedTasks));
    toast.success("Task updated successfully!");
  };

  const handleCancel = () => setEdit(null);

  const handleDelete = (taskId) => {
    const updatedTasks = taskData.filter((task) => task.id !== taskId);
    setTaskData(updatedTasks);
    localStorage.setItem("task_data", JSON.stringify(updatedTasks));
    toast.success("Task deleted successfully!");
  };

  const taskhandleChange = (e) =>
    setTaskvalues({ ...taskvalues, task_name: e.target.value });

  const statushandleChange = (e) =>
    setTaskvalues({ ...taskvalues, task_status: e.target.value });

  const SaveTaskData = () => {
    if (!taskvalues.task_name.trim()) {
      toast.error("Task name cannot be empty.");
      return;
    }

    const newTask = {
      id: Date.now(),
      task: taskvalues.task_name,
      status: taskvalues.task_status,
      due_date: formattedDate,
      completed: false,
    };

    const saveData = [...taskData, newTask];
    setTaskData(saveData);
    localStorage.setItem("task_data", JSON.stringify(saveData));
    toast.success("Task added successfully!");
    refreshTask();
    console.log(taskvalues.due_date);
    
  };

  const refreshTask = () => {
    setTaskvalues({
      task_id: "",
      task_name: "",
      task_status: "",
      due_date: "",
    });
  };

  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    toast.error("Logout..!");
  };

  const date = new Date();
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

  const handleSearchChange = (e) => debouncedSearch(e.target.value);

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const items = Array.from(taskData);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setTaskData(items);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = taskData.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTaskData(updatedTasks);
    localStorage.setItem("task_data", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    localStorage.setItem("task_data", JSON.stringify(taskData));
  }, [taskData]);

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value),150),
    []
  );



  return (
    <>
    <div className={`flex flex-col gap-4 justify-center min-h-screen p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
    <Toaster position="bottom-right" />
    <Card className="!bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... !p-8 !rounded-3xl flex flex-col gap-4">
    <div className="!mr-4 text-2xl text-center font-bold text-white">TASK MANAGER</div>
      <div className="!flex flex-wrap justify-between items-center p-2 !rounded-3xl">
 
        <label className="switch-container !ml-2">
          <div className="mr-4 !font-medium !uppercase">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </div>
          <input
            type="checkbox"
            className="switch-input"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <div className="switch-label">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="switch-sun-icon"
            >
              <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Z" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="switch-moon-icon"
            >
              <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725..." />
            </svg>
          </div>
        </label>
 
        <Tooltip arrow title="Logout"><IconButton size="medium" className="!bg-white" onClick={logout}>
          <LogoutIcon className="!text-2xl !text-[blue] hover:!text-[red]" color="error" />
        </IconButton></Tooltip>
      </div>

      <div className="!flex flex-wrap gap-4 justify-center">
        <Card className="!bg-[#FEEC37] !flex flex-col items-center justify-center !w-full sm:!w-[100%] md:!w-[45%] lg:!w-[49%] !rounded-3xl !p-2">
        <Form.Label className="text-lg font-medium text-black">Search Your Task By Name</Form.Label>
          <Form.Control
            placeholder="Search Tasks"
            value={searchTerm}
            onChange={handleSearchChange}
            className="!w-[70%]"
          />
        </Card>

        <Card className="!bg-[#FCC6FF] !flex flex-col items-center gap-3 !w-full sm:!w-[100%] md:!w-[45%] lg:!w-[49%] !p-5 !rounded-3xl">
          <Form.Control
            placeholder="Task Name"
            value={taskvalues.task_name}
            onChange={taskhandleChange}
            className="!w-[80%]"
          />
          <Form.Select
            value={taskvalues.task_status}
            onChange={statushandleChange}
            className="!w-[80%]"
          >
            <option value="">Select Status</option>
            <option value="toDo">To Do</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </Form.Select>
          <div className="!flex flex-wrap gap-2 justify-center">
            <Button color="primary" className="!w-[125px]" size="small" onClick={SaveTaskData} variant="contained">
              ADD
            </Button>
            <Button color="warning" className="!w-[125px]" size="small" onClick={refreshTask} variant="contained">
              RESET
            </Button>
          </div>
        </Card>
      </div>

     <div className="!w-full ">
      <Card className="!rounded-3xl">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="!h-[165px] !overflow-auto"
              >
                {taskData
                  .filter((task) =>
                    task.task.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id ? task.id.toString() : "default-task-id"}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <li 
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={`!flex flex-wrap !p-2 justify-around border items-center font-medium !truncate hover:bg-[#DCFCE7]  ${
                            task.status === "Completed"
                              ? "bg-green-100 text-green-500 pointer-events-none line-through"
                              : ""
                          } ${snapshot.isDragging ? "bg-gray-300" : ""}`}
                        >
                         
                          <div className="flex gap-2 items-center justify-start">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTaskCompletion(task.id)}
                            />
                            {edit && edit.id === task.id ? (
                              <Form.Control
                                value={edit.task}
                                onChange={(e) =>
                                  setEdit({ ...edit, task: e.target.value })
                                }
                                className="flex-1"
                              />
                            ) : (
                              <span
                                className={task.completed ? "line-through" : ""}
                              >
                                {task.task}
                              </span>
                            )}
                          </div>
                          <div className="!flex justify-center items-center">
                          {edit && edit.id === task.id ? (
                          <Form.Select
                            variant="filled"
                            size="small"
                            value={edit.status}
                            onChange={(e) =>
                              setEdit({ ...edit, status: e.target.value })
                            }
                          >
                            <option value="">Select Status</option>
                            <option value="ToDo">ToDo</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                          </Form.Select>
                        ) : (
                          task.status
                        )}
                          </div>
                          <div>{task.due_date}</div>
                          
                          <div className="flex gap-2">
                            {edit && edit.id === task.id ? (
                              <>
                              <Tooltip arrow title="Update"><IconButton onClick={handleUpdate}>
                                  <SaveIcon color="success" />
                                </IconButton></Tooltip>  
                                <Tooltip arrow title="Close"><IconButton onClick={handleCancel}>
                                  <CloseIcon color="warning" />
                                </IconButton></Tooltip>
                              </>
                            ) : (
                              <Tooltip arrow title="Edit"><IconButton onClick={() => handleEdit(task)}>
                                <EditIcon color="primary" />
                              </IconButton></Tooltip>
                            )}
                            <Tooltip arrow title="Delete"><IconButton onClick={() => handleDelete(task.id)}>
                              <DeleteIcon color="error" />
                            </IconButton></Tooltip>

                            <Tooltip arrow title="Drag"> <IconButton>
                              <DragHandleIcon color="action"/>
                            </IconButton></Tooltip>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
      </div>
      </Card>
    </div>
    </>
  );
};

export default Task;
