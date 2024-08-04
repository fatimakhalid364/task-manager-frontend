import { Outlet } from "react-router-dom";
import CalendarIcon from 'src/assets/calendar-days.svg';
import TasksIcon from "src/assets/check-list.svg";
import SettingsIcon from 'src/assets/cog-6-tooth.svg';
import NotesIcon from 'src/assets/note-04.svg';
import DashboardIcon from "src/assets/squares-2x2.svg";
import RoutesComponents from "src/components/defaultcomps/subComponents/Sides/subComponents/Routes/RoutesComponents";


function Routes({ clickfunction }) {
    return (
        <div className='tasks-page-routes-div' >
            <RoutesComponents icon={DashboardIcon} page='Dashboard' route='/dashboard' clickfunction={clickfunction} />
            <RoutesComponents icon={TasksIcon} page='Tasks' route='/tasks' clickfunction={clickfunction} />
            <RoutesComponents icon={NotesIcon} page='Notes' route='/notes' clickfunction={clickfunction} />
            <RoutesComponents icon={CalendarIcon} page='Calendar' route='/calender' clickfunction={clickfunction} />
            <RoutesComponents icon={SettingsIcon} page='Settings' route='/settings' clickfunction={clickfunction} />
            <Outlet />

        </div>
    )
}

export default Routes;