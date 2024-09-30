import { Box, FormControl, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { styled } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import plus from 'src/assets/add-task-plus.svg';
import cross from 'src/assets/cross.svg';
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { useResponsive } from 'src/constants/media_queries';
import createTaskThunk from 'src/store/thunks/create_task_thunk';
import { encryptArrayValues, encryptObjectValues } from "src/utils/encryptionUtil";


const CssInputField = styled((props) => <TextField {...props} />)(({ theme }) => ({
    '& .MuiInputBase-input': {
        border: 'none',
    },
    '& .MuiOutlinedInput-root': {

        '&:hover fieldset': {
            border: '1px solid var(--primary-background-color)',
        },
        '&.Mui-focused fieldset': {
            border: '1px solid var(--primary-background-color)',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #D1D5DB',
        },
        height: '40px',
        borderRadius: '8px',
        padding: '4px',
        '& input': {
            padding: '4px',
        },
    },
}));
const CssDateField = styled((props) => <MobileDateTimePicker {...props} />)(({ theme }) => ({
    '& .MuiInputBase-root': {
        borderRadius: '8px',

        '&:hover fieldset': {
            border: '1px solid var(--primary-background-color)',
        },
        '&.Mui-focused fieldset': {
            border: '1px solid var(--primary-background-color)',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #D1D5DB',
        },
    },
    '& .MuiInputBase-input': {
        border: 'none',
    },
    borderRadius: '8px',

}));

const CssSelectField = styled((props) => <Select {...props} />)(({ theme }) => ({
    '& .MuiSelect-select': {
        '&:hover fieldset': {
            border: '1px solid var(--primary-background-color)',
        },
        '&.Mui-focused fieldset': {
            border: '1px solid var(--primary-background-color)',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #D1D5DB',
        },
    },
    '& .MuiOutlinedInput-root': {

        '&:hover fieldset': {
            border: '1px solid var(--primary-background-color)',
        },
        '&.Mui-focused fieldset': {
            border: '1px solid var(--primary-background-color)',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #D1D5DB',
        },
        height: '40px',
        borderRadius: '8px',
        padding: '4px',
        '& input': {
            padding: '4px',
        },
    },
    borderRadius: '8px',

}));



const AddTask = ({ open, handleClose, getAllTasks, debouncedGetAllTasks, limit,  taskDetailsToEdit, taskEdit,  handleTaskEdit }) => {
    const {
        isAdaptableScreen,
        onWholeScreen,
        isMicroScreen,
    } = useResponsive();

    const MyComponent = styled('div')({
        position: 'relative',
        height: '600px',
        width: isMicroScreen ? '350px' : '550px',
        top: '50%',
        left: isMicroScreen ? '50%' : '52%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        backgroundColor: 'var(--neutral-background-color)',
        border: '1px solid var(--modal-border-color)',
        opacity: '1',
        padding: '15px',
    });

    const handleTaskEditFalse = () => {
        handleTaskEdit();
    }
    const [taskDetails, setTaskDetails] = useState({
        taskTitle: '',
        dueDate: dayjs(),
        priority: 'HIGH',
        status: 'NOT_STARTED',
        taskDescription: ''
    });
    const accentColor = useSelector((state) => state.appearance.color);
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    }

    const handleMouseLeave = () => {
        setHovered(false);
    }


    

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
            // taskEdit && handleReverseTaskEdit();
            const splitDesc = taskDetails.taskDescription.match(/.{1,32}/g);
            const encryptedDesc = encryptArrayValues(splitDesc);
            const forEncryption = {
                taskTitle: taskDetails.taskTitle,
                // taskDescription: taskDetails.taskDescription
            };
            const encryptedTaskDetails = encryptObjectValues(forEncryption);

            const updatedTaskDetails = {
                ...taskDetails,
                taskTitle: encryptedTaskDetails.taskTitle,
                taskDescription: encryptedDesc,
                dueDate: convertToUTC(taskDetails.dueDate)
            };

            console.log('updated-task-details-------------------> ', updatedTaskDetails);

            const thunkToDispatch = createTaskThunk(updatedTaskDetails);
            const response = await dispatch(thunkToDispatch).unwrap();
            if (response.status === 201) {
                successToast(response.message, 'task-created');
                resetTaskDetails();
                debouncedGetAllTasks(0, limit); 
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
            <div className='add-task-div' style={{width: isMicroScreen ? '350px' : '550px',  left: isMicroScreen ? '50%' : '52%', }}>
                <div>
                    <div className='add-task-header'>
                        <div className='add-case'>
                            <img src={plus} alt='plus sign' /> Add Case
                        </div>
                        <a onClick={handleClose}><img src={cross}  alt='cross' className='add-task-cross' /></a>
                    </div>
                    <div className='add-task-details-div'>
                        <form className='add-task-details'>
                            <div className='add-task-input-title'>Task Title</div>
                            <input
                                type="text"
                                style= {{height: '40px', width: '100%'}}
                                value={taskEdit ? taskDetailsToEdit.taskTitle : taskDetails.taskTitle}
                                name="taskTitle"
                                onChange={handleInputChange}
                            />
                            <div className='add-task-input-title'>Due Date</div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <CssDateField
                                    value={ taskEdit ? dayjs(taskDetailsToEdit.dueDate) : taskDetails.dueDate}
                                    onChange={handleDateChange}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </LocalizationProvider>
                            <div className='add-task-input-title'>Priority</div>
                            <FormControl fullWidth>
                                <CssSelectField
                                    sx={{
                                        height: '40px',
                                        "&:hover": {
                                            "&& fieldset": {
                                                border:'1px solid var(--primary-background-color)',

                                            }
                                        }
                                    }}
                                    value={ taskEdit ? taskDetailsToEdit.priority : taskDetails.priority}
                                    name='priority'
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="HIGH">High</MenuItem>
                                    <MenuItem value="MEDIUM">Medium</MenuItem>
                                    <MenuItem value="LOW">Low</MenuItem>
                                </CssSelectField>
                            </FormControl>
                            <div className='add-task-input-title'>Status</div>
                            <FormControl fullWidth>
                                <CssSelectField
                                    sx={{
                                        height: '40px',
                                        "&:hover": {
                                            "&& fieldset": {
                                                border: '1px solid var(--primary-background-color)',

                                            }
                                        }
                                    }}
                                    value={ taskEdit ? taskDetailsToEdit.status : taskDetails.status}
                                    name='status'
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="NOT_STARTED">Not Started</MenuItem>
                                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                                    <MenuItem value="COMPLETED">Completed</MenuItem>
                                    <MenuItem value="PENDING">Pending</MenuItem>
                                </CssSelectField>
                            </FormControl>
                            <div className='add-task-input-title'>Task Description</div>
                            <TextareaAutosize
                                maxRows={7}
                                minRows={7}
                                p={2}
                                style={{ width: '100%', overflowY: 'scroll', border: hovered && '1px solid var(--primary-background-color)', padding: '5px'  }}
                                value={ taskEdit ? taskDetailsToEdit.taskDescription : taskDetails.taskDescription}
                                name='taskDescription'
                                onChange={handleInputChange}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}

                            />
                            <Box display="flex" justifyContent="right" mt={2}>
                                <div
                                    className='filter-button'
                                  
                                    onClick={handleClose}
                                    style={{ color: '#D1D5DB', border: '1px solid #D1D5DB', width: '95px', height: '40px', borderRadius: '28px', marginRight: '10px', textTransform: 'capitalize' }}
                                >
                                    Cancel
                                </div>
                                <div
                                    className='primary-button'
                                   
                                    onClick={handleCreateClick}
                                    style={{
                                        borderRadius: '28px', padding: '8px  8px ', textSizeAdjust: '14px', width: '126px', fontSize: '14px', textTransform: 'capitalize', backgroundColor: 'var(--primary-background-color)',
                                        fontWeight: '400', 
                                        fontFamily: 'var(--primary-font-family)'
                                    }}
                                >
                                    {taskEdit ? 'Update Task' : 'Create Task'}
                                </div>
                            </Box>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AddTask;
