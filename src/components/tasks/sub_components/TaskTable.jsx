import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "src/assets/edit.svg";
import redTrash from "src/assets/red-trash.svg";
import tickInCircle from "src/assets/tick-in-circle.svg";
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import { useResponsive } from "src/constants/media_queries";
import { setMetaData, setTasks } from "src/store/slices/taskSlice";
import {
  deleteTaskThunk,
  markTaskStatusThunk,
} from "src/store/thunks/taskThunks";
import {
  capitalizeFirstLetter,
  formatLocalDateTime,
} from "src/utils/basicUtils";
import { decryptSingleValues } from "src/utils/encryptionUtil";
import { errorToast, successToast } from "../../toasters/toast";
import CustomPagination from "./CustomPagination";

const calculateCellWidth = () => {
  const containerWidth =
    document.getElementById("table-container")?.offsetWidth || 0;
  const numColumns = 7; // Updated number of columns

  const cellWidth = containerWidth / numColumns;
  // console.log('this is the cell width at present >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.', cellWidth);
  return `${cellWidth}px`;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "center",
  whiteSpace: "nowrap",
  maxWidth: calculateCellWidth(),
  minWidth: calculateCellWidth(),
  color: "var(--secondary-font-color)",
  fontFamily: "var(--primary-font-family)",
}));

const StyledTableHeadersLeft = styled(TableCell)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "center",
  whiteSpace: "nowrap",
  maxWidth: calculateCellWidth(),
  color: "var(--secondary-font-color)",
  fontFamily: "var(--primary-font-family)",
}));
const StyledAction = styled(TableCell)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "center",
  whiteSpace: "nowrap",
  width: "5%",
  color: "var(--secondary-font-color)",
  fontFamily: "var(--primary-font-family)",
}));

const TaskTable = ({
  tasks = [],
  setLimit,
  debouncedGetAllTasks,
  limit,
  total,
  page,
  setPage,
  previousPage,
  hasPreviousPage,
  totalPages,
  hasNextPage,
  nextPage,
  skeletonLoader,
  metaData,
  taskEdit,
  handleTaskEdit,
  handleOpen,
  setTaskDetailsToEdit,
  handleReverseTaskEdit,
  priority = false,
}) => {
  const { isAdaptableScreen, isMicroScreen } = useResponsive();

  const timeFormat = useSelector((state) => state.format.timeFormat);
  const dateFormat = useSelector((state) => state.format.dateFormat);
  console.log("forrrrrrrrrrrrrrrrrrrrrr", timeFormat, dateFormat);
  // const dateFormat = useSelector((state) => state.format.dateFormat)
  const StyledTableHeaders = styled(TableCell)({
    width: "17%",
    textAlign: "center",
    fontFamily: "var(--primary-font-family)",
    color: "var(--secondary-font-color)",
    backgroundColor: "var(--active-background-color)",
  });

  const StyledTableHeadersA = styled(TableCell)({
    width: "5%",
    textAlign: "center",
    fontFamily: "var(--primary-font-family)",
    color: "var(--secondary-font-color)",
    backgroundColor: "var(--active-background-color)",
  });

  

  const privateKey = localStorage.getItem("privateKey");

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);

  const handlePriorityColorChange = (priority) => {
    switch (priority) {
      case "HIGH":
        return "var(--high-font-color)";
      case "MEDIUM":
        return "var(--medium-font-color)";
      case "LOW":
        return "var(--low-font-color)";
      default:
        return "inherit";
    }
  };

  const handleStatusColorChange = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return "var(--tertiary-font-color)";
      case "IN_PROGRESS":
        return "var(--inprogress-font-color)";
      case "COMPLETED":
        return "var(--low-font-color)";
      case "PENDING":
        return "var(--primary-font-color)";
      default:
        return "inherit";
    }
  };

  const handleMenuClick = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const deleteTask = async (_id) => {
    setSpinner(true);

    try {
      const tasksIds = tasks.map((task) => task._id);
      const response = await dispatch(
        deleteTaskThunk({ _id, tasksIds })
      ).unwrap();

      if (response?.status === 200) {
        const filteredTasks = tasks.filter(
          (task) => task._id !== selectedTaskId
        );
        const closestTask = response?.data?.closestTask;
        console.log(closestTask);
        if (closestTask) {
          closestTask.taskTitle = decryptSingleValues(
            closestTask?.taskTitle,
            privateKey
          );
          closestTask.taskDescription = decryptSingleValues(
            closestTask?.taskDescription,
            privateKey
          );
          if (Array.isArray(closestTask.taskDescription)) {
            closestTask.taskDescription = closestTask.taskDescription.join("");
          }
          filteredTasks.push(closestTask);
        }
        const updMeta = { ...metaData, total: metaData.total - 1 };
        dispatch(setTasks(filteredTasks));
        dispatch(setMetaData(updMeta));
        successToast(response.message, "task-created");
      }
    } catch (err) {
      errorToast("Something went wrong", "getTask-pages-error");
    } finally {
      setSpinner(false);
    }
  };

  const handleDelete = () => {
    console.log(`Delete task with ID: ${selectedTaskId}`);
    deleteTask(selectedTaskId);
    handleMenuClose();
  };

  const changeTaskStatus = async (_id, taskStatus) => {
    setSpinner(true);
    try {
      // console.log(`Change status for task with ID: ${selectedTaskId}`);
      const thunkToDispatch = markTaskStatusThunk;
      const response = await dispatch(
        thunkToDispatch({ _id, taskStatus })
      ).unwrap();
      if (response.status == 200) {
      // const filteredTaskObject = tasks.filter(task => task._id == _id);
      // const updatedTaskObject = {...filteredTaskObject, status: taskStatus}

        const updatedTasksArray = tasks.map((task) =>
          task._id == _id ? { ...task, status: taskStatus } : task
        );
        dispatch(setTasks(updatedTasksArray));
      }
    } catch (err) {
      errorToast(
        "Something went wrong while changing task status",
        "getTask-pages-error"
      );
    } finally {
      setSpinner(false);
    }
  };

  const hadnleTaskViewOrEdit = async (taskId) => {
    console.log(taskId);
    console.log(tasks);
    handleTaskEdit();
    let foundTask;
    if (!priority) {
      foundTask = tasks.reduce((accumulator, task) => {
        if (task._id == taskId) {
          accumulator = task;
        }
        return accumulator;
      }, null);
    } else {
      foundTask = tasks.find((task) => task._id === taskId);
      console.log('foundTask is...........', foundTask);
    }

    handleOpen();
    handleMenuClose();

    setTaskDetailsToEdit(foundTask);
  };

  const handleChangeTaskStatus = (_id, taskStatus) => {
    console.log(`Change task status with ID: ${_id}`);
    changeTaskStatus(_id, taskStatus);
    handleMenuClose();
  };

  const handleComplete = () => {
    console.log(`Complete task with ID: ${selectedTaskId}`);
    handleMenuClose();
  };

  // Ensure tasks are correctly sliced based on page and limit
  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  const paginatedTasks = tasks.slice(startIndex, endIndex);

  return (
    <div>
      <SpinnerLoader showSpinner={spinner} />
      <Paper>
        <TableContainer id='table-container'>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeaders>Title</StyledTableHeaders>
                <StyledTableHeaders>Description</StyledTableHeaders>
                {!isMicroScreen && (
                  <StyledTableHeaders>Due Date</StyledTableHeaders>
                )}
                {!isMicroScreen && (
                  <StyledTableHeaders>Priority</StyledTableHeaders>
                )}
                {!isMicroScreen && (
                  <StyledTableHeaders>Status</StyledTableHeaders>
                )}
                <StyledTableHeadersA></StyledTableHeadersA>
              </TableRow>
            </TableHead>
            {skeletonLoader ? (
              <TableBody>
                {Array.from({ length: limit }).map((_, index) => (
                  <TableRow key={index}>
                    <StyledTableCell>
                      <div className='skeleton'></div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className='skeleton'></div>
                    </StyledTableCell>
                    {!isMicroScreen && (
                      <StyledTableCell>
                        <div className='skeleton'></div>
                      </StyledTableCell>
                    )}
                    {!isMicroScreen && (
                      <StyledTableCell>
                        <div className='skeleton'></div>
                      </StyledTableCell>
                    )}
                    {!isMicroScreen && (
                      <StyledTableCell>
                        <div className='skeleton'></div>
                      </StyledTableCell>
                    )}
                    <StyledTableCell>
                      <div className='skeleton'></div>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <TableRow key={task._id}>
                        <StyledTableHeadersLeft>
                          <Tooltip title={task.taskTitle}>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color:
                                  isMicroScreen &&
                                  handleStatusColorChange(task.status),
                              }}
                              noWrap
                            >
                              {task.taskTitle}
                            </Typography>
                          </Tooltip>
                        </StyledTableHeadersLeft>
                        <StyledTableHeadersLeft>
                          <Tooltip title={task.taskDescription}>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color: "var(--quinary-font-color)",
                                justifyContent: "left",
                              }}
                              noWrap
                            >
                              {task.taskDescription}
                            </Typography>
                          </Tooltip>
                        </StyledTableHeadersLeft>
                        {!isMicroScreen && (
                          <StyledTableCell>
                            <Tooltip
                              title={formatLocalDateTime(
                                task.dueDate,
                                userTimeZone,
                                timeFormat,
                                dateFormat
                              )}
                            >
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  color: "var(--quinary-font-color)",
                                }}
                                noWrap
                              >
                                {formatLocalDateTime(
                                  task.dueDate,
                                  userTimeZone,
                                  timeFormat,
                                  dateFormat
                                )}
                            </Typography>
                          </Tooltip>
                          </StyledTableCell>
                        )}
                        {!isMicroScreen && (
                          <StyledTableCell
                            sx={{
                              textAlign: "center",
                              color: handlePriorityColorChange(task.priority),
                            }}
                          >
                          {capitalizeFirstLetter(task.priority)}
                          </StyledTableCell>
                        )}
                        {!isMicroScreen && (
                          <StyledTableCell
                            sx={{
                              textAlign: "center",
                              justifyContent: "center",
                              color: handleStatusColorChange(task.status),
                            }}
                          >
                          {capitalizeFirstLetter(task.status)}
                          </StyledTableCell>
                        )}
                        <StyledAction sx={{ width: "1%" }}>
                          <Tooltip title='Options'>
                            <IconButton
                              size='small'
                              onClick={(event) =>
                                handleMenuClick(event, task._id)
                              }
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
                          <Menu
                            anchorEl={anchorEl}
                            open={
                              Boolean(anchorEl) && selectedTaskId === task._id
                            }
                            onClose={handleMenuClose}
                            sx={{
                              height:
                                task.status == "COMPLETED"
                                  ? "210px"
                                  : task.status == "IN_PROGRESS"
                                    ? "259px"
                                    : "450px",
                              width:
                                task.status == "COMPLETED" ? "199px" : "250px",
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                hadnleTaskViewOrEdit(task._id);
                              }}
                              sx={{ gap: "12px" }}
                            >
                              <img src={edit} alt='edit-icon' />
                              <div style={{ marginTop: "2px" }}>View or Edit</div>
                            </MenuItem>
                            {task.status !== "COMPLETED" && (
                              <MenuItem
                                onClick={() => {
                                  handleChangeTaskStatus(task._id, "COMPLETED");
                                }}
                                sx={{ gap: "12px" }}
                              >
                              <img src={tickInCircle} alt='tick-in-circle' />
                                <div style={{ marginTop: "2px" }}>
                                  Mark as Completed
                                </div>
                              </MenuItem>
                            )}
                            {task.status !== "COMPLETED" &&
                              task.status !== "IN_PROGRESS" && (
                                <MenuItem
                                  onClick={() => {
                                    handleChangeTaskStatus(
                                      task._id,
                                      "IN_PROGRESS"
                                    );
                                  }}
                                  sx={{ gap: "12px" }}
                                >
                                  <img src={tickInCircle} alt='tick-in-circle' />
                                  <div style={{ marginTop: "2px" }}>
                                    Mark as Progressing
                                  </div>
                                </MenuItem>
                              )}

                            <MenuItem
                              onClick={handleDelete}
                              sx={{ color: "var(--logout-color)", gap: "12px" }}
                            >
                              <img src={redTrash} alt='red-trash-icon' />
                              <div style={{ marginTop: "2px" }}>Delete</div>
                            </MenuItem>
                          </Menu>
                        </StyledAction>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                        <StyledTableCell colSpan={7} align='center'>
                          No tasks available
                        </StyledTableCell>
                    </TableRow>
                  )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <CustomPagination
          total={total}
          limit={limit}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          setLimit={setLimit}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          nextPage={nextPage}
          metaData={metaData}
          previousPage={previousPage}
          debouncedGetAllTasks={debouncedGetAllTasks}
        />
      </Paper>
    </div>
  );
};

export default TaskTable;
