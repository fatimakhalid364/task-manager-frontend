import Modal from '@mui/material/Modal';
import cross from 'src/assets/cross.svg'    
import filter from 'src/assets/filter.svg';
import 'src/components/Filter/FilterDialog.css';
import { styled } from "@mui/system";
import fwdArrow from 'src/assets/fwd-arrow.svg';

const FilterDialog = ({filterOpen, handleFilterClose}) => {
    const MyComponent = styled('div')({
        position: 'relative',
        height: '386px',
        width: '440px',
        top: '50%',
        left: '52%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        backgroundColor: 'var(--neutral-background-color)',
        border: '1px solid var(--modal-border-color)',
        opacity: '1',
       
        
    });
    return (
        <Modal
        open={filterOpen}
        >
            <MyComponent>
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
                        <div className='filter-portion-1-menu'>
                            <div>Status</div>
                            <img src={fwdArrow} alt='forward-arrow' />
                        </div>
                        <div className='filter-portion-1-menu'>
                            <div>Due Date</div>
                            <img src={fwdArrow} alt='forward-arrow' />
                        </div>
                        <div className='filter-portion-1-menu'>
                            <div>Creation</div>
                            <img src={fwdArrow} alt='forward-arrow' />
                        </div>
                    </div>
                    <div className='filter-portion-2'>
                        <div>
                        </div>
                    </div>
                </div>
                
            </MyComponent>
        </Modal>
    )
};

export default FilterDialog;