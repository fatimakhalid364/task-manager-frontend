import { Box } from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FilterDialog from 'src/components//Filter/FilterDialog';
import BottomBar from 'src/components/BottomBar/BottomBar';
import BottomButtons from "src/components/BottomButtons";
import FilterButton from "src/components/Filter/FilterButton";
import MainDiv from "src/components/maindiv/maindiv";
import PageHeader from 'src/components/PageHeader';
import AddTask from "src/components/tasks/sub_components/add_task";
import 'src/components/tasks/sub_components/tasks.css';
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { useResponsive } from 'src/constants/media_queries';
import { getAllTasksThunk } from 'src/store/thunks/taskThunks';
import { decryptSingleValues } from 'src/utils/encryptionUtil';
import TaskTable from './sub_components/TaskTable';
import { useSelector } from 'react-redux';
import { MobileBottomBar } from 'src/components/MobileBottomBar/MobileBottomBar';
import PlusIcon from 'src/components/icons/PlusIcon';



function Tasks() {
  
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState([]);
    const [skeletonLoader, setSkeletonLoader] = useState(false);
    const [metaData, setMetaData] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const handleFilterOpen = () => setFilterOpen(true);
    const handleFilterClose = () => setFilterOpen(false);
    const [doubleArrowClicked, setDoubleArrowClicked] = useState(false);
    const handleDoubleArrowClicked = () => setDoubleArrowClicked(prevValue => !prevValue);
    const privateKey = localStorage.getItem("privateKey");
    const user = useSelector(state => state);
    useEffect(() => {
       console.log('state is logged here ========>', user);
    }, []);

  

    const getAllTasks = async (page=0, limit=5) => {
        try {
            setSkeletonLoader(true);
            const params = { page, limit, search }
            const response = await dispatch(getAllTasksThunk(params)).unwrap();
            response?.data?.forEach(task => {
                task.taskTitle = decryptSingleValues(task.taskTitle, privateKey);
                task.taskDescription = decryptSingleValues(task.taskDescription, privateKey);
                if (Array.isArray(task.taskDescription)) {
                    task.taskDescription = task.taskDescription.join('');
                }
            });
            setTasks(response?.data);
            setMetaData(response?.metaData);
            successToast(response.message, 'task-created');
        } catch (err) {
            errorToast('Something went wrong', 'getTask-pages-error');
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
        debouncedGetAllTasks(page, limit);
    }, [page, limit, debouncedGetAllTasks]);

    

    return (
        <div className='task-page-div'>
            {open && (<AddTask open={open} handleClose={handleClose} getAllTasks={getAllTasks} />)}
            {filterOpen && (<FilterDialog filterOpen={filterOpen} handleFilterClose={handleFilterClose} />)}
            <MainDiv>
                <div className='task-page' style={{ width: (onWholeScreen) && '98%' }}>
                    <PageHeader handleOpen={ handleOpen } total={ metaData?.total } text='All Tasks' object='Task'/>
                    <div>
                        <FilterButton handleFilterOpen={handleFilterOpen}/>
                    </div>
                    <Box mt={3} mb={4}>
                        <TaskTable tasks={tasks} limit={limit} privateKey={privateKey} setTasks={setTasks} page={metaData?.page} setLimit={setLimit} setPage={setPage} getAllTasks={getAllTasks} hasNextPage={metaData?.hasNextPage} hasPreviousPage={metaData?.hasPrevPage} nextPage={metaData?.nextPage} setMetaData={setMetaData} metaData={metaData} previousPage={metaData?.previousPage} totalPages={metaData?.totalPages} skeletonLoader={skeletonLoader} />
                    </Box>
                </div>
                <BottomButtons handleOpen={ handleOpen } handleFilterOpen = { handleFilterOpen }/>
                { (!isAdaptableScreen && !isMicroScreen) && <BottomBar handleOpen={ handleOpen } handleFilterOpen = { handleFilterOpen } />}
              
                { (isMicroScreen && !isAdaptableScreen) && (<div className="circle-2">
                <div style={{width: '100%', borderRadius: '50px', display: 'flex', marginTop: '24px', justifyContent: 'center'}}
                onClick={handleOpen}>
                <PlusIcon color='white' width='17' height='17' />
                </div>
            </div>)}
            </MainDiv>
            
        </div>
    );
}

export default Tasks;

