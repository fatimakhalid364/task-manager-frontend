import PriorityComponents from "src/components/defaultcomps/subComponents/Sides/subComponents/Priority/PriorityComponents";
import RedDot from "src/assets/Ellipse red.svg";
import OrangeDot from "src/assets/Ellipse orange.svg";
import GreenDot from "src/assets/Ellipse green.svg";
import { useResponsive } from 'src/constants/media_queries';
import { useEffect} from 'react';

function Priority({ burgerMenuClicked }){
    const {
        isAdaptableScreen,
        isSmallerScreen,
        expandBar,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    // useEffect(() => {
    //     console.log('burgerMenuClicked', burgerMenuClicked);
    //   }, [burgerMenuClicked]);
    

    return (
        <div className='tasks-page-priority-div'>
            { (expandBar && burgerMenuClicked) && (<div className='priority-header'>Priority</div>)}
            <PriorityComponents Dot={RedDot} PriorityLevel='High' TasksAtPriorityLevel='7'  />
            <PriorityComponents Dot={OrangeDot} PriorityLevel='Medium' TasksAtPriorityLevel='7'  />
            <PriorityComponents Dot={GreenDot} PriorityLevel='Low' TasksAtPriorityLevel='7'  />
            

        </div>

    )
};

export default Priority;