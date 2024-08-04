import { Box } from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import plus from 'src/assets/plus.svg';
import MainDiv from "src/components/maindiv/maindiv";
import AddTask from "src/components/tasks/sub_components/add_task";
import 'src/components/tasks/sub_components/tasks.css';
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { useResponsive } from 'src/constants/media_queries';
import { getAllTasksThunk } from 'src/store/thunks/taskThunks';
import { decryptSingleValues } from 'src/utils/encryptionUtil';
import TaskTable from './sub_components/TaskTable';

function Tasks() {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(4);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState([]);
    const [skeletonLoader, setSkeletonLoader] = useState(false);
    const [metaData, setMetaData] = useState([]);

    const getAllTasks = async (page = 0, limit = 4) => {
        try {
            setSkeletonLoader(true);
            const response = await dispatch(getAllTasksThunk({ page, limit })).unwrap();
            const privateKey = localStorage.getItem("privateKey");
            response?.data?.forEach(task => {
                task.taskTitle = decryptSingleValues(task.taskTitle, privateKey);
                task.taskDescription = decryptSingleValues(task.taskDescription, privateKey);
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
            <MainDiv>
                <div className='task-page' style={{ width: (onWholeScreen) && '98%' }}>
                    <div className='task-page-top'>
                        <div className="task-page-top-header" style={{ marginLeft: onWholeScreen && '16px' }}>
                            <div className='all-tasks' style={{ fontSize: !isAdaptableScreen && '20px' }}>
                                All Tasks
                            </div>
                            <div className="number-of-tasks" style={{ fontSize: !isAdaptableScreen && '20px' }}>
                                ({metaData?.total})
                            </div>
                        </div>
                        <a className='primary-button' onClick={handleOpen} style={{
                            borderRadius: (onWholeScreen) && '50%',
                            height: (onWholeScreen) && '40px',
                            width: (onWholeScreen) && '40px',
                            position: (onWholeScreen) && 'absolute',
                            bottom: (onWholeScreen) && '20px',
                            left: (onWholeScreen) && '46%'
                        }}>

                            {onWholeScreen ? (<img src={plus} alt='plus-sign' className='plus-sign' />) : (
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <img src={plus} alt='plus-sign' className='plus-sign' /> <div style={{ fontSize: '16px' }}>Add Task</div>
                                </div>)}
                        </a>
                    </div>
                    <Box mt={3}>
                        <TaskTable tasks={tasks} limit={limit} page={page} setLimit={setLimit} setPage={setPage} getAllTasks={getAllTasks} skeletonLoader={skeletonLoader} />
                    </Box>
                </div>
            </MainDiv>
        </div>
    );
}

export default Tasks;
