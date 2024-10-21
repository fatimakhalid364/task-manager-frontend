import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import RoutesComponents from "src/components/defaultcomps/subComponents/Sides/subComponents/Routes/RoutesComponents";
import { useResponsive } from 'src/constants/media_queries';
import { calendar_t_obj, dashboard_t_obj, notes_t_obj, settings_t_obj, task_t_obj } from "src/constants/translationObj";
import CalendarIcon from "../../../../../icons/CalendarIcon";
import DashboardIcon from "../../../../../icons/DasboardIcon";
import GearIcon from "../../../../../icons/GearIcon";
import NotesIcon from "../../../../../icons/NotesIcon";
import TaskIcon from "../../../../../icons/TaskIcon";


function Routes({ clickfunction, burgerMenuClicked, handleBurgerMenuClick }) {
    const {
        isAdaptableScreen,
        expandBar,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();
    const lang = useSelector((state) => state.format.language);
    return (
        <div className='tasks-page-routes-div' style={{marginTop: (isMicroScreen && burgerMenuClicked && !expandBar) && '25px', display: (isMicroScreen && !burgerMenuClicked && !expandBar) && 'none' }} >
            <RoutesComponents icon={DashboardIcon} currentPage='DASHBOARD' page={dashboard_t_obj[lang]} route='/dashboard' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} handleBurgerMenuClick={handleBurgerMenuClick} />
            <RoutesComponents icon={TaskIcon} currentPage='TASKS' page={task_t_obj[lang]} route='/tasks' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} handleBurgerMenuClick={handleBurgerMenuClick} />
            <RoutesComponents icon={NotesIcon} currentPage='NOTES' page={notes_t_obj[lang]} route='/notes' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} handleBurgerMenuClick={handleBurgerMenuClick} />
            <RoutesComponents icon={CalendarIcon} currentPage='CALENDER' page={calendar_t_obj[lang]} route='/calendar' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} handleBurgerMenuClick={handleBurgerMenuClick} />
            <RoutesComponents icon={GearIcon} currentPage='SETTINGS' page={settings_t_obj[lang]} route='/settings' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} handleBurgerMenuClick={handleBurgerMenuClick} />
            <Outlet />

        </div>
    )
}

export default Routes;