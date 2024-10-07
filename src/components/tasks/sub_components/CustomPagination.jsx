import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import { FormControl, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { useResponsive } from "src/constants/media_queries";

const CustomPagination = ({ total, debouncedGetAllTasks, limit, page, setPage, setLimit, hasNextPage, metaData, hasPreviousPage, totalPages, nextPage, previousPage }) => {

    const handleChangeRowsPerPage = (event) => {
        const newLimit = parseInt(event.target.value, 10);
        setLimit(newLimit);
        setPage(0); // Reset page to 1 for new limit
        debouncedGetAllTasks(0, newLimit); // Fetch tasks with new limit starting at page 0
    };

    const handlePageChange = (newPage) => {
        console.log(newPage);
        setPage(newPage);
        debouncedGetAllTasks(newPage, limit); // Fetch tasks for the selected page with the current limit
    };

    const { isAdaptableScreen, isMicroScreen } = useResponsive();

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '16px', gap: '15px', marginRight: '10px' }}>
            <div style={{display: 'flex', gap: '20px'}}>
                {!isMicroScreen && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Typography>Tasks per page</Typography>
                        <FormControl variant="outlined" size="small">
                            <Select
                                labelId="rows-per-page-label"
                                id="rows-per-page"
                                value={limit}
                                onChange={handleChangeRowsPerPage}
                                sx={{ fontSize: '14px' }}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={999}>All</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                )}
                {!isMicroScreen && (
                    <div className='pagination-text-div' style={{ backgroundColor: 'var(--active-background-color)' }}>
                        <Typography className='pagination-text'>
                            Showing Tasks {metaData?.range?.start} - {metaData?.range?.end} of {metaData?.total}
                        </Typography>
                    </div>
                )}
            </div>
            <div>
                <IconButton onClick={() => handlePageChange(0)} disabled={!hasPreviousPage}>
                    <FirstPageRoundedIcon />
                </IconButton>
                <IconButton onClick={() => handlePageChange(metaData?.prevPage)} disabled={!hasPreviousPage}>
                    <ChevronLeftRoundedIcon />
                </IconButton>
                <IconButton onClick={() => handlePageChange(nextPage)} disabled={!hasNextPage}>
                    <ChevronRightRoundedIcon />
                </IconButton>
                <IconButton onClick={() => handlePageChange(totalPages)} disabled={!hasNextPage}>
                    <LastPageRoundedIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default CustomPagination;
