import propTypes from 'prop-types';

function PriorityComponents({Dot, PriorityLevel, TasksAtPriorityLevel}){
    return (
        <div className='tasks-page-priority'>
            <div>
                <img src={Dot} alt='colored-dots' />
            </div>
            <div className='tasks-page-priority-level'>
                {PriorityLevel}
            </div>
            <div className='tasks-page-number'>
                {TasksAtPriorityLevel}
            </div>
        </div>
    )
};

PriorityComponents.propTypes = {
    Dot: propTypes.string.isRequired,
    PriorityLevel: propTypes.string.isRequired,
    TasksAtPriorityLevel: propTypes.string.isRequired
}

export default PriorityComponents;