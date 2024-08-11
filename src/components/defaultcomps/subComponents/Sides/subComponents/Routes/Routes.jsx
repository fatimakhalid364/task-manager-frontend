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
            <RoutesComponents icon={DashboardIcon} page='Dashboard' route='/dashboard?page=Dashboard' clickfunction={clickfunction} burgerMenuClicked={ burgerMenuClicked } />
            <RoutesComponents icon={TaskIcon} page='Tasks' route='/tasks?page=Tasks' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} />
            <RoutesComponents icon={NotesIcon} page='Notes' route='/notes?page=Notes' clickfunction={clickfunction} burgerMenuClicked={ burgerMenuClicked } />
            <RoutesComponents icon={CalendarIcon} page='Calendar' route='/calendar?page=Calendar' clickfunction={clickfunction} burgerMenuClicked={ burgerMenuClicked } />
            <RoutesComponents icon={GearIcon} page='Settings' route='/settings?page=Settings' clickfunction={clickfunction} burgerMenuClicked={burgerMenuClicked} />
            <Outlet />

        </div>
    )
}

export default Routes;