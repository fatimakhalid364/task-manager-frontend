import MoreVertIcon from '@mui/icons-material/MoreVert';
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
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { getAllTasksThunk } from 'src/store/thunks/taskThunks';
import { capitalizeFirstLetter, formatLocalDateTime } from 'src/utils/basicUtils';
import { decryptSingleValues } from 'src/utils/encryptionUtil';

const calculateCellWidth = () => {
  const containerWidth = document.getElementById('table-container').offsetWidth;
  const numColumns = 6;
  const padding = 16;

  const cellWidth = (containerWidth - padding) / numColumns;
  return `${cellWidth}px`;
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "12px",
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: calculateCellWidth(),
  paddingRight: theme.spacing(1),
}));

const StyledTableHeaders = styled(TableCell)({
  backgroundColor: '#f5f5f5',
  color: '#000',
  fontWeight: 'bold',
  fontSize: "12px",
});

const TaskTable = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [metaData, setMetaData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const getAllTasks = async () => {
    try {
      setSpinner(true);
      const response = await dispatch(getAllTasksThunk()).unwrap();
      const privateKey = localStorage.getItem("privateKey")
      response?.data?.forEach(task => {
        task.taskTitle = decryptSingleValues(task.taskTitle, privateKey);
        task.taskDescription = decryptSingleValues(task.taskDescription, privateKey);
      });
      setTasks(response?.data);
      setMetaData(response?.metaData)
      console.log(response);
      successToast(response.message, 'task-created');

      setSpinner(false);
    } catch (err) {
      console.log(err);
      errorToast('Something went wrong', 'getTask-pages-error');

      setSpinner(false);
    }
  }
  useEffect(() => {
    getAllTasks();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMenuClick = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleDelete = () => {
    console.log(`Delete task with ID: ${selectedTaskId}`);
    handleMenuClose();
  };

  const handleChangeStatus = () => {
    console.log(`Change status for task with ID: ${selectedTaskId}`);
    handleMenuClose();
  };

  const handleComplete = () => {
    console.log(`Complete task with ID: ${selectedTaskId}`);
    handleMenuClose();
  };

  return (
    <Paper>
      <SpinnerLoader showSpinner={spinner} />
      <TableContainer id={'table-container'}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeaders >Title</StyledTableHeaders>
              <StyledTableHeaders >Description</StyledTableHeaders>
              <StyledTableHeaders sx={{ width: '15%', textAlign: 'center' }}>Due Date</StyledTableHeaders>
              <StyledTableHeaders sx={{ width: '10%', textAlign: 'center' }}>Priority</StyledTableHeaders>
              <StyledTableHeaders sx={{ width: '10%', textAlign: 'center' }}>Status</StyledTableHeaders>
              <StyledTableHeaders sx={{ width: '5%', padding: '0px' }}></StyledTableHeaders>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
              <TableRow key={task.id}>
                <StyledTableCell>
                  <Tooltip sx={{ fontSize: '12px' }} title={task.taskTitle}>
                    <Typography sx={{ fontSize: '12px' }} noWrap>{task.taskTitle}</Typography>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell>
                  <Tooltip sx={{ fontSize: '12px' }} title={task.taskDescription}>
                    <Typography sx={{ fontSize: '12px' }} noWrap>{task.taskDescription}</Typography>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{formatLocalDateTime(task.dueDate, userTimeZone)}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{capitalizeFirstLetter(task.priority)}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{capitalizeFirstLetter(task.status)}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-controls={`menu-${task.id}`}
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event, task.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`menu-${task.id}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    <MenuItem onClick={handleChangeStatus}>Change Status</MenuItem>
                    <MenuItem onClick={handleComplete}>Complete</MenuItem>
                  </Menu>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ fontSize: '12px' }}
      />
    </Paper>
  );
};

export default TaskTable;
