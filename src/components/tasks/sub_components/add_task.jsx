import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import plus from 'src/assets/add-task-plus.svg';
import cross from 'src/assets/cross.svg';
import createTaskThunk from 'src/store/thunks/create_task_thunk';
import { encryptObjectValues } from "src/utils/encryptionUtil";

const AddTask = () => {
    const [taskDetails, setTaskDetails] = useState({
        taskTitle: "",
        dueDate: "",
        priority: "",
        status: "",
        taskDescription: ""
    });

    const resetTaskDetails = () => {
        setTaskDetails({
            taskTitle: "",
            dueDate: "",
            priority: "",
            status: "",
            taskDescription: ""
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails({
            ...taskDetails,
            [name]: value
        });
    };

    const convertToUTC = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString();
    };

    

    const dispatch = useDispatch();

    async function handleCreateClick() {
        try 
        {

            const forEncryption = { taskTitle: taskDetails.taskTitle, taskDescription: taskDetails.taskDescription }
            const encryptedTaskDetails = encryptObjectValues(forEncryption);
            taskDetails.taskTitle = encryptedTaskDetails.taskTitle;
            taskDetails.taskDescription = encryptedTaskDetails.taskDescription;
            taskDetails.dueDate = convertToUTC(taskDetails.dueDate);
            const thunkToDispatch = createTaskThunk(taskDetails);

            const response = await dispatch(thunkToDispatch);
            console.log(response);
        }catch (error) {
            console.error('Error occurred while dispatching thunk:', error);
        }
        resetTaskDetails();

    }
    const handleCancelClick = () => {
        resetTaskDetails();
    };

    useEffect(() => {
        return () => {
            resetTaskDetails();
        }
    }, [])

    return (
        <div id='popup' onClick={handleCancelClick}>
            <div id='add-task-div' style={{opacity: '1'}}>
                <div className='add-task-header'>
                    <div className='add-case'>
                        <img src={plus} alt='plus sign' /> Add Case
                    </div>
                    <a href='#'><img src={cross} alt='cross' className='add-task-cross'/></a>
                </div>
                <div className='add-task-details-div'>
                    <form className='add-task-details'>
                        <div className='add-task-input-title'>Task Title</div>
                        <input type='text' value={taskDetails.taskTitle} name='taskTitle' onChange={handleInputChange}  />
                        <div className='add-task-input-title'>Due Date</div>
                        <input type='date' value={taskDetails.dueDate} name='dueDate' onChange={handleInputChange}  />
                        <div className='add-task-input-title'>Priority</div>
                        <select value={taskDetails.priority} name='priority' onChange={handleInputChange}>
                            <option selected>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                        <div className='add-task-input-title'>Status</div>
                        <select value={taskDetails.status} name='status' onChange={handleInputChange}>
                            <option selected>Not Started</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Pending</option>
                        </select>
                        <div className='add-task-input-title'>Task Description</div>
                        <textarea rows={4} type='text' value={taskDetails.taskDescription} name='taskDescription' onChange={handleInputChange}  />
                    </form>
                </div>
                <div className='add-task-controls-div'>
                    <div className="add-task-controls">
                        <button className='cancel-button'>
                            <a id='cancel-link' href='#' onClick={handleCancelClick}>
                                Cancel
                            </a>
                        </button>
                        
                            <a className='primary-button' id='modal-add-task-btn' href='#' onClick =  { handleCreateClick }>
                                Create Task
                            </a>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTask;