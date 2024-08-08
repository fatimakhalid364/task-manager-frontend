import { Box, Button, FormControl, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { styled } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import plus from 'src/assets/add-task-plus.svg';
import cross from 'src/assets/cross.svg';
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import createTaskThunk from 'src/store/thunks/create_task_thunk';
import { encryptObjectValues } from 'src/utils/encryptionUtil';

const MyComponent = styled('div')({
    position: 'relative',
    height: '600px',
    width: '550px',
    top: '50%',
    left: '52%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    backgroundColor: 'var(--neutral-background-color)',
    border: '1px solid var(--modal-border-color)',
    opacity: '1',
    padding: '15px',
});
const CssTextField = styled((props) => <MobileDateTimePicker {...props} />)(({ theme }) => ({
    '& .MuiInputBase-input': {
        border: 'none',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
        '&:hover fieldset': {
            border: `1px solid #3B8AFF`,
        },
        '&.Mui-focused fieldset': {
            border: `2px solid #3B8AFF`,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #D1D5DB',
        },
    },
}));

const AddTask = ({ open, handleClose, getAllTasks }) => {
    const [taskDetails, setTaskDetails] = useState({
        taskTitle: '',
        dueDate: dayjs(),
        priority: 'HIGH',
        status: 'NOT_STARTED',
        taskDescription: ''
    });

    const resetTaskDetails = () => {
        setTaskDetails({
            taskTitle: '',
            dueDate: dayjs(),
            priority: 'HIGH',
            status: 'NOT_STARTED',
            taskDescription: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setTaskDetails((prevDetails) => ({
            ...prevDetails,
            dueDate: date
        }));
    };

    const convertToUTC = (date) => {
        return date.toISOString();
    };

    const dispatch = useDispatch();

    const handleCreateClick = async () => {
        try {
            handleClose();
            const forEncryption = {
                taskTitle: taskDetails.taskTitle,
                taskDescription: taskDetails.taskDescription
            };
            const encryptedTaskDetails = encryptObjectValues(forEncryption);

            const updatedTaskDetails = {
                ...taskDetails,
                taskTitle: encryptedTaskDetails.taskTitle,
                taskDescription: encryptedTaskDetails.taskDescription,
                dueDate: convertToUTC(taskDetails.dueDate)
            };

            const thunkToDispatch = createTaskThunk(updatedTaskDetails);
            const response = await dispatch(thunkToDispatch).unwrap();
            if (response.status === 201) {
                successToast(response.message, 'task-created');
                resetTaskDetails();
                getAllTasks(); // Get all tasks
            } else {
                errorToast('Something went wrong', 'authentication-pages-error');
                resetTaskDetails();
            }
        } catch (error) {
            console.error('Error occurred while dispatching thunk:', error);
            errorToast(error.message, 'authentication-pages-error');
            resetTaskDetails();
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose} // Ensure the modal can be closed by clicking outside
        >
            <MyComponent>
                <div>
                    <div className='add-task-header'>
                        <div className='add-case'>
                            <img src={plus} alt='plus sign' /> Add Case
                        </div>
                        <a onClick={handleClose}><img src={cross} alt='cross' className='add-task-cross' /></a>
                    </div>
                    <div className='add-task-details-div'>
                        <form className='add-task-details'>
                            <div className='add-task-input-title'>Task Title</div>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={taskDetails.taskTitle}
                                name='taskTitle'
                                onChange={handleInputChange}
                            />
                            <div className='add-task-input-title'>Due Date</div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <CssTextField
                                    value={taskDetails.dueDate}
                                    onChange={handleDateChange}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </LocalizationProvider>
                            <div className='add-task-input-title'>Priority</div>
                            <FormControl fullWidth>
                                <Select
                                    value={taskDetails.priority}
                                    name='priority'
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="HIGH">High</MenuItem>
                                    <MenuItem value="MEDIUM">Medium</MenuItem>
                                    <MenuItem value="LOW">Low</MenuItem>
                                </Select>
                            </FormControl>
                            <div className='add-task-input-title'>Status</div>
                            <FormControl fullWidth>
                                <Select
                                    value={taskDetails.status}
                                    name='status'
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="NOT_STARTED">Not Started</MenuItem>
                                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                                    <MenuItem value="COMPLETED">Completed</MenuItem>
                                    <MenuItem value="PENDING">Pending</MenuItem>
                                </Select>
                            </FormControl>
                            <div className='add-task-input-title'>Task Description</div>
                            <TextareaAutosize
                                minRows={4}
                                p={2}
                                style={{ width: '100%' }}
                                value={taskDetails.taskDescription}
                                name='taskDescription'
                                onChange={handleInputChange}
                            />
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button
                                    variant="contained"
                                    onClick={handleClose}
                                    color={'secondary'}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleCreateClick}
                                >
                                    Create Task
                                </Button>
                            </Box>
                        </form>
                    </div>
                </div>
            </MyComponent>
        </Modal>
    );
}

export default AddTask;
