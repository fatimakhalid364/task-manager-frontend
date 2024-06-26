import { Outlet } from "react-router-dom";
import RoutesComponents from "src/components/tasks/subComponents/Sides/Routes/RoutesComponents";
import DashboardIcon from "src/assets/squares-2x2.svg";
import TasksIcon from "src/assets/check-list.svg";
import NotesIcon from 'src/assets/note-04.svg';
import CalendarIcon from 'src/assets/calendar-days.svg';
import SettingsIcon from 'src/assets/cog-6-tooth.svg'

function Routes(){
    return (
        <div className = 'tasks-page-routes-div'>
            <RoutesComponents icon= {DashboardIcon} route='Dashboard' page='/dashboard'/>
            <RoutesComponents icon={ TasksIcon } route='Tasks' page='/tasks' />
            <RoutesComponents icon={NotesIcon} route='Notes' page='/notes' />
            <RoutesComponents icon={ CalendarIcon } route='Calendar' page='/calendar' />
            <RoutesComponents icon={ SettingsIcon } route='Settings' page='/settings' />
            <Outlet />

        </div>
    )
};

export default Routes;