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
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { capitalizeFirstLetter, formatLocalDateTime } from 'src/utils/basicUtils';
import CustomPagination from './CustomPagination';
import redTrash from 'src/assets/red-trash.svg';
import edit from 'src/assets/edit.svg';
import tickInCircle from 'src/assets/tick-in-circle.svg';

const calculateCellWidth = () => {
  const containerWidth = document.getElementById('table-container')?.offsetWidth || 0;
  const numColumns = 7; // Updated number of columns
  const padding = 16;

  const cellWidth = (containerWidth - padding) / numColumns;
  return `${cellWidth}px`;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  maxWidth: calculateCellWidth(),
  color: 'var(--secondary-font-color)',
  fontFamily: 'var(--primary-font-family)',
}));

const StyledTableHeadersLeft = styled(TableCell)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  maxWidth: calculateCellWidth(),
  color: 'var(--secondary-font-color)',
  fontFamily: 'var(--primary-font-family)',
}));
const StyledAction = styled(TableCell)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  width: '5%',
  color: 'var(--secondary-font-color)',
  fontFamily: 'var(--primary-font-family)',
}));

const StyledTableHeaders = styled(TableCell)({
  width: '17%',
  textAlign: 'center',
  fontFamily: 'var(--primary-font-family)',
  color: 'var(--secondary-font-color)',
  backgroundColor: 'var(--active-background-color)',
});

const StyledTableHeadersA = styled(TableCell)({
  width: '5%',
  textAlign: 'center',
  fontFamily: 'var(--primary-font-family)',
  color: 'var(--secondary-font-color)',
  backgroundColor: 'var(--active-background-color)',
});



const TaskTable = ({
  tasks = [],
  setLimit,
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
  metaData
}) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handlePriorityColorChange = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'var(--high-font-color)';
      case 'MEDIUM':
        return 'var(--medium-font-color)';
      case 'LOW':
        return 'var(--low-font-color)';
      default:
        return 'inherit';
    }
  };

  const handleStatusColorChange = (status) => {
    switch (status) {
      case 'NOT_STARTED':
        return 'var(--tertiary-font-color)';
      case 'IN_PROGRESS':
        return 'var(--inprogress-font-color)';
      case 'COMPLETED':
        return 'var(--low-font-color)';
      case 'PENDING':
        return 'var(--primary-font-color)';
      default:
        return 'inherit';
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

  // Ensure tasks are correctly sliced based on page and limit
  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  const paginatedTasks = tasks.slice(startIndex, endIndex);

  return (
    <div>
      <Paper>
        <TableContainer id="table-container" >
          <Table >
            <TableHead>
              <TableRow>
                <StyledTableHeaders>Title</StyledTableHeaders>
                <StyledTableHeaders>Description</StyledTableHeaders>
                <StyledTableHeaders>Due Date</StyledTableHeaders>
                <StyledTableHeaders>Priority</StyledTableHeaders>
                <StyledTableHeaders>Status</StyledTableHeaders>
                <StyledTableHeadersA></StyledTableHeadersA>
              </TableRow>
            </TableHead>
            {skeletonLoader ? (
              <TableBody>
                {Array.from({ length: limit }).map((_, index) => (
                  <TableRow key={index}>
                    <StyledTableCell>
                      <div className="skeleton"></div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="skeleton"></div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="skeleton"></div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="skeleton"></div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="skeleton"></div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="skeleton"></div>
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
                            <Typography sx={{ fontSize: '16px' }} noWrap>
                              {task.taskTitle}
                            </Typography>
                          </Tooltip>
                        </StyledTableHeadersLeft>
                        <StyledTableHeadersLeft>
                          <Tooltip title={task.taskDescription}>
                            <Typography sx={{ fontSize: '16px', color: 'var(--quinary-font-color)', justifyContent: 'left' }} noWrap>
                              {task.taskDescription}
                            </Typography>
                          </Tooltip>
                        </StyledTableHeadersLeft>
                        <StyledTableCell>
                          <Tooltip title={formatLocalDateTime(task.dueDate, userTimeZone)}>
                            <Typography sx={{ fontSize: '16px', color: 'var(--quinary-font-color)' }} noWrap>
                              {formatLocalDateTime(task.dueDate, userTimeZone)}
                            </Typography>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: 'center', color: handlePriorityColorChange(task.priority) }}>
                          {capitalizeFirstLetter(task.priority)}
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: 'center', justifyContent: 'center',  color: handleStatusColorChange(task.status) }}>
                          {capitalizeFirstLetter(task.status)}
                        </StyledTableCell>
                        <StyledAction sx={{ width: '1%' }}>
                          <Tooltip title="Options">
                            <IconButton size="small" onClick={(event) => handleMenuClick(event, task.id)}>
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl) && selectedTaskId === task.id}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={handleDelete} sx={{gap: '12px'}}>
                              <img src={edit} alt='edit-icon' />
                              <div style={{marginTop: '2px'}}>Edit</div>
                            </MenuItem>
                            <MenuItem onClick={handleChangeStatus} sx={{gap: '12px'}}>
                              <img src={tickInCircle} alt='tick-in-circle' />
                              <div style={{marginTop: '2px'}}>Mark as Complete</div>
                            </MenuItem>
                            <MenuItem onClick={handleComplete} sx={{color: 'var(--logout-color)', gap: '12px'}}>
                              <img src={redTrash} alt='red-trash-icon' />
                              <div style={{marginTop: '2px'}}>Delete</div>
                            </MenuItem>
                          </Menu>
                        </StyledAction>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <StyledTableCell colSpan={7} align="center">No tasks available</StyledTableCell>
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
        />
      </Paper>
    </div>
  );
};

export default TaskTable;
