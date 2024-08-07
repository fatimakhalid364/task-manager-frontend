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
            <RoutesComponents icon={DashboardIcon} page='Dashboard' route='/dashboard?page=Dashboard' clickfunction={clickfunction} />
            <RoutesComponents icon={TasksIcon} page='Tasks' route='/tasks?page=Tasks' clickfunction={clickfunction} />
            <RoutesComponents icon={NotesIcon} page='Notes' route='/notes?page=Notes' clickfunction={clickfunction} />
            <RoutesComponents icon={CalendarIcon} page='Calendar' route='/calendar?page=Calendar' clickfunction={clickfunction} />
            <RoutesComponents icon={SettingsIcon} page='Settings' route='/settings?page=Settings' clickfunction={clickfunction} />
            <Outlet />

        </div>
    )
}

export default Routes;