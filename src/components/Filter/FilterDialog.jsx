import Modal from '@mui/material/Modal';
import { styled } from "@mui/system";
import { useEffect, useState,  useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cross from 'src/assets/cross.svg';
import filter from 'src/assets/filter.svg';
import fwdArrow from 'src/assets/fwd-arrow.svg';
import whiteTick from 'src/assets/white-tick.svg';
import { 
    setCheckboxState, 
    setCreationDateValueForNotes, 
    setCreationDateValueForTasks, 
    setDueDateValueForTasks, 
    setNotesFilterValue, 
    setValue, 
    setPriorityCheckboxState, 
    setPriorityFilterValue } from 'src/store/slices/filterByStatusSlice';
// import { setCheckboxState } from 'src/store/slices/checkboxSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import SearchGlass from 'src/components/icons/SearchGlass';
import { setTagsFilterList } from 'src/store/slices/notesSlice';
import 'src/components/Filter/FilterDialog.css';
import debounce from 'lodash.debounce';



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
        height: '10px',
        color: 'var(--quinary-font-color)',
        fontSize: '16px'
    
    },
    borderRadius: '8px',

}));


const FilterDialog = ({ filterOpen, handleFilterClose, notesArray, getAllTasks, debouncedGetAllTasks,  limit }) => {
    const location = useLocation();

    const pathname = location.pathname;

    const dispatch = useDispatch();



    const checkboxStates = useSelector((state) => state.filterByStatus.checkboxStates);

    const tagsFilterList = useSelector((state) => state.notes.tagsFilterList);

    const startDateForTasks = useSelector((state) => state.filterByStatus.dueDateValueForTasks.startDate);

    const priorityCheckboxes = useSelector((state) => state.filterByStatus.priorityCheckboxStates);
    
    const endDateForTasks = useSelector((state) => state.filterByStatus.dueDateValueForTasks.endDate);
    const creationDateValueForTasks = useSelector((state) => state.filterByStatus.creationDateValueForTasks);
    const creationDateValueForNotes = useSelector((state) => state.filterByStatus.creationDateValueForNotes);

    const statusArrayForDispatch = Object.keys(checkboxStates)
    .filter(key => checkboxStates[key]) 
    .map(key => key
        .replace('checkbox-', '') 
        .replace(/-/g, '_') 
        .toUpperCase() 
    );

    const priorityArrayForDispatch = Object.keys(priorityCheckboxes )
    .filter(key => priorityCheckboxes [key]) 
    .map(key => key
        .replace('checkbox-', '') 
        .replace(/-/g, '_') 
        .toUpperCase() 
    );

    let dueDateArrayForDispatch = [];
    dueDateArrayForDispatch.push(startDateForTasks);

    useEffect(() => {
        console.log('here is the dueDateValueForTasks', startDateForTasks, 'and', endDateForTasks)
    }, [])

    const filterByStatusValue = useSelector((state) => state.filterByStatus.value);

    const notesFilterByStatusValue = useSelector((state) => state.filterByStatus.notesFilterValue);

    const priorityFilterValue = useSelector((state) => state.filterByStatus.priorityFilterValue);
    const tasksArray = useSelector((state) => state.tasks.tasks);

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const timeFormat = useSelector((state) => state.format.timeFormat)
    const dateFormat = useSelector((state) => state.format.dateFormat)

    useEffect(() => {
        console.log('the notesFilterByStatusValue is =================', notesFilterByStatusValue)
    }, []);

    const [isStatusClicked, setIsStatusClicked] = useState(pathname == '/tasks' ? true : false);
    const [isDueDateClicked, setIsDueDateClicked] = useState(false);
    const [isCreationDateClicked, setIsCreationDateClicked] = useState(false);
    const [isTagsClicked, setIsTagsClicked] = useState(true);
    const [isPriorityClicked, setIsPriorityClicked] = useState(false);



    const handleStatusClick = () => {
        setIsStatusClicked(true);
        setIsDueDateClicked(false);
        setIsCreationDateClicked(false);
        setIsPriorityClicked(false);


    }

    const handleTagsClick = () => {
        setIsTagsClicked(true);
        setIsCreationDateClicked(false);
        setIsStatusClicked(false);
        setIsPriorityClicked(false);

    }

    const handleDueDateClick = () => {
        setIsStatusClicked(false);
        setIsDueDateClicked(true);
        setIsCreationDateClicked(false);
        setIsTagsClicked(false);
        setIsPriorityClicked(false);

    }

    const handlePriorityClick = () => {
        setIsStatusClicked(false);
        setIsDueDateClicked(false);
        setIsCreationDateClicked(false);
        setIsTagsClicked(false);
        setIsPriorityClicked(true);
    }

    const handleCreationDateClick = () => {
        setIsStatusClicked(false);
        setIsDueDateClicked(false);
        setIsCreationDateClicked(true);
        setIsTagsClicked(false);
    }




    const handleIncrement = () => {

        const checkboxes = document.querySelectorAll('.checkbox-status-input');



        const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

        dispatch(setValue(checkedCount > 0 ? checkedCount.toString() : '0'));



    };

    

    const handlePriorityIncrement = () => {

        const checkboxes = document.querySelectorAll('.checkbox-priority-input');



        const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

        dispatch(setPriorityFilterValue(checkedCount > 0 ? checkedCount.toString() : '0'));



    };

    const handleDueDateChange = (newValue, indicator) => {
        console.log('newValue and indicator are', newValue, indicator);
        dispatch(setDueDateValueForTasks({ date: newValue, indicator }));
    };

    const startDateValueForTasksObj = dayjs(startDateForTasks)
    const endDateValueForTasksObj = dayjs(endDateForTasks)

    const handleCreationDateChange = (newValue) => {
        dispatch(setCreationDateValueForTasks(newValue));
    };



    const creationDateValueForTasksObj = dayjs(creationDateValueForTasks);

    const handleCreationDateChangeForNotes = (newValue) => {
        dispatch(setCreationDateValueForNotes(newValue));
    };

    const creationDateValueForNotesObj = dayjs(creationDateValueForNotes);

    const handleNotesFilterIncrement = () => {
        const checkboxes = document.querySelectorAll('.checkbox-notes-filter-input');

        const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

        dispatch(setNotesFilterValue(checkedCount > 0 ? checkedCount.toString() : '0'));
    };



    const promptFilterResetAndClose = (page=0, limit, status) => {
        dispatch(setValue('0'));
        // dispatch(setDueDateValueForTasks(dayjs()));
        dispatch(setPriorityFilterValue('0'));
        dispatch(setDueDateValueForTasks({date: dayjs(), indicator: 'startDate'}));
        dispatch(setDueDateValueForTasks({date: dayjs(), indicator: 'endDate'}));
        dispatch(setCreationDateValueForTasks(dayjs()));
        Object.keys(checkboxStates).forEach(checkboxId => dispatch(setCheckboxState({ checkboxId, isChecked: false })));
        Object.keys(priorityCheckboxes).forEach(checkboxId => dispatch(setPriorityCheckboxState({ checkboxId, isChecked: false })));
       
        handleFilterClose();
        debouncedGetAllTasks(0, limit, status);
    }

    const promptNotesFilterResetAndClose = () => {
        dispatch(setNotesFilterValue('0'));
    
        Object.keys(tagsFilterList).forEach(checkboxId => dispatch(setTagsFilterList({ tag: checkboxId, checked: false })));
        handleFilterClose();
    }


    const handleCheckboxChange = (checkboxId, event) => {

        const isChecked = event.target.checked;




        dispatch(setCheckboxState({ checkboxId, isChecked }));


        console.log('Checkbox ID:', checkboxId, 'Checked:', isChecked);


        handleIncrement();
    };

    const handlePriorityCheckboxChange = (checkboxId, event) => {

        const isChecked = event.target.checked;




        dispatch(setPriorityCheckboxState({ checkboxId, isChecked }));


        console.log('Checkbox ID:', checkboxId, 'Checked:', isChecked);


        handlePriorityIncrement();
    };

    const handleNotesCheckboxChange = (event) => {
        const { id, checked } = event.target;
        dispatch(setTagsFilterList({ tag: id, checked }));
        handleNotesFilterIncrement();
    }

   

    // const debouncedApplyClick = useCallback(
    //     debounce((page, limit, status) => {
    //         getAllTasks(page, limit, status);
    //     }, 300),
    //     []
    // );

    const handleApplyClick =  (page=0, limit) => {
        debouncedGetAllTasks(0, limit);
        handleFilterClose(); 
    }

    const handleResetClick =  (page=0, limit) => {
        debouncedGetAllTasks(0, limit);
        handleFilterClose(); 
    }

    const startDateClearClick = () => {
        dispatch(setDueDateValueForTasks({date: dayjs(), indicator: 'startDate'}));
       
    }

    const endDateClearClick = () => {
        dispatch(setDueDateValueForTasks({date: dayjs(), indicator: 'endDate'}));
       
    }

    const creationDateClearClick = () => {
        pathname == '/tasks' ?
        dispatch(setCreationDateValueForTasks(dayjs())) : dispatch(setCreationDateValueForNotes(dayjs())) ;
    }

    

    useEffect(() => {
        console.log('priorityArrayforDispatch is......', priorityArrayForDispatch,
             'statusArrayfordispatch is', statusArrayForDispatch,
            'dueDateArrayforDispatch is', dueDateArrayForDispatch);
    }, [handleApplyClick])

    // const debouncedGetAllTasks = useCallback(
    //     debounce((page, limit) => {
    //         getAllTasks(page, limit);
    //     }, 300),
    //     []
    // );

    return (
        <Modal
            open={filterOpen}
        >
            <div className='add-filter-div'>
                <div className='add-filter-header-div'>
                    <div className='add-filter-header'>
                        <div className='add-filter'>
                            <img src={filter} alt='filter-sign' /> Filter
                        </div>
                        <a onClick={handleFilterClose}><img src={cross} alt='cross' className='add-task-cross' /></a>
                    </div>
                    <div style={{ fontFamily: 'var(--primary-font-family)', color: 'var(--tertiary-font-color)', fontSize: '14px' }}>
                        Select from the list of filters below
                    </div>
                </div>
                <div className='add-filter-content'>
                    <div className='filter-portion-1'>
                        <div className='filter-portion-1-menu' >
                            <div>{pathname == '/tasks' ? 'Status' : 'Tags'}</div>
                            <div style={{
                                height: '20px',
                                width: '20px',
                                borderRadius: '50px',
                                backgroundColor: 'var(--primary-background-color)',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '2px'
                            }}>{pathname == '/tasks' ? filterByStatusValue : notesFilterByStatusValue}</div>
                            <div className='fwd-arrow-circle' style={{ backgroundColor: (isStatusClicked || isTagsClicked) && 'var(--active-background-color)', cursor: 'pointer' }} onClick={pathname == '/tasks' ? handleStatusClick : handleTagsClick}>
                                <img src={fwdArrow} alt='forward-arrow' />
                            </div>
                        </div>
                        {pathname == '/tasks' && (<div className='filter-portion-1-menu'  >
                            <div>Priority</div>
                            <div style={{
                                height: '20px',
                                width: '20px',
                                borderRadius: '50px',
                                backgroundColor: 'var(--primary-background-color)',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '2px'
                            }}>{priorityFilterValue}</div>
                            <div className='fwd-arrow-circle' style={{ backgroundColor: isPriorityClicked && 'var(--active-background-color)', cursor: 'pointer' }} onClick={handlePriorityClick}>
                                <img src={fwdArrow} alt='forward-arrow' />
                            </div>
                        </div>)}
                        {pathname == '/tasks' && (<div className='filter-portion-1-menu'  >
                            <div>Due Date</div>
                            <div className='fwd-arrow-circle' style={{ backgroundColor: isDueDateClicked && 'var(--active-background-color)', cursor: 'pointer' }} onClick={handleDueDateClick}>
                                <img src={fwdArrow} alt='forward-arrow' />
                            </div>
                        </div>)}
                        
                    </div>
                    <div className='filter-portion-2'>
                        {isStatusClicked ? (<div style={{ width: '100%' }}>
                            {Object.keys(checkboxStates).map((checkboxId) => (
                                <div key={checkboxId} className={`${checkboxId}-filter`} style={{ width: '100%', padding: '10px', marginBottom: '0', display: 'flex', gap: '30px' }}>
                                    <label className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            className="checkbox-input checkbox-status-input"
                                            id={checkboxId}
                                            checked={checkboxStates[checkboxId]}
                                            onChange={(event) => handleCheckboxChange(checkboxId, event)}
                                        />
                                        <span className="checkbox-custom">
                                            <img src={whiteTick} alt='white-tick' />
                                        </span>
                                    </label>
                                    <div style={{ fontSize: '14px', fontFamily: 'var(--primary-font-family)', color: 'var(--quinary-font-color)', marginTop: '2px' }}>
                                        {checkboxId.replace('checkbox-', '').replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}

                                    </div>
                                </div>
                            ))}
                        </div>) :
                            isTagsClicked ? (
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <input
                                            type='text'
                                            placeholder='Search tags'
                                            className='filter-search-date-input'
                                            style={{
                                                marginTop: '15px',
                                                width: '85%',
                                                padding: '10px',
                                                borderRadius: '8px',
                                                height: '35px',
                                                border: '1px solid var(--field-border-color)',

                                            }} />
                                        <div style={{ position: 'absolute', top: '21px', left: '78%', cursor: 'pointer' }}>
                                            <SearchGlass color='var(--primary-background-color)' />
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', overflowY: 'scroll', height: '210px' }}>
                                        {/* Check if all notes have empty tags */}
                                        {notesArray?.every(note => note.tags.length === 0) ? (
                                            <div style={{ marginTop: '20px', width: '63%', fontFamily: 'var(--primary-font-family)', fontSize: '15px', color: 'var(--quinary-font-color)' }} >No tags added yet</div>
                                        ) : (
                                            notesArray?.map((note, index) => (
                                                <div key={index} >

                                                    {note.tags.length > 0 ? (
                                                        note.tags.map((tag) => (
                                                            <div style={{ marginLeft: '30px' }}>
                                                                <label className="checkbox-wrapper">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="checkbox-input checkbox-notes-filter-input"
                                                                        id={tag}
                                                                        checked={tagsFilterList[tag]}
                                                                        onChange={(event) => handleNotesCheckboxChange(event)}
                                                                    />
                                                                    <span className="checkbox-custom">
                                                                        <img src={whiteTick} alt='white-tick' />
                                                                    </span>
                                                                </label>
                                                                <div style={{ marginTop: '20px', marginLeft: '30px', fontFamily: 'var(--primary-font-family)', fontSize: '15px', color: 'var(--quinary-font-color)' }} >
                                                                    {tag}
                                                                </div>
                                                            </div>
                                                        ))


                                                    ) : null}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )
                                : isDueDateClicked ?
                                    (<div style={{ width: '100%', display: 'flex', flexDirection: 'column',  }}>

                                        <div style={{ width: '84%', height: '210px', overflowY: 'auto', scrollbarWidth: 'none', marginLeft: '14px', marginTop: '10px' }}>
                                            
                                            <div style={{marginBottom: '30px'}}>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <div style={{fontSize: '14px', 
                                                        color: 'var(--tertiary-font-color)', 
                                                        fontFamily: 'var(--primary-font-family)', 
                                                        marginBottom: '4px',
                                                       }}>Starting Date</div>
                                                    <div
                                                    onClick={startDateClearClick}
                                                    style={{
                                                        color: 'var(--quinary-font-color)', 
                                                        fontSize: '14px', 
                                                        fontFamily: 'var(--secondary-font-family)', 
                                                        textDecoration: 'underline', 
                                                        cursor: 'pointer'}}>Clear</div>
                                                   
                                                </div>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <CssDateField
                                                        value={startDateValueForTasksObj}
                                                        onChange={ (newValue) => handleDueDateChange (newValue, 'startDate')}
                                                        slotProps={{ textField: { fullWidth: true }, placeholder: 'Select the start date for your range...'  }}
                                                    />
                                                </LocalizationProvider>
                                            </div>

                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div style={{fontSize: '14px', 
                                                        color: 'var(--tertiary-font-color)', 
                                                        fontFamily: 'var(--primary-font-family)', 
                                                        marginBottom: '4px',
                                                       }}>Ending Date</div>
                                                    <div
                                                     onClick={endDateClearClick}
                                                    style={{
                                                        color: 'var(--quinary-font-color)', 
                                                        fontSize: '14px', 
                                                        fontFamily: 'var(--secondary-font-family)', 
                                                        textDecoration: 'underline', 
                                                        cursor: 'pointer'}}>Clear</div>
                                                   
                                                </div>

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <CssDateField
                                                    value={endDateValueForTasksObj}
                                                    onChange={ (newValue) => handleDueDateChange (newValue, 'endDate')}
                                                    slotProps={{ textField: { fullWidth: true } }}
                                                />
                                            </LocalizationProvider>

                                        </div>

                                        {/* <input placeholder= {daysjsobj}  onClick={() => handleDueDateChange(new Date())} style={{height: '20px', width: '100px', border: '1px solid black', cursor: 'pointer'}}/> */}



                                    </div>) : (<div style={{ width: '100%' }}>
                            {Object.keys(priorityCheckboxes).map((checkboxId) => (
                                <div key={checkboxId} className={`${checkboxId}-filter`} style={{ width: '100%', padding: '10px', marginBottom: '0', display: 'flex', gap: '30px' }}>
                                    <label className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            className="checkbox-input checkbox-priority-input"
                                            id={checkboxId}
                                            checked={priorityCheckboxes[checkboxId]}
                                            onChange={(event) => handlePriorityCheckboxChange(checkboxId, event)}
                                        />
                                        <span className="checkbox-custom">
                                            <img src={whiteTick} alt='white-tick' />
                                        </span>
                                    </label>
                                    <div style={{ fontSize: '14px', fontFamily: 'var(--primary-font-family)', color: 'var(--quinary-font-color)', marginTop: '2px' }}>
                                        {checkboxId.replace('checkbox-', '').replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}

                                    </div>
                                </div>
                            ))}
                        </div>)
                                   }
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '15%', paddingLeft: '10px', paddingRight: '10px' }}>
                    <div  className='filter-button' style={{ width: '100px' }} onClick={pathname == '/tasks' ? () => promptFilterResetAndClose(0, limit, []) : promptNotesFilterResetAndClose}>
                        Reset
                    </div>
                    <div className='primary-button' onClick={() => {handleApplyClick(0, limit)}} style={{ width: '100px', fontFamily: 'var(--primary-font-family)' }}>
                        Apply
                    </div>

                </div>
            </div>
        </Modal>
    )
};

export default FilterDialog;