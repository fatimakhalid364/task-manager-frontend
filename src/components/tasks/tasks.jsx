import { Box } from '@mui/material';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterDialog from 'src/components//Filter/FilterDialog';
import BottomBar from 'src/components/BottomBar/BottomBar';
import BottomButtons from "src/components/BottomButtons";
import FilterButton from "src/components/Filter/FilterButton";
import PlusIcon from 'src/components/icons/PlusIcon';
import MainDiv from "src/components/maindiv/maindiv";
import PageHeader from 'src/components/PageHeader';
import AddTask from "src/components/tasks/sub_components/add_task";
import 'src/components/tasks/sub_components/tasks.css';
import { errorToast } from 'src/components/toasters/toast.js';
import { useResponsive } from 'src/constants/media_queries';
import { getAllTasksThunk } from 'src/store/thunks/taskThunks';
import TaskTable from './sub_components/TaskTable';




function Tasks() {
  
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const [skeletonLoader, setSkeletonLoader] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const handleFilterOpen = () => setFilterOpen(true);
    const handleFilterClose = () => setFilterOpen(false);
    const [doubleArrowClicked, setDoubleArrowClicked] = useState(false);
    const handleDoubleArrowClicked = () => setDoubleArrowClicked(prevValue => !prevValue);
    const privateKey = localStorage.getItem("privateKey");
    const statusObj = useSelector((state) => state.filterByStatus.checkboxStates);
    const priorityObj = useSelector((state) => state.filterByStatus.priorityCheckboxStates);
    const dueDate = useSelector((state) => state.filterByStatus.dueDateValueForTasks);
    const [taskEdit, setTaskEdit] = useState(false);
    const [reseting, setReseting] = useState(false);
    const handleTaskEdit = () => {
        setTaskEdit(true);
    }
    const handleReverseTaskEdit = () => {
        setTaskEdit(false);
    }
    console.log('tasks in the component', tasks)

    const extractCheckedValues = (obj) => {
        return Object.keys(obj).filter(key => obj[key] === true);
    };

    const getAllTasks = async (page=0, limit=5) => {
        try {

            setSkeletonLoader(true);
            const status = extractCheckedValues(statusObj);
            const priority = extractCheckedValues(priorityObj);
            const params = { page, limit, search, status, priority, priorityObj, statusObj, dueDate };
            const response = await dispatch(getAllTasksThunk(params)).unwrap();
            console.log('tasks in the component', response.tasks,
                'statusObj in the tasks areee/////', statusObj
            );
        } catch (err) {
            errorToast('Something went wrong', 'getTask-pages-error');
            console.log('error in tasks', err)
        } finally {
            setSkeletonLoader(false);
            
        }
    };

    useEffect(() => {
        console.log('priorityObjArrayforDispatch in tasks is......', statusObj,
            'statusArrayfordispatch is in tasks', priorityObj,
           );
    }, [getAllTasks])

    const {
        isAdaptableScreen,
        onWholeScreen,
        isMicroScreen,
    } = useResponsive();

    const debouncedGetAllTasks = useCallback(
        debounce((page, limit) => {
            getAllTasks(page, limit);
        }, 300),
        [statusObj, priorityObj, page, limit, dueDate, search, reseting]
    );
   
    useEffect(() => {
        if (!tasks.loaded) {
            getAllTasks(page, limit, search);
        }
    }, []);

   

    useEffect(() => {
        console.log('value of taskEdit is....................', taskEdit);
        
     }, [handleTaskEdit]);

    const [taskDetailsToEdit, setTaskDetailsToEdit] = useState({
        taskTitle: '',
        dueDate: dayjs(),
        priority: 'HIGH',
        status: 'NOT_STARTED',
        taskDescription: ''
    });

    const handleAddTaskOpen = () => {
        handleReverseTaskEdit();
        handleOpen();
    }

    

    return (
        <div className='task-page-div' >
            {open && (<AddTask 
            debouncedGetAllTasks={debouncedGetAllTasks} 
            limit={limit} 
            open={open} 
            handleClose={handleClose} 
            getAllTasks={getAllTasks}
            taskDetailsToEdit={taskDetailsToEdit}
            taskEdit={taskEdit}
            handleTaskEdit ={handleTaskEdit }
            setTaskDetailsToEdit={setTaskDetailsToEdit}
            />)}
            {filterOpen && (<FilterDialog 
                setSkeletonLoader={setSkeletonLoader}
            filterOpen={filterOpen} 
            handleFilterClose={handleFilterClose} 
            getAllTasks={getAllTasks} 
            debouncedGetAllTasks={debouncedGetAllTasks}
            limit={limit} />)}
            <MainDiv>
                <div className='task-page' style={{ width: (onWholeScreen) && '98%' }}>
                    <PageHeader handleOpen={handleAddTaskOpen}  handleReverseTaskEdit={ handleReverseTaskEdit} total={tasks.metaData.total} text='All Tasks' object='Task' />
                    <div>
                        <FilterButton handleFilterOpen={handleFilterOpen}/>
                    </div>
                    <Box mt={3} mb={4}>
                        <TaskTable 
                        debouncedGetAllTasks={debouncedGetAllTasks} 
                        tasks={tasks.tasks} 
                        limit={limit} 
                        privateKey={privateKey} 
                        page={tasks.metaData.page} 
                        setLimit={setLimit} 
                        setPage={setPage} 
                        getAllTasks={getAllTasks} 
                        hasNextPage={tasks.metaData.hasNextPage} 
                        hasPreviousPage={tasks.metaData.hasPrevPage} 
                        nextPage={tasks.metaData.nextPage} 
                        metaData={tasks.metaData} 
                        previousPage={tasks.metaData.previousPage} 
                        totalPages={tasks.metaData.totalPages} 
                        skeletonLoader={skeletonLoader} 
                        taskEdit={taskEdit}
                        handleTaskEdit={handleTaskEdit}
                        handleOpen={handleOpen}
                        setTaskDetailsToEdit={setTaskDetailsToEdit}
                        handleReverseTaskEdit={handleReverseTaskEdit}/>
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

export { Tasks };

