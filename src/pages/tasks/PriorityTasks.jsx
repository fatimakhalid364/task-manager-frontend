
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomButtons from "src/components/BottomButtons";
import MainDiv from "src/components/maindiv/maindiv";
import PageHeader from 'src/components/PageHeader';
import AddTask from "src/components/tasks/sub_components/add_task";
import 'src/components/tasks/sub_components/tasks.css';
import TaskTable from 'src/components/tasks/sub_components/TaskTable';
import { errorToast } from 'src/components/toasters/toast.js';
import { useResponsive } from 'src/constants/media_queries';
import { getPriorityTasksThunk } from 'src/store/thunks/taskThunks';
import { setPriorityTasks } from 'src/store/slices/priorityTaskSlice';
import { setHighPriorityTasks } from 'src/store/slices/highPriorityTasks';
import { setMediumPriorityTasks } from 'src/store/slices/mediumPriorityTasks';
import { setLowPriorityTasks } from 'src/store/slices/lowPriorityTasks';
import { useLocation } from 'react-router-dom';


function PriorityTasks() {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const priorityTasks = useSelector((state) => state.priorityTask);
    const highPriorityTasks = useSelector((state) => state.highPriorityTasks.highPriorityTasks);
    const mediumPriorityTasks = useSelector((state) => state.mediumPriorityTasks.mediumPriorityTasks);
    const lowPriorityTasks = useSelector((state) => state.lowPriorityTasks.lowPriorityTasks);
    
  

    const [skeletonLoader, setSkeletonLoader] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const handleFilterOpen = () => setFilterOpen(true);
    const privateKey = localStorage.getItem("privateKey");
    console.log('priorityTasks in the component', priorityTasks)
    const [priorityTaskEdit, setPriorityTaskEdit] = useState(true);
    const handlePriorityTaskEdit = () => {
        setPriorityTaskEdit(false);
    }

    const handleReverseTaskEdit = () => {
        setPriorityTaskEdit(true);
    }

    const handleAddTaskOpen = () => {
        handleReverseTaskEdit();
        handleOpen();
    }

    const [taskDetailsToEdit, setTaskDetailsToEdit] = useState({
        taskTitle: '',
        dueDate: dayjs(),
        priority: 'HIGH',
        status: 'NOT_STARTED',
        taskDescription: ''
    });


    // const getAllTasks = async (page = 0, limit = 5) => {
    //     try {

    //         setSkeletonLoader(true);
    //         const params = { page, limit, search, priority }
    //         const response = await dispatch(getPriorityTasksThunk(params)).unwrap();
    //         pathname == '/tasks_high' ? dispatch(setHighPriorityTasks(response.data)) : 
    //         pathname == '/tasks_low' ? dispatch(setLowPriorityTasks(response.data)) :
    //         dispatch(setMediumPriorityTasks(response.data)); 
    //         console.log('priority tasks in the component', response);
    //     } catch (err) {
    //         errorToast('Something went wrong', 'getTask-pages-error');
    //         console.log('error in tasks', err)
    //     } finally {
    //         setSkeletonLoader(false);
    //     }
    // };

    const getHighTasks = async (page = 0, limit = 5) => {
        try {

            setSkeletonLoader(true);
            const params = { page, limit, search, priority: 'HIGH' }
            const response = await dispatch(getPriorityTasksThunk(params)).unwrap();
            dispatch(setHighPriorityTasks(response.data));  
            console.log('priority tasks in the component', response);
        } catch (err) {
            errorToast('Something went wrong', 'getTask-pages-error');
            console.log('error in tasks', err)
        } finally {
            setSkeletonLoader(false);
        }
    };

    const getMediumTasks = async (page = 0, limit = 5) => {
        try {

            setSkeletonLoader(true);
            const params = { page, limit, search, priority: 'MEDIUM' }
            const response = await dispatch(getPriorityTasksThunk(params)).unwrap();
            dispatch(setMediumPriorityTasks(response.data)); 
            console.log('priority tasks in the component', response);
        } catch (err) {
            errorToast('Something went wrong', 'getTask-pages-error');
            console.log('error in tasks', err)
        } finally {
            setSkeletonLoader(false);
        }
    };

    const getLowTasks = async (page = 0, limit = 5) => {
        try {

            setSkeletonLoader(true);
            const params = { page, limit, search, priority: 'LOW' }
            const response = await dispatch(getPriorityTasksThunk(params)).unwrap();
           dispatch(setLowPriorityTasks(response.data));
            console.log('priority tasks in the component', response);
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
        if(!priorityTasks?.loaded ) {
            getAllTasks(page, limit, search);
        }
     
    }, []);

    useEffect(() => {
        console.log('value of taskEdit in priority is....................', priorityTaskEdit);
        
     }, [handlePriorityTaskEdit]);
    return (
        <div className='task-page-div' >
           
            <MainDiv>
                <div className='task-page' style={{ width: (onWholeScreen) && '98%' }}>
                    <PageHeader 
                    handleOpen={handleAddTaskOpen} 
                    handleReverseTaskEdit={handleReverseTaskEdit} 
                    showAdd={false} 
                    titleHead={priority == 'HIGH' ? 'Urgent' : priority == 'MEDIUM' ? 'Important' : 'Deferred'} 
                    total={priorityTasks?.priorityMetaData?.total} />
                    <div>
                        {/* <FilterButton handleFilterOpen={handleFilterOpen} /> */}
                    </div>
                    <Box mt={3} mb={4}>
                        <TaskTable 
                        priority={true} 
                        handleOpen={handleAddTaskOpen} 
                        handleTaskEdit={handlePriorityTaskEdit} 
                        setTaskDetailsToEdit={setTaskDetailsToEdit} 
                        handleReverseTaskEdit={handleReverseTaskEdit} 
                        debouncedGetAllTasks={debouncedGetAllTasks} 
                        tasks={
                            pathname == '/tasks_high' ?
                            highPriorityTasks :
                            pathname == '/tasks_low' ?
                            lowPriorityTasks :
                            mediumPriorityTasks} 
                        limit={limit} 
                        privateKey={privateKey} 
                        page={priorityTasks?.priorityMetaData?.page} 
                        setLimit={setLimit} 
                        setPage={setPage} 
                        getAllTasks={getAllTasks} 
                        hasNextPage={priorityTasks?.priorityMetaData?.hasNextPage} 
                        hasPreviousPage={priorityTasks?.priorityMetaData?.hasPrevPage} 
                        nextPage={priorityTasks?.priorityMetaData?.nextPage} 
                        priorityMetaData={priorityTasks?.priorityMetaData} 
                        previousPage={priorityTasks?.priorityMetaData?.previousPage} 
                        totalPages={priorityTasks?.priorityMetaData?.totalPages} 
                        skeletonLoader={skeletonLoader} />
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

