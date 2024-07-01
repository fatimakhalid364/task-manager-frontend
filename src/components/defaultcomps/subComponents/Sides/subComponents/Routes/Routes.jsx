import { Outlet } from "react-router-dom";
import RoutesComponents from "src/components/defaultcomps/subComponents/Sides/subComponents/Routes/RoutesComponents";
import DashboardIcon from "src/assets/squares-2x2.svg";
import TasksIcon from "src/assets/check-list.svg";
import NotesIcon from 'src/assets/note-04.svg';
import CalendarIcon from 'src/assets/calendar-days.svg';
import SettingsIcon from 'src/assets/cog-6-tooth.svg';


function Routes({clickfunction}){
    return (
        <div className = 'tasks-page-routes-div'>
            <RoutesComponents icon= {DashboardIcon} page='Dashboard' route='/default/dashboard' clickfunction={clickfunction} />
            <RoutesComponents icon={ TasksIcon } page='Tasks' route='/default/tasks' clickfunction={clickfunction} />
            <RoutesComponents icon={NotesIcon} page='Notes' route='/default/notes' clickfunction={clickfunction} />
            <RoutesComponents icon={ CalendarIcon } page='Calendar' route='/default/calendar' clickfunction={clickfunction} />
            <RoutesComponents icon={ SettingsIcon } page='Settings' route='/default/settings' clickfunction={clickfunction} />
            <Outlet />

        </div>
    )
};

export default Routes;