import plus from 'src/assets/add-task-plus.svg';
import cross from 'src/assets/cross.svg';
import { useState } from 'react';
import { decryptObjectValues, encryptObjectValues } from "src/utils/encryptionUtil";
import createTaskThunk from 'src/store/thunks/create_task_thunk';
import { useDispatch } from 'react-redux';

function AddTask() {
    const [taskDetails, setTaskDetails] = useState({
        taskTitle: "",
        dueDate: "",
        priority: "",
        status: "",
        taskDescription: ""
    });

    function handleInputChange(event) {
        const { value, name } = event.target;
        setTaskDetails((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    

    const dispatch = useDispatch();

    async function handleCreateClick() {
        try 
        {
            const encryptedTaskDetails = encryptObjectValues(taskDetails);
            const thunkToDispatch = createTaskThunk(encryptedTaskDetails);
            const response = await dispatch(thunkToDispatch);
            return response;
        }catch (error) {
            console.error('Error occurred while dispatching thunk:', error);
        }

    }

    return (
        <div id='popup'>
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
                        <input type='text' value={taskDetails.dueDate} name='dueDate' onChange={handleInputChange}  />
                        <div className='add-task-input-title'>Priority</div>
                        <input type='text' value={taskDetails.priority} name='priority' onChange={handleInputChange}  />
                        <div className='add-task-input-title'>Status</div>
                        <input type='text' value={taskDetails.status} name='status' onChange={handleInputChange} />
                        <div className='add-task-input-title'>Task Description</div>
                        <textarea rows={5} type='text' value={taskDetails.taskDescription} name='taskDescription' onChange={handleInputChange}  />
                    </form>
                </div>
                <div className='add-task-controls-div'>
                    <div className="add-task-controls">
                        <button className='cancel-button'>
                            <a id='cancel-link' href='#'>
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