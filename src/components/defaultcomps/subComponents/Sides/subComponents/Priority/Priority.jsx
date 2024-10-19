import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import GreenDot from "src/assets/Ellipse green.svg";
import OrangeDot from "src/assets/Ellipse orange.svg";
import RedDot from "src/assets/Ellipse red.svg";
import PriorityComponents from "src/components/defaultcomps/subComponents/Sides/subComponents/Priority/PriorityComponents";
import { useResponsive } from 'src/constants/media_queries';
import { high_t_obj, low_t_obj, medium_t_obj } from "src/constants/translationObj";



function Priority({ burgerMenuClicked }) {
    const lang = useSelector((state) => state.format.language);

    const {
        isAdaptableScreen,
        isSmallerScreen,
        expandBar,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    const highPriorityCount = useSelector((state) => state.tasks.highPriorityCount);
    const mediumPriorityCount = useSelector((state) => state.tasks.mediumPriorityCount);
    const lowPriorityCount = useSelector((state) => state.tasks.lowPriorityCount);

    const location = useLocation();
    const pathname = location.pathname;
  

    return (
        <div className='tasks-page-priority-div' style={{ display: (isMicroScreen && !burgerMenuClicked && !expandBar) && 'none' }}>
            {((expandBar && burgerMenuClicked) || (isMicroScreen && burgerMenuClicked)) && (<div className='priority-header'>Priority</div>)}
            <PriorityComponents style={{ textDecoration: pathname == '/tasks_high' && 'underline' }} url={"/tasks_high"} Dot={RedDot} PriorityLevel={high_t_obj[lang]} TasksAtPriorityLevel={highPriorityCount} burgerMenuClicked={burgerMenuClicked} />
            <PriorityComponents style={{ textDecoration: pathname == '/tasks_medium' && 'underline' }} url={"/tasks_medium"} Dot={OrangeDot} PriorityLevel={medium_t_obj[lang]} TasksAtPriorityLevel={mediumPriorityCount} burgerMenuClicked={burgerMenuClicked} />
            <PriorityComponents style={{ textDecoration: pathname == '/tasks_low' && 'underline' }} url={"/tasks_low"} Dot={GreenDot} PriorityLevel={low_t_obj[lang]} TasksAtPriorityLevel={lowPriorityCount} burgerMenuClicked={burgerMenuClicked} />


        </div>

    )
}

export default Priority;