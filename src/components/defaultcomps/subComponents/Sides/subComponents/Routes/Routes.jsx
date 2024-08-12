import { Outlet } from "react-router-dom";
import RoutesComponents from "src/components/defaultcomps/subComponents/Sides/subComponents/Routes/RoutesComponents";
import CalendarIcon from "../../../../../icons/CalendarIcon";
import DashboardIcon from "../../../../../icons/DasboardIcon";
import GearIcon from "../../../../../icons/GearIcon";
import NotesIcon from "../../../../../icons/NotesIcon";
import TaskIcon from "../../../../../icons/TaskIcon";



function Routes({ clickfunction, burgerMenuClicked }) {
    return (
        <div className='tasks-page-routes-div' >
            <RoutesComponents icon={DashboardIcon} currentPage='DASHBOARD' route='/dashboard' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} />
            <RoutesComponents icon={TaskIcon} currentPage='TASKS' route='/tasks' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} />
            <RoutesComponents icon={NotesIcon} currentPage='NOTES' route='/notes' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} />
            <RoutesComponents icon={CalendarIcon} currentPage='CALENDER' route='/calendar' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} />
            <RoutesComponents icon={GearIcon} currentPage='SETTINGS' route='/settings' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} />
            <Outlet />

        </div>
    )
}

export default Routes;