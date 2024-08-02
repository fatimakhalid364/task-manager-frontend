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
import { capitalizeFirstLetter, formatLocalDateTime } from 'src/utils/basicUtils';




const calculateCellWidth = () => {
  const containerWidth = document.getElementById('table-container').offsetWidth;
  const numColumns = 6;
  const padding = 16;

  const cellWidth = (containerWidth - padding) / numColumns;
  return `${cellWidth}px`;
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: calculateCellWidth(),
  // paddingRight: theme.spacing(1),
  textAlign: 'center',
  color: 'var(--secondary-font-color)',
  fontFamily: 'var(--primary-font-family)',

}));

const StyledTableHeaders = styled(TableCell)({
  
  width: '1%', 
  textAlign: 'center', 
  fontWeight: 500,
  fontFamily: 'var(--primary-font-family)',
   color: 'var(--secondary-font-color)',
});

const TaskTable = ({ tasks, getAllTasks, skeletonLoader }) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  console.log('skeletonLoader', skeletonLoader);

  useEffect(() => {
    {getAllTasks()};
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlePriorityColorChange = (priority) => {
    if (priority == 'HIGH') {
      return 'var(--high-font-color)';
  } else if (priority == 'MEDIUM') {
      return 'var(--medium-font-color)';
  } else if (priority == 'LOW') {
    return 'var(--low-font-color)';
  }
}

const handleStatusColorChange = (status) => {
  if(status == 'NOT_STARTED') {
    return 'var(--tertiary-font-color)';
  } else if (status == 'IN_PROGRESS') {
    return 'var(--inprogress-font-color)';
  } else if (status == 'COMPLETED') {
    return 'var(--low-font-color)';
  } else if (status == 'PENDING') {
    return 'var(--primary-font-color)';
  }
};

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); 
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

const today = new Date();
const formattedDate = formatDate(today);

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
    <div>
    <Paper>
       
      <TableContainer id={'table-container'}>
        <Table>
       
          <TableHead>
          <TableRow>
              <StyledTableHeaders>Title</StyledTableHeaders>
              <StyledTableHeaders>Description</StyledTableHeaders>
              <StyledTableHeaders>Date</StyledTableHeaders>
              <StyledTableHeaders>Due Date</StyledTableHeaders>
              <StyledTableHeaders>Priority</StyledTableHeaders>
              <StyledTableHeaders>Status</StyledTableHeaders>
              <StyledTableHeaders>Action</StyledTableHeaders>
            </TableRow>
          </TableHead>
          {skeletonLoader ? (
      <TableBody>
        {Array.from({ length: rowsPerPage }).map((_, index) => (
          <TableRow key={index}>
            <StyledTableCell>
              <div className='skeleton'></div>
            </StyledTableCell>
            <StyledTableCell>
              <div className='skeleton'></div>
            </StyledTableCell>
            <StyledTableCell>
              <div className='skeleton'></div>
            </StyledTableCell>
            <StyledTableCell>
              <div className='skeleton'></div>
            </StyledTableCell>
            <StyledTableCell>
              <div className='skeleton'></div>
            </StyledTableCell>
            <StyledTableCell>
              <div className='skeleton'></div>
            </StyledTableCell>
            <StyledTableCell>
              <div className='skeleton'></div>
            </StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    ) : (
      <TableBody>
        {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
          <TableRow key={task.id}>
            <StyledTableCell>
              <Tooltip title={task.taskTitle}>
                <Typography sx={{ fontSize: '16px' }} noWrap>
                  {task.taskTitle}
                </Typography>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell>
              <Tooltip title={task.taskDescription}>
                <Typography sx={{ fontSize: '16px', color: 'var(--quinary-font-color)' }} noWrap>
                  {task.taskDescription}
                </Typography>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell>
              <Tooltip title={formattedDate}>
                <Typography sx={{ fontSize: '16px', color: 'var(--quinary-font-color)' }} noWrap>
                {formattedDate}
                </Typography>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell>
              <Tooltip title={formatLocalDateTime(task.dueDate, userTimeZone)}>
                <Typography sx={{ textAlign: 'center', color: 'var(--quinary-font-color)' }} noWrap>
                  {formatLocalDateTime(task.dueDate, userTimeZone)}
                </Typography>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell sx={{ textAlign: 'center', color: handlePriorityColorChange(task.priority) }}>
              {capitalizeFirstLetter(task.priority)}
            </StyledTableCell>
            <StyledTableCell sx={{ color: 'var(--quinary-font-color)' }}>
              <div style={{
                border: `1px solid ${handleStatusColorChange(task.status)}`,
                borderRadius: '30px',
                width: '120px',
                padding: '5px 10% 5px 0',
                textAlign: 'center',
                marginLeft: '20%',
                textOverflow: 'ellipsis',
                color: handleStatusColorChange(task.status)
              }}>
                {capitalizeFirstLetter(task.status)}
              </div>
            </StyledTableCell>
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
    )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          fontSize: '16px',
          '& .MuiTablePagination-displayedRows': {
            display: 'none', 
          },
          '& .MuiTablePagination-selectLabel': {
            display: 'none', 
          },
          '& .MuiTablePagination-select': {
            display: 'none', 
          },
          '& .MuiTablePagination-actions': {
            display: 'flex',
            justifyContent: 'center',
            marginLeft: '0',
            marginRight: '7px'
          },
          '& .MuiTablePagination-navigation': {
            display: 'inline-flex',
          },
          '& .MuiTablePagination-prev': {
            display: 'inline-flex',
          },
          '& .MuiTablePagination-next': {
            display: 'inline-flex',
          },
          '& .MuiTablePagination-selectIcon': {
          display: 'none', 
        },
        }}
      /> 
      
    </Paper>
  </div>
  );
};



export default TaskTable;