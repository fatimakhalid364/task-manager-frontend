import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from 'src/constants/media_queries';

function PriorityComponents({ Dot, PriorityLevel, TasksAtPriorityLevel, burgerMenuClicked, url }) {
    const navigate = useNavigate();
    const {
        expandBar,
        isMicroScreen
    } = useResponsive();

    

    const priorityColor = PriorityLevel === 'High' ? '#EF4444' : PriorityLevel === 'Medium' ? '#F59E0B' : '#1FDE43'

    useEffect(() => {
        console.log('burgerMenuClicked', burgerMenuClicked);
      }, [burgerMenuClicked]);
    
    return (
        <div >
        {((expandBar && burgerMenuClicked) || (isMicroScreen && burgerMenuClicked)) ? (<div className='tasks-page-priority'
        style={{marginLeft: (isMicroScreen && burgerMenuClicked && !expandBar) && '20px'}}>
            <div>
                <img src={Dot} alt='colored-dots' />

            </div>
                <div onClick={() => { navigate(url) }} className='tasks-page-priority-level'>
                    {PriorityLevel}
            </div>
            <div className='tasks-page-number' style={{backgroundColor: 'var(--active-background-color)'}}>
                    {TasksAtPriorityLevel}
            </div>
            </div>) : (<div className='tasks-page-number' style={{ marginLeft: '13px', position: 'relative', marginBottom: '12px', color: `${priorityColor}`, backgroundColor: 'var(--neutral-background-color)', fontSize: '14px' }}>
                    {TasksAtPriorityLevel}
            </div>)}
        </div>
    )
}

PriorityComponents.propTypes = {
    Dot: propTypes.string.isRequired,
    PriorityLevel: propTypes.string.isRequired,
    TasksAtPriorityLevel: propTypes.string.isRequired,
    burgerMenuClicked: propTypes.bool,
 }

export default PriorityComponents;