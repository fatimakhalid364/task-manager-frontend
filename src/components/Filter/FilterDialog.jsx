import Modal from '@mui/material/Modal';
import cross from 'src/assets/cross.svg'    
import filter from 'src/assets/filter.svg';
import 'src/components/Filter/FilterDialog.css';
import { styled } from "@mui/system";
import fwdArrow from 'src/assets/fwd-arrow.svg';
import whiteTick from 'src/assets/white-tick.svg';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setValue, setCheckboxState } from 'src/store/slices/filterByStatusSlice';
// import { setCheckboxState } from 'src/store/slices/checkboxSlice';
import SearchGlass from 'src/components/icons/SearchGlass';
import { useLocation } from 'react-router-dom';


const FilterDialog = ({filterOpen, handleFilterClose, notesArray}) => {
    const location = useLocation();

    const pathname = location.pathname;
   
    const dispatch = useDispatch();

    const checkboxStates = useSelector((state) => state.filterByStatus.checkboxStates);

    const [notesArrayFilled, setNotesArrayFilled] = useState(false);
        
    // useEffect(() => {
    //     notesArray.map((note) =>{

    //     });
    //     console.log('Notes Array:', notesArray);
    // }, [notesArray]);

    const filterByStatusValue = useSelector((state) => state.filterByStatus.value);

   

    const [isStatusClicked, setIsStatusClicked] = useState(pathname == '/tasks' ? true : false);
    const [isDueDateClicked, setIsDueDateClicked] = useState(false);
    const [isCreationDateClicked, setIsCreationDateClicked] = useState(false);
    const [isTagsClicked, setIsTagsClicked] = useState(true);

  

    const handleStatusClick = () => {
        setIsStatusClicked(true);
        setIsDueDateClicked(false);
        setIsCreationDateClicked(false);
       
    }

    const handleTagsClick = () => {
        setIsTagsClicked(true);
        setIsCreationDateClicked(false);
        setIsStatusClicked(false);
    }

    const handleDueDateClick = () => {
        setIsStatusClicked(false);
        setIsDueDateClicked(true);
        setIsCreationDateClicked(false);
        setIsTagsClicked(false);
    }

    const handleCreationDateClick = () => {
        setIsStatusClicked(false);
        setIsDueDateClicked(false);
        setIsCreationDateClicked(true);
        setIsTagsClicked(false);
    }

    // const [checkedCount, setCheckedCount] = useState(0);

    
   
    const handleIncrement = () => {
       
        const checkboxes = document.querySelectorAll('.checkbox-input');
        
        
        const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

        switch (checkedCount) {
            case 0:
                dispatch(setValue('0'));
                break;
            case 1:
                dispatch(setValue('1'));
                break;
            case 2:
                dispatch(setValue('2'));
                break;
            case 3:
                dispatch(setValue('3'));
                break;
            case 4:
                dispatch(setValue('4'));
                break;
        }
    
        
      
    };

    const promptFilterResetAndClose = () => {
        dispatch(setValue('0'));
        Object.keys(checkboxStates).forEach(checkboxId => dispatch(setCheckboxState({checkboxId, isChecked: false})));
        handleFilterClose();
    }

   

    const handleCheckboxChange = (checkboxId, event) => {
      
        const isChecked = event.target.checked;

       
    
       
        dispatch(setCheckboxState({checkboxId, isChecked}));
    
       
        console.log('Checkbox ID:', checkboxId, 'Checked:', isChecked);
    
       
        handleIncrement();
    };
   
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
                        <a onClick={ handleFilterClose }><img src={cross} alt='cross' className='add-task-cross' /></a>
                    </div>
                    <div style={{fontFamily: 'var(--primary-font-family)', color: 'var(--tertiary-font-color)', fontSize: '14px'}}>
                    Select from the list of filters below
                    </div>
                </div>
                <div className='add-filter-content'>
                    <div className='filter-portion-1'>
                        <div className='filter-portion-1-menu' style={{cursor: 'pointer'}} onClick = { pathname == '/tasks' ? handleStatusClick : handleTagsClick}>
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
                            }}>{ filterByStatusValue}</div>
                            <img src={fwdArrow} alt='forward-arrow' />
                        </div>
                        { pathname == '/tasks' && (<div className='filter-portion-1-menu' style={{cursor: 'pointer'}} onClick = { handleDueDateClick }> 
                            <div>Due Date</div>
                            <img src={fwdArrow} alt='forward-arrow' />
                        </div>)}
                        <div className='filter-portion-1-menu' style={{cursor: 'pointer'}} onClick = { handleCreationDateClick}>
                            <div>Creation Date</div>
                            <img src={fwdArrow} alt='forward-arrow' />
                        </div>
                    </div>
                    <div className='filter-portion-2'>
                        { isStatusClicked ? (<div style={{width: '100%'}}>
                            {Object.keys(checkboxStates).map((checkboxId) => (
                                    <div key={checkboxId} className={`${checkboxId}-filter`} style={{ width: '100%', padding: '10px', marginBottom: '0', display: 'flex', gap: '30px' }}>
                                        <label className="checkbox-wrapper">
                                            <input
                                                type="checkbox"
                                                className="checkbox-input"
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
                            <div  style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <div style={{position: 'relative', width: '100%', display: 'flex', justifyContent: 'center'}}>
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

                                            }}/>
                                            <div style={{position: 'absolute', top: '21px', left: '78%', cursor: 'pointer'}}>
                                                <SearchGlass color='var(--primary-background-color)'  />
                                            </div>
                                        </div>
                                        <div style={{ width: '100%', overflowY: 'scroll', height: '210px' }}>
                                            {/* Check if all notes have empty tags */}
                                            {notesArray?.every(note => note.tags.length === 0) ? (
                                            <div style={{marginTop: '20px', width: '63%', fontFamily: 'var(--primary-font-family)', fontSize: '15px', color: 'var(--quinary-font-color)'}} >No tags added yet</div>
                                            ) : (
                                            notesArray?.map((note, index) => (
                                                <div key={index} >
                                                    {/* Render tags only if they exist */}
                                                    {note.tags.length > 0 ? (
                                                     note.tags.map((tag) => (
                                                        <div style={{marginLeft: '30px'}}>
                                                            <label className="checkbox-wrapper">
                                                                <input
                                                                    type="checkbox"
                                                                    className="checkbox-input"
                                                                    // id={checkboxId}
                                                                    // checked={checkboxStates[checkboxId]}
                                                                    // onChange={(event) => handleCheckboxChange(checkboxId, event)}
                                                                />
                                                                <span className="checkbox-custom">
                                                                    <img src={whiteTick} alt='white-tick' />
                                                                </span>
                                                            </label>
                                                            <div style={{marginTop: '20px', marginLeft: '30px', fontFamily: 'var(--primary-font-family)', fontSize: '15px', color: 'var(--quinary-font-color)'}} >
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
                                    (<div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <div style={{position: 'relative', width: '100%', display: 'flex', justifyContent: 'center'}}>
                                            <input 
                                            type='text' 
                                            placeholder='Search due date'
                                            className='filter-search-date-input'
                                            style={{
                                                marginTop: '15px', 
                                                width: '85%', 
                                                padding: '10px',
                                                borderRadius: '8px', 
                                                height: '35px',
                                                border: '1px solid var(--field-border-color)', 

                                            }}/>
                                            <div style={{position: 'absolute', top: '21px', left: '78%', cursor: 'pointer'}}>
                                                <SearchGlass color='var(--primary-background-color)'  />
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>) 
                                    : 
                                    (<div  style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <div style={{position: 'relative', width: '100%', display: 'flex', justifyContent: 'center'}}>
                                            <input 
                                            type='text' 
                                            placeholder='Search creation date'
                                            className='filter-search-date-input'
                                            style={{
                                                marginTop: '15px', 
                                                width: '85%', 
                                                padding: '10px',
                                                borderRadius: '8px', 
                                                height: '35px',
                                                border: '1px solid var(--field-border-color)', 

                                            }}/>
                                            <div style={{position: 'absolute', top: '21px', left: '78%', cursor: 'pointer'}}>
                                                <SearchGlass color='var(--primary-background-color)'  />
                                            </div>
                                        </div>

                                    </div>)}
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '15%', paddingLeft: '10px', paddingRight: '10px'}}>
                    <div className='filter-button' style={{width: '100px'}} onClick ={promptFilterResetAndClose}>
                        Reset
                    </div>
                    <div className='primary-button' onClick = { handleFilterClose } style={{width: '100px', fontFamily: 'var(--primary-font-family)'}}>
                        Apply
                    </div>

                </div>
            </div>
        </Modal>
    )
};

export default FilterDialog;