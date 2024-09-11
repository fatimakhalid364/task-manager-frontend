import { Outlet } from "react-router-dom";
import RoutesComponents from "src/components/defaultcomps/subComponents/Sides/subComponents/Routes/RoutesComponents";
import CalendarIcon from "../../../../../icons/CalendarIcon";
import DashboardIcon from "../../../../../icons/DasboardIcon";
import GearIcon from "../../../../../icons/GearIcon";
import NotesIcon from "../../../../../icons/NotesIcon";
import TaskIcon from "../../../../../icons/TaskIcon";
import { useResponsive } from 'src/constants/media_queries'; 



function Routes({ clickfunction, burgerMenuClicked, handleBurgerMenuClick }) {
    const {
        isAdaptableScreen,
        expandBar,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();
    return (
        <div className='tasks-page-routes-div' style={{marginTop: (isMicroScreen && burgerMenuClicked && !expandBar) && '25px', display: (isMicroScreen && !burgerMenuClicked && !expandBar) && 'none' }} >
            <RoutesComponents icon={DashboardIcon} currentPage='DASHBOARD' page='Dashboard' route='/dashboard' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} handleBurgerMenuClick={ handleBurgerMenuClick} />
            <RoutesComponents icon={TaskIcon} currentPage='TASKS' page='Tasks' route='/tasks' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} handleBurgerMenuClick={ handleBurgerMenuClick} />
            <RoutesComponents icon={NotesIcon} currentPage='NOTES' page='Notes' route='/notes' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} handleBurgerMenuClick={ handleBurgerMenuClick} />
            <RoutesComponents icon={CalendarIcon} currentPage='CALENDER' page='Calendar' route='/calendar' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} handleBurgerMenuClick={ handleBurgerMenuClick} />
            <RoutesComponents icon={GearIcon} currentPage='SETTINGS' page='Settings' route='/settings' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} handleBurgerMenuClick={ handleBurgerMenuClick} />
            <Outlet />

        </div>
    )
}

export default Routes;