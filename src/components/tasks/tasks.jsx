import { useState } from 'react';
import { useDispatch } from 'react-redux';
import plus from 'src/assets/plus.svg';
import MainDiv from "src/components/maindiv/maindiv";
import AddTask from "src/components/tasks/sub_components/add_task";
import 'src/components/tasks/sub_components/tasks.css';
import getAllTasksThunk from 'src/store/thunks/get_all_tasks_thunk';

import { Box } from '@mui/material';
import { useEffect } from 'react';
import TaskTable from './sub_components/TaskTable';

function Tasks() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const fetchData = async () => {
        // Prevent form submission
        try {
            const thunkToDispatch = getAllTasksThunk({ search: 'ali' });
            const response = await dispatch(thunkToDispatch).unwrap();
            console.log(response);
           

        } catch (error) {
            console.error('Error occurred while dispatching thunk:', error);
        }
    };

    useEffect(() => {
        fetchData();
      }, []);

    return <div className='task-page-div'>
    {open && (<AddTask open={open} handleClose={handleClose}/>)}

        <MainDiv>
            <div className='task-page'>
                <div className='task-page-top'>
                    <div className="task-page-top-header">
                        <div className='all-tasks'>
                            All Tasks
                        </div>
                        <div className="number-of-tasks">
                            (43)
                        </div>
                    </div>
                    <a className='primary-button' onClick={handleOpen}>
                        <img src={plus} alt='plus-sign' className='plus-sign' /> Add Task
                    </a>
                </div>
                <Box mt={3}>
                    <TaskTable />

                </Box>
            </div>

            
        </MainDiv>
        
        </div>
}

export default Tasks;