import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useResponsive } from 'src/constants/media_queries';
import { useSelector } from 'react-redux';

function PriorityComponents({Dot, PriorityLevel, TasksAtPriorityLevel, burgerMenuClicked}){
    
    const {
        expandBar,
    } = useResponsive();

    const accentColor = useSelector((state) => state.appearance.color)

    const priorityColor = PriorityLevel === 'High' ? '#EF4444' : PriorityLevel === 'Medium' ? '#F59E0B' : '#1FDE43'

    useEffect(() => {
        console.log('burgerMenuClicked', burgerMenuClicked);
      }, [burgerMenuClicked]);
    
    return (
        <div>
        {(expandBar && burgerMenuClicked) ? (<div className='tasks-page-priority'>
            <div>
                <img src={Dot} alt='colored-dots' />

            </div>
            <div className='tasks-page-priority-level'>
                {PriorityLevel}
            </div>
            <div className='tasks-page-number' style={{backgroundColor:  accentColor === 'pink' ? 'var(--light-pink-color)' : accentColor === 'green' ? 'var(--light-green-color)' : accentColor === 'orange' ? 'var(--light-orange-color)' : 'var(--active-background-color)'}}>
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