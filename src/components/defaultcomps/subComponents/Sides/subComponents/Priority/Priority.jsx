import PriorityComponents from "src/components/defaultcomps/subComponents/Sides/subComponents/Priority/PriorityComponents";
import RedDot from "src/assets/Ellipse red.svg";
import OrangeDot from "src/assets/Ellipse orange.svg";
import GreenDot from "src/assets/Ellipse green.svg";
import { useResponsive } from 'src/constants/media_queries';

function Priority(){
    const {
        isAdaptableScreen,
        isLessScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();
    

    return (
        <div className='tasks-page-priority-div'>
            { isAdaptableScreen && (<div className='priority-header'>Priority</div>)}
            <PriorityComponents Dot={RedDot} PriorityLevel='High' TasksAtPriorityLevel='7'  />
            <PriorityComponents Dot={OrangeDot} PriorityLevel='Medium' TasksAtPriorityLevel='7'  />
            <PriorityComponents Dot={GreenDot} PriorityLevel='Low' TasksAtPriorityLevel='7'  />
            

        </div>

    )
};

export default Priority;