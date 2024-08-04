import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
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
import { useState } from 'react';
import { capitalizeFirstLetter, formatLocalDateTime } from 'src/utils/basicUtils';

const calculateCellWidth = () => {
  const containerWidth = document.getElementById('table-container').offsetWidth;
  const numColumns = 7; // Updated number of columns
  const padding = 16;

  const cellWidth = (containerWidth - padding) / numColumns;
  return `${cellWidth}px`;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: calculateCellWidth(),
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

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
  & .MuiTablePagination-spacer {
    display: none;
  }

  & .MuiTablePagination-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    background-color: ${theme.palette.mode === 'dark' ? '#1C2025' : '#fff'};

    @media (min-width: 500px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePagination-selectLabel,
  & .MuiTablePagination-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePagination-actions {
    display: flex;
    gap: 6px;
    border: transparent;
    text-align: center;
  }

  & .MuiTablePagination-actions > button {
    display: flex;
    align-items: center;
    padding: 0;
    border: transparent;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid ${theme.palette.mode === 'dark' ? '#6B7A90' : '#E5EAF2'};
    color: ${theme.palette.mode === 'dark' ? '#DAE2ED' : '#303740'};
    transition: all 100ms ease;

    > svg {
      font-size: 22px;
    }

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? '#434D5B' : '#F3F6F9'};
      border-color: ${theme.palette.mode === 'dark' ? '#B0B8C4' : '#9DA8B7'};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? '#3399FF' : '#A5D8FF'};
      border-color: #3399FF;
    }

    &:disabled {
      opacity: 0.3;
      &:hover {
        border: 1px solid ${theme.palette.mode === 'dark' ? '#6B7A90' : '#E5EAF2'};
        background-color: transparent;
      }
    }
  }
`,
);

const TaskTable = ({ tasks, setLimit, limit, page, setPage, skeletonLoader }) => {
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Paper>
        <TableContainer id="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeaders>Title</StyledTableHeaders>
                <StyledTableHeaders>Description</StyledTableHeaders>
                <StyledTableHeaders>Date</StyledTableHeaders>
                <StyledTableHeaders>Priority</StyledTableHeaders>
                <StyledTableHeaders>Status</StyledTableHeaders>
                <StyledTableHeaders>Action</StyledTableHeaders>
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
                    <StyledTableCell>
                      <div className="skeleton"></div>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {tasks.slice(page * limit, page * limit + limit).map((task) => (
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
                      <Tooltip title={formatLocalDateTime(task.dueDate, userTimeZone)}>
                        <Typography sx={{ fontSize: '16px', color: 'var(--quinary-font-color)' }} noWrap>
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
                        padding: '4px',
                        textAlign: 'center',
                        backgroundColor: `${handleStatusColorChange(task.status)}22`,
                      }}>
                        <span style={{ color: handleStatusColorChange(task.status), textTransform: 'capitalize' }}>
                          {capitalizeFirstLetter(task.status)}
                        </span>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '1%' }}>
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
        <CustomTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks.length}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={(subprops) => (
            <div className="pagination-actions">
              <IconButton
                onClick={(event) => subprops.onPageChange(event, 0)}
                disabled={subprops.page === 0}
                aria-label="first page"
              >
                <FirstPageRoundedIcon />
              </IconButton>
              <IconButton
                onClick={(event) => subprops.onPageChange(event, subprops.page - 1)}
                disabled={subprops.page === 0}
                aria-label="previous page"
              >
                <ChevronLeftRoundedIcon />
              </IconButton>
              <IconButton
                onClick={(event) => subprops.onPageChange(event, subprops.page + 1)}
                disabled={subprops.page >= Math.ceil(subprops.count / subprops.rowsPerPage) - 1}
                aria-label="next page"
              >
                <ChevronRightRoundedIcon />
              </IconButton>
              <IconButton
                onClick={(event) => subprops.onPageChange(event, Math.max(0, Math.ceil(subprops.count / subprops.rowsPerPage) - 1))}
                disabled={subprops.page >= Math.ceil(subprops.count / subprops.rowsPerPage) - 1}
                aria-label="last page"
              >
                <LastPageRoundedIcon />
              </IconButton>
            </div>
          )}
        />
      </Paper>
    </div>
  );
};

export default TaskTable;
