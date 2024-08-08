import propTypes from 'prop-types';
import { useResponsive } from 'src/constants/media_queries';
import { useEffect} from 'react';

function PriorityComponents({Dot, PriorityLevel, TasksAtPriorityLevel, burgerMenuClicked}){

    const {
        isAdaptableScreen,
        expandBar,
        isBp1,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

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
            <div className='tasks-page-number'>
                {TasksAtPriorityLevel}
            </div>
        </div>) : (<div className='tasks-page-number' style={{marginLeft: '13px', position: 'relative', marginBottom: '12px'}}>
                {TasksAtPriorityLevel}
            </div>)}
        </div>
    )
};

// PriorityComponents.propTypes = {
//     Dot: propTypes.string.isRequired,
//     PriorityLevel: propTypes.string.isRequired,
//     TasksAtPriorityLevel: propTypes.string.isRequired
// }

export default PriorityComponents;