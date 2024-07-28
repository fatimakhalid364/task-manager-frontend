import { useState } from 'react';
import plus from 'src/assets/plus.svg';
import MainDiv from "src/components/maindiv/maindiv";
import AddTask from "src/components/tasks/sub_components/add_task";
import 'src/components/tasks/sub_components/tasks.css';

import { Box } from '@mui/material';
import TaskTable from './sub_components/TaskTable';

function Tasks() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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