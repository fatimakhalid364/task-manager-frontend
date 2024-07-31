import { useState } from 'react';
import { useDispatch } from 'react-redux';
import plus from 'src/assets/plus.svg';
import MainDiv from "src/components/maindiv/maindiv";
import AddTask from "src/components/tasks/sub_components/add_task";
import 'src/components/tasks/sub_components/tasks.css';
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { useResponsive } from 'src/constants/media_queries';
import { getAllTasksThunk } from 'src/store/thunks/taskThunks';
import { decryptSingleValues } from 'src/utils/encryptionUtil';



import { Box } from '@mui/material';
import TaskTable from './sub_components/TaskTable';

function Tasks() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [metaData, setMetaData] = useState([]);

    const getAllTasks = async () => {
        try {
          setSpinner(true);
          const response = await dispatch(getAllTasksThunk()).unwrap();
          console.log('----------->', response);
          const privateKey = localStorage.getItem("privateKey")
          response?.data?.forEach(task => {
            task.taskTitle = decryptSingleValues(task.taskTitle, privateKey);
            task.taskDescription = decryptSingleValues(task.taskDescription, privateKey);
          });
          console.log('----------->', response);
          setTasks(response?.data);
          setMetaData(response?.metaData)
          console.log('----------->', response);
          successToast(response.message, 'task-created');
    
          setSpinner(false);
        } catch (err) {
          console.log(err);
          errorToast('Something went wrong', 'getTask-pages-error');
    
          setSpinner(false);
        }
      }

    const {
        isAdaptableScreen,
        expandBar,
        onWholeScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
        onWholeScreen1
    } = useResponsive();

    // style={{width: onWholeScreen ? '95%' :  onWholeScreen1 ? '93%' : '97%'}}

    return <div className='task-page-div'>
    {open && (<AddTask open={open} handleClose={handleClose}/>)}

        <MainDiv>
            <div className='task-page' style={{width: (onWholeScreen ||  onWholeScreen1) && '98%'}}>
                <div className='task-page-top' >
                    <div className="task-page-top-header">
                        <div className='all-tasks'>
                            All Tasks
                        </div>
                        <div className="number-of-tasks">
                            ({metaData?.count})
                        </div>
                    </div>
                    <a className='primary-button' onClick={handleOpen} style={{
                        borderRadius: (onWholeScreen ||  onWholeScreen1) && '50%', 
                        height: (onWholeScreen ||  onWholeScreen1) && '40px', 
                        width: (onWholeScreen ||  onWholeScreen1) && '40px',
                        position: (onWholeScreen ||  onWholeScreen1) && 'absolute',
                        bottom: (onWholeScreen ||  onWholeScreen1) && '20px',
                        left: (onWholeScreen ||  onWholeScreen1) && '46%'}}>
                        
                        {onWholeScreen ||  onWholeScreen1 ? (<img src={plus} alt='plus-sign' className='plus-sign' />) : (
                            <div style={{display: 'flex', gap: '6px'}}>
                            <img src={plus} alt='plus-sign' className='plus-sign' /> <div style={{fontSize: '16px'}}>Add Task</div>
                            </div>) }
                    </a>
                </div>
                <Box mt={3}>
                    <TaskTable tasks={tasks} getAllTasks={getAllTasks} />

                </Box>
            </div>

            
        </MainDiv>
        
        </div>
}

export default Tasks;