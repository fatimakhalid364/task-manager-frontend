import propTypes from 'prop-types';
import { useResponsive } from 'src/constants/media_queries';

function PriorityComponents({Dot, PriorityLevel, TasksAtPriorityLevel}){

    const {
        isAdaptableScreen,
        expandBar,
        isBp1,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    
    return (
        <div>
        {expandBar ? (<div className='tasks-page-priority'>
            <div>
                <img src={Dot} alt='colored-dots' />
            </div>
            <div className='tasks-page-priority-level'>
                {PriorityLevel}
            </div>
            <div className='tasks-page-number'>
                {TasksAtPriorityLevel}
            </div>
        </div>) : (<div>
                <img src={Dot} alt='colored-dots' />
            </div>)}
        </div>
    )
};

PriorityComponents.propTypes = {
    Dot: propTypes.string.isRequired,
    PriorityLevel: propTypes.string.isRequired,
    TasksAtPriorityLevel: propTypes.string.isRequired
}

export default PriorityComponents;