
import { Box } from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomButtons from "src/components/BottomButtons";
import MainDiv from "src/components/maindiv/maindiv";
import PageHeader from 'src/components/PageHeader';
import 'src/components/tasks/sub_components/tasks.css';
import TaskTable from 'src/components/tasks/sub_components/TaskTable';
import { errorToast } from 'src/components/toasters/toast.js';
import { useResponsive } from 'src/constants/media_queries';
import { getPriorityTasksThunk } from 'src/store/thunks/taskThunks';

function PriorityTasks({ priority }) {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const priorityTasks = useSelector((state) => state.priorityTask);
    const [skeletonLoader, setSkeletonLoader] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const handleFilterOpen = () => setFilterOpen(true);
    const privateKey = localStorage.getItem("privateKey");
    console.log('priorityTasks in the component', priorityTasks)



    const getAllTasks = async (page = 0, limit = 5) => {
        try {

            setSkeletonLoader(true);
            const params = { page, limit, search, priority }
            const response = await dispatch(getPriorityTasksThunk(params)).unwrap();
            console.log('tasks in the component', response);
        } catch (err) {
            errorToast('Something went wrong', 'getTask-pages-error');
            console.log('error in tasks', err)
        } finally {
            setSkeletonLoader(false);
        }
    };

    const {
        isAdaptableScreen,
        onWholeScreen,
        isMicroScreen,
    } = useResponsive();

    const debouncedGetAllTasks = useCallback(
        debounce((page, limit) => {
            getAllTasks(page, limit);
        }, 300),
        []
    );
    useEffect(() => {
        getAllTasks(page, limit, search);
    }, []);
    return (
        <div className='task-page-div' >
            <MainDiv>
                <div className='task-page' style={{ width: (onWholeScreen) && '98%' }}>
                    <PageHeader showAdd={false} titleHead={priority} handleOpen={handleOpen} total={priorityTasks?.priorityMetaData?.total} text='All Tasks' object='Task' />
                    <div>
                        {/* <FilterButton handleFilterOpen={handleFilterOpen} /> */}
                    </div>
                    <Box mt={3} mb={4}>
                        <TaskTable debouncedGetAllTasks={debouncedGetAllTasks} tasks={priorityTasks?.priorityTasks} limit={limit} privateKey={privateKey} page={priorityTasks?.priorityMetaData?.page} setLimit={setLimit} setPage={setPage} getAllTasks={getAllTasks} hasNextPage={priorityTasks?.priorityMetaData?.hasNextPage} hasPreviousPage={priorityTasks?.priorityMetaData?.hasPrevPage} nextPage={priorityTasks?.priorityMetaData?.nextPage} priorityMetaData={priorityTasks?.priorityMetaData} previousPage={priorityTasks?.priorityMetaData?.previousPage} totalPages={priorityTasks?.priorityMetaData?.totalPages} skeletonLoader={skeletonLoader} />
                    </Box>
                </div>
                <BottomButtons handleOpen={handleOpen} handleFilterOpen={handleFilterOpen} />
                {/* {(!isAdaptableScreen && !isMicroScreen) && <BottomBar handleOpen={handleOpen} handleFilterOpen={handleFilterOpen} />}

                {(isMicroScreen && !isAdaptableScreen) && (<div className="circle-2">
                    <div style={{ width: '100%', borderRadius: '50px', display: 'flex', marginTop: '24px', justifyContent: 'center' }}
                        onClick={handleOpen}>
                        <PlusIcon color='white' width='17' height='17' />
                    </div>
                </div>)} */}
            </MainDiv>

        </div>
    );
}

export default PriorityTasks;

