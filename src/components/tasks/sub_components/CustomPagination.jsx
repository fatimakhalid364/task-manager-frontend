import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import { FormControl, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const CustomPagination = ({ total, limit, page, setPage, setLimit, hasNextPage, metaData, hasPreviousPage, totalPages, nextPage, previousPage }) => {
    const accentColor = useSelector((state) => state.appearance.color)
    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '16px', gap: '15px', marginRight: '10px' }}>
            <div style={{display: 'flex', gap: '20px'}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Typography >Tasks per page</Typography>
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
            <div className='pagination-text-div' style={{ backgroundColor: accentColor === 'pink'
                            ? 'var(--light-pink-color)'
                            : accentColor === 'green'
                            ? 'var(--light-green-color)'
                            : accentColor === 'orange'
                            ? 'var(--light-orange-color)'
                            : 'var(--primary-background-color)'}}>
                <Typography className='pagination-text'>
                    Showig Tasks {metaData?.range?.start} - {metaData?.range?.end} of {metaData?.total}
                </Typography>
            </div>
            </div>
            <div>
                <IconButton onClick={() => setPage(0)} disabled={!hasPreviousPage}>
                    <FirstPageRoundedIcon />
                </IconButton>
                <IconButton onClick={() => setPage(metaData?.prevPage)} disabled={!hasPreviousPage}>
                    <ChevronLeftRoundedIcon />
                </IconButton>

                <IconButton onClick={() => setPage(nextPage)} disabled={!hasNextPage}>
                    <ChevronRightRoundedIcon />
                </IconButton>
                <IconButton onClick={() => setPage(totalPages)} disabled={!hasNextPage}>
                    <LastPageRoundedIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default CustomPagination;
