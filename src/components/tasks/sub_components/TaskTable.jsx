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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "src/assets/edit.svg";
import redTrash from "src/assets/red-trash.svg";
import tickInCircle from "src/assets/tick-in-circle.svg";
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import { useResponsive } from "src/constants/media_queries";
import { completed_t_obj, deleteText_t_obj, description_t_obj, dueDate_t_obj, high_t_obj, inProgress_t_obj, low_t_obj, markAsCompleted_t_obj, markAsProgressing_t_obj, medium_t_obj, noTasksAvailable_t_obj, notStarted_t_obj, pending_t_obj, priority_t_obj, status_t_obj, title_t_obj, viewOrEdit_t_obj } from "src/constants/translationObj";
import {
  setHighPriorityMetaData,
  setHighPriorityMetaDecri,
  updateHighPriorityTasks,
} from "src/store/slices/highPrioritySlice";
import {
  setLowPriorityMetaData,
  setLowPriorityMetaDecri,
  updateLowPriorityTasks
} from "src/store/slices/lowPrioritySlice";
import {
  setMediumPriorityMetaData,
  setMediumPriorityMetaDecri, updateMediumPriorityTasks
} from "src/store/slices/mediumPrioritySLice";
import { setPriorityTasks } from "src/store/slices/priorityTaskSlice";
import {
  setHighPriorityCount,
  setLowPriorityCount,
  setMediumPriorityCount,
  setMetaData,
  setTasks,
} from "src/store/slices/taskSlice";
import {
  deleteTaskThunk,
  fetchPriorityCountsThunk,
  getAllTasksThunk,
  markTaskStatusThunk,
} from "src/store/thunks/taskThunks";
import {
  formatLocalDateTime
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
  priorityType,
}) => {
  const { isAdaptableScreen, isMicroScreen } = useResponsive();
  const highPriorityTasks = useSelector(
    (state) => state.highPriorityTasks.highPriorityTasks
  );
  const mediumPriorityTasks = useSelector(
    (state) => state.mediumPriorityTasks.mediumPriorityTasks
  );
  const lowPriorityTasks = useSelector(
    (state) => state.lowPriorityTasks.lowPriorityTasks
  );
  const highPriorityMetaData = useSelector(
    (state) => state.highPriorityTasks.highPriorityMetaData
  );
  const mediumPriorityMetaData = useSelector(
    (state) => state.mediumPriorityTasks.mediumPriorityMetaData
  );
  const lowPriorityMetaData = useSelector(
    (state) => state.lowPriorityTasks.lowPriorityMetaData
  );

  const timeFormat = useSelector((state) => state.format.timeFormat);
  const dateFormat = useSelector((state) => state.format.dateFormat);
  console.log("forrrrrrrrrrrrrrrrrrrrrr", timeFormat, dateFormat);
  // const dateFormat = useSelector((state) => state.format.dateFormat)
  const lang = useSelector((state) => state.format.language);
  const getTranslatedPriority = (reqPriority) => {
    console.log(reqPriority)
    if (reqPriority === "HIGH") {
      return high_t_obj[lang]

    } if (reqPriority === "MEDIUM") {
      return medium_t_obj[lang]
    } if (reqPriority === "LOW") {
      return low_t_obj[lang]
    }
  }
  const getTranslatedStatus = (reqStatus) => {
    if (reqStatus === "PENDING") {
      return pending_t_obj[lang]
    } else if (reqStatus === "COMPLETED") {
      return completed_t_obj[lang]
    } else if (reqStatus === "IN_PROGRESS") {
      return inProgress_t_obj[lang]
    } else if (reqStatus === "NOT STARTED") {
      return notStarted_t_obj[lang]
    } else {
      return reqStatus
    }
  }
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
  const getAllTasks = async (page = 0, limit = 5, status = []) => {
    try {
      const params = { page, limit, search: "", status: [] };
      const response = await dispatch(getAllTasksThunk(params)).unwrap();
      console.log("tasks in the component", response.tasks);
    } catch (err) {
      errorToast("Something went wrong", "getTask-pages-error");
      console.log("error in tasks", err);
    }
  };
  //   const deleteTask = async (_id) => {
  //     setSpinner(true);

  //     try {
  //         const tasksIds = tasks.map((task) => task._id);
  //         const response = await dispatch(deleteTaskThunk({ _id, tasksIds })).unwrap();
  //         let updtMeta;

  //         if (response?.status === 200) {
  //             const priorityCounts = await dispatch(fetchPriorityCountsThunk()).unwrap();

  //             const filteredTasks = tasks.filter((task) => task._id !== _id);
  //             const closestTask = response?.data?.closestTask;

  //             if (closestTask) {
  //                 closestTask.taskTitle = decryptSingleValues(closestTask?.taskTitle, privateKey);
  //                 closestTask.taskDescription = decryptSingleValues(closestTask?.taskDescription, privateKey);
  //                 if (Array.isArray(closestTask.taskDescription)) {
  //                     closestTask.taskDescription = closestTask.taskDescription.join("");
  //                 }
  //                 filteredTasks.push(closestTask);
  //                 updtMeta = { ...metaData, total: metaData.total - 1 };
  //             } else {
  //                 updtMeta = {
  //                     ...metaData,
  //                     total: metaData.total - 1,
  //                     range: {
  //                         ...metaData.range,
  //                         end: metaData.range?.end ? metaData.range.end - 1 : 0,
  //                     },
  //                 };
  //             }

  //             dispatch(setTasks(filteredTasks));
  //             dispatch(setMetaData(updtMeta));

  //             if (priorityType == 'HIGH') {
  //               dispatch (setHighPriorityMetaData(updtMeta));
  //             } else if (priorityType == 'LOW') {
  //               dispatch (setLowPriorityMetaData(updtMeta));
  //             } else if (priorityType == 'MEDIUM') {
  //               dispatch (setMediumPriorityMetaData(updtMeta));
  //             }

  //             const priorityTasks = {
  //                 HIGH: filteredTasks.filter(task => task.priority === 'HIGH'),
  //                 MEDIUM: filteredTasks.filter(task => task.priority === 'MEDIUM'),
  //                 LOW: filteredTasks.filter(task => task.priority === 'LOW'),
  //             };

  //             dispatch(updateHighPriorityTasks(priorityTasks.HIGH));
  //             dispatch(updateMediumPriorityTasks(priorityTasks.MEDIUM));
  //             dispatch(updateLowPriorityTasks(priorityTasks.LOW));

  //             dispatch(setHighPriorityCount(priorityCounts.data.high));
  //             dispatch(setMediumPriorityCount(priorityCounts.data.medium));
  //             dispatch(setLowPriorityCount(priorityCounts.data.low));

  //             successToast(response.message, "task-deleted");
  //         }
  //     } catch (err) {
  //         errorToast("Something went wrong", "getTask-pages-error");
  //         console.log("Error:", err);
  //     } finally {
  //         setSpinner(false);
  //     }
  // };

  useEffect(() => {
    console.log(
      "metaData being passed to high tasks is,,,,,,,,,,,,",
      metaData,
      "and mediumPriorityMetaData.range.end is...",
      mediumPriorityMetaData.range?.end
    );
  });

  const deleteTask = async (_id) => {
    setSpinner(true);

    try {
      const tasksIds = tasks.map((task) => task._id);
      const response = await dispatch(
        deleteTaskThunk({ _id, tasksIds })
      ).unwrap();
      console.log("response.status you look for is....", response?.status);

      if (response?.status === 200) {
        const priorityCounts = await dispatch(
          fetchPriorityCountsThunk()
        ).unwrap();

        const filteredTasks = tasks.filter(
          (task) => task._id !== selectedTaskId
        );
        const closestTask = response?.data?.closestTask;
        console.log(closestTask);
        let updMeta;
        let updHighPriorityMeta;
        let updLowPriorityMeta;
        let updMediumPriorityMeta;

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
          updMeta = { ...metaData, total: metaData.total - 1 };
          updHighPriorityMeta = {
            ...highPriorityMetaData,
            total: highPriorityMetaData.total - 1,
          };
          updLowPriorityMeta = {
            ...lowPriorityMetaData,
            total: lowPriorityMetaData.total - 1,
          };
          updMediumPriorityMeta = {
            ...mediumPriorityMetaData,
            total: mediumPriorityMetaData.total - 1,
          };
          console.log("updHighPriorityMetaData issss", updHighPriorityMeta);
        } else {
          updMeta = {
            ...metaData,
            total: metaData.total - 1,
            range: {
              ...metaData.range,
              end: metaData.range?.end ? metaData.range.end - 1 : 0,
            },
          };
          updHighPriorityMeta = {
            ...highPriorityMetaData,
            total: highPriorityMetaData.total - 1,
          };
          updLowPriorityMeta = {
            ...lowPriorityMetaData,
            total: lowPriorityMetaData.total - 1,
          };
          updMediumPriorityMeta = {
            ...mediumPriorityMetaData,
            total: mediumPriorityMetaData.total - 1,
          };

          console.log("else is here");
        }

        console.log("updMetaData is......", updMeta);
        dispatch(setTasks(filteredTasks));
        dispatch(setMetaData(updMeta));
        const deletedTask = tasks.find((task) => task._id === selectedTaskId);

        if (deletedTask.priority === "HIGH") {
          const filteredHighPriorityTasks = highPriorityTasks.filter(
            (task) => task._id !== selectedTaskId
          );
          await dispatch(updateHighPriorityTasks(filteredHighPriorityTasks));
          await dispatch(setHighPriorityMetaData(updHighPriorityMeta));
          await dispatch(setHighPriorityMetaDecri());
          await dispatch(setHighPriorityCount(priorityCounts.data.high));
        } else if (deletedTask.priority === "LOW") {
          const filteredLowPriorityTasks = lowPriorityTasks.length > 0 ? lowPriorityTasks.filter(
            (task) => task._id !== selectedTaskId
          ) : [];
          await dispatch(setLowPriorityMetaData(updLowPriorityMeta));
          await dispatch(updateLowPriorityTasks(filteredLowPriorityTasks));
          await dispatch(setLowPriorityMetaDecri());
          await dispatch(setLowPriorityCount(priorityCounts.data.low));
        } else if (deletedTask.priority === "MEDIUM") {
          const filteredMediumPriorityTasks = mediumPriorityTasks.filter(
            (task) => task._id !== selectedTaskId
          );
          await dispatch(setMediumPriorityMetaData(updMediumPriorityMeta));
          await dispatch(updateMediumPriorityTasks(filteredMediumPriorityTasks));
          await dispatch(setMediumPriorityMetaDecri());
          await dispatch(setMediumPriorityCount(priorityCounts.data.medium));
        }
        successToast(response.message, "task-deleted");
      }
    } catch (err) {
      errorToast("Delete! Something went wrong", "getTask-pages-error");
      console.log("Error During Delete", err);
    } finally {
      setSpinner(false);
    }
  };

  const handleDelete = async () => {
    console.log(`Delete task with ID: ${selectedTaskId}`);
    deleteTask(selectedTaskId);

    handleMenuClose();
  };

  const changeTaskStatus = async (_id, taskStatus, taskPriority) => {
    setSpinner(true);
    try {
      const thunkToDispatch = markTaskStatusThunk;
      const response = await dispatch(
        thunkToDispatch({ _id, taskStatus })
      ).unwrap();
      if (response.status == 200) {

        const updatedTasksArray = tasks.map((task) =>
          task._id == _id ? { ...task, status: taskStatus } : task
        );
        if (priority) {
          dispatch(setPriorityTasks(updatedTasksArray));
          getAllTasks();
        } else if (!priority && taskPriority === "MEDIUM") {
          const updatedMediumTasksArray = mediumPriorityTasks.map((task) =>
            task._id == _id ? { ...task, status: taskStatus } : task
          );
          dispatch(updateMediumPriorityTasks(updatedMediumTasksArray));
          dispatch(setTasks(updatedTasksArray));
        } else if (!priority && taskPriority === "HIGH") {
          const updatedHighTasksArray = highPriorityTasks.map((task) =>
            task._id == _id ? { ...task, status: taskStatus } : task
          );
          dispatch(updateHighPriorityTasks(updatedHighTasksArray));
          dispatch(setTasks(updatedTasksArray));
        } else if (!priority && taskPriority === "LOW") {
          const updatedLowTasksArray = lowPriorityTasks.map((task) =>
            task._id == _id ? { ...task, status: taskStatus } : task
          );
          dispatch(updateLowPriorityTasks(updatedLowTasksArray));
          dispatch(setTasks(updatedTasksArray));
        }
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
      console.log("foundTask normally is.....", foundTask);
    } else {
      foundTask = tasks.find((task) => task._id === taskId);
      console.log("foundTask is...........", foundTask);
    }

    handleOpen();
    handleMenuClose();

    setTaskDetailsToEdit({ ...foundTask, dueDate: dayjs(foundTask.dueDate) });
  };

  const handleChangeTaskStatus = (_id, taskStatus, taskPriority) => {
    console.log(`Change task status with ID: ${_id}`);
    changeTaskStatus(_id, taskStatus, taskPriority);
    handleMenuClose();
  };

  const handleComplete = () => {
    console.log(`Complete task with ID: ${selectedTaskId}`);
    handleMenuClose();
  };

  // Ensure tasks are correctly sliced based on page and limit
  // const startIndex = page * limit;
  // const endIndex = startIndex + limit;
  // const paginatedTasks = tasks.slice(startIndex, endIndex);

  return (
    <div>
      <SpinnerLoader showSpinner={spinner} />
      <Paper>
        <TableContainer id='table-container'>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeaders>{title_t_obj[lang]}</StyledTableHeaders>
                <StyledTableHeaders>{description_t_obj[lang]}</StyledTableHeaders>
                {!isMicroScreen && (
                  <StyledTableHeaders>{dueDate_t_obj[lang]}</StyledTableHeaders>
                )}
                {!isMicroScreen && (
                  <StyledTableHeaders>{priority_t_obj[lang]}</StyledTableHeaders>
                )}
                {!isMicroScreen && (
                  <StyledTableHeaders>{status_t_obj[lang]}</StyledTableHeaders>
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
                            {getTranslatedPriority(task.priority)}
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
                            {getTranslatedStatus(task.status)}
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
                              <div style={{ marginTop: "2px" }}>{viewOrEdit_t_obj[lang]}</div>
                            </MenuItem>
                            {task.status !== "COMPLETED" && (
                              <MenuItem
                                onClick={() => {
                                  handleChangeTaskStatus(
                                    task._id,
                                    "COMPLETED",
                                    task.priority
                                  );
                                }}
                                sx={{ gap: "12px" }}
                              >
                              <img src={tickInCircle} alt='tick-in-circle' />
                                <div style={{ marginTop: "2px" }}>
                                  {markAsCompleted_t_obj[lang]}
                                </div>
                              </MenuItem>
                            )}
                            {task.status !== "COMPLETED" &&
                              task.status !== "IN_PROGRESS" && (
                                <MenuItem
                                  onClick={() => {
                                    handleChangeTaskStatus(
                                      task._id,
                                      "IN_PROGRESS",
                                      task.priority
                                    );
                                  }}
                                  sx={{ gap: "12px" }}
                                >
                                  <img src={tickInCircle} alt='tick-in-circle' />
                                  <div style={{ marginTop: "2px" }}>
                                  {markAsProgressing_t_obj[lang]}
                                  </div>
                                </MenuItem>
                              )}

                            <MenuItem
                              onClick={handleDelete}
                              sx={{ color: "var(--logout-color)", gap: "12px" }}
                            >
                              <img src={redTrash} alt='red-trash-icon' />
                              <div style={{ marginTop: "2px" }}>{deleteText_t_obj[lang]}</div>
                            </MenuItem>
                          </Menu>
                        </StyledAction>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                        <StyledTableCell colSpan={7} align='center'>
                          {noTasksAvailable_t_obj[lang]}
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
