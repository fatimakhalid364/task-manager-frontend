import Modal from '@mui/material/Modal';
import cross from 'src/assets/cross.svg'    
import filter from 'src/assets/filter.svg';
import 'src/components/Filter/FilterDialog.css';
import { styled } from "@mui/system";
import fwdArrow from 'src/assets/fwd-arrow.svg';
import whiteTick from 'src/assets/white-tick.svg';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from 'src/store/slices/filterByStatusSlice';
import { setCheckboxState } from 'src/store/slices/checkboxSlice';


const FilterDialog = ({filterOpen, handleFilterClose}) => {
   
    const dispatch = useDispatch();

    const checkboxStates = useSelector((state) => state.checkbox.checkboxStates);
        
   

    const filterByStatusValue = useSelector((state) => state.filterByStatus.value);

    const [isStatusClicked, setIsStatusClicked] = useState(true);
    const [isDueDateClicked, setIsDueDateClicked] = useState(false);
    const [isCreationDateClicked, setIsCreationDateClicked] = useState(false);

    const handleStatusClick = () => {
        setIsStatusClicked(true);
        setIsDueDateClicked(false);
        setIsCreationDateClicked(false);
    }

    const handleDueDateClick = () => {
        setIsStatusClicked(false);
        setIsDueDateClicked(true);
        setIsCreationDateClicked(false);
    }

    const handleCreationDateClick = () => {
        setIsStatusClicked(false);
        setIsDueDateClicked(false);
        setIsCreationDateClicked(true);
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

    const handleCheckboxChange = (checkboxId) => (event) => {
        dispatch(setCheckboxState(checkboxId, event.target.checked));
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
                        <div className='filter-portion-1-menu' style={{cursor: 'pointer'}} onClick = { handleStatusClick }>
                            <div>Status</div>
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
                        <div className='filter-portion-1-menu' style={{cursor: 'pointer'}} onClick = { handleDueDateClick }> 
                            <div>Due Date</div>
                            <img src={fwdArrow} alt='forward-arrow' />
                        </div>
                        <div className='filter-portion-1-menu' style={{cursor: 'pointer'}} onClick = { handleCreationDateClick}>
                            <div>Creation Date</div>
                            <img src={fwdArrow} alt='forward-arrow' />
                        </div>
                    </div>
                    <div className='filter-portion-2'>
                        { isStatusClicked ? (<div style={{width: '100%'}}>
                            <div className="not-started-filter" style={{width: '100%', padding: '10px', marginBottom: '0', display: 'flex', gap: '30px'}}>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" className="checkbox-input" id='checkbox-not-started' onChange={handleCheckboxChange('checkbox-not-started')} />
                                    <span className="checkbox-custom">
                                    <img src={whiteTick} alt='white-tick' />
                                    </span>
                                    
                                </label>
                                <div style={{fontSize: '14px', fontFamily: 'var(--primary-font-family)', color: 'var(--quinary-font-color)', marginTop: '1px'}}>Not Started</div>
                            </div>
                            <div className="pending-filter" style={{width: '100%', padding: '10px', marginBottom: '0', display: 'flex', gap: '30px' }}>
                            <label className="checkbox-wrapper" >
                                <input type="checkbox" className="checkbox-input" id='checkbox-pending'  onChange={handleIncrement}  />
                                <span className="checkbox-custom">
                                <img src={whiteTick} alt='white-tick' />
                                </span>
                               
                            </label>
                            <div style={{fontSize: '14px', fontFamily: 'var(--primary-font-family)', color: 'var(--quinary-font-color)', marginTop: '2px'}}>Pending</div>
                            </div>
                            <div className="in-progress-filter" style={{width: '100%', padding: '10px', marginBottom: '0', display: 'flex', gap: '30px'}}>
                            <label className="checkbox-wrapper"  >
                                <input type="checkbox" className="checkbox-input"  onChange={handleIncrement} id='checkbox-inprogress'   />
                                <span className="checkbox-custom">
                                <img src={whiteTick} alt='white-tick' />
                                </span>
                               
                            </label>
                            <div style={{fontSize: '14px', fontFamily: 'var(--primary-font-family)', color: 'var(--quinary-font-color)', marginTop: '2px'}}>In Progress</div>
                            </div>
                            <div className="complete-filter" style={{width: '100%', padding: '10px', marginBottom: '0', display: 'flex', gap: '30px'}}>
                            <label className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-input" id='checkbox-complete' onChange={handleIncrement} />
                                <span className="checkbox-custom">
                                <img src={whiteTick} alt='white-tick' />
                                </span>
                               
                            </label>
                            <div style={{fontSize: '14px', fontFamily: 'var(--primary-font-family)', color: 'var(--quinary-font-color)', marginTop: '2px'}}>Complete</div>
                            </div>
                        </div>) : isDueDateClicked ? <div></div> : <div></div>}
                    </div>
                </div>
                
            </div>
        </Modal>
    )
};

export default FilterDialog;