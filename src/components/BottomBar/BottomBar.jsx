import { Outlet } from "react-router-dom";
import CalendarIcon from 'src/assets/calendar-days.svg';
import TasksIcon from "src/assets/check-list.svg";
import SettingsIcon from 'src/assets/cog-6-tooth.svg';
import NotesIcon from 'src/assets/note-04.svg';
import DashboardIcon from "src/assets/squares-2x2.svg";
import BottomBarComponents from "src/components/BottomBar/subComponents/BottomBarComponents";
import "src/components/BottomBar/BottomBar.css";
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import BottomButtons from "src/components/BottomButtons";
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';

function BottomBar({ handleDoubleArrowClicked, doubleArrowClicked }) {
    return (
        <div className='bottom-bar-div'>
        <div  className= 'navigation-icon-div'>
            <BottomBarComponents icon={DashboardIcon}  route='/dashboard?page=Dashboard'   />
            <BottomBarComponents icon={TasksIcon}  route='/tasks?page=Tasks'   />
            <BottomBarComponents icon={NotesIcon}  route='/notes?page=Notes'   />
            <BottomBarComponents icon={CalendarIcon} route='/calendar?page=Calendar'   />
            <BottomBarComponents icon={SettingsIcon} route='/settings?page=Settings'   />
            <Outlet />
        </div>
        </div>
    )
}

export default BottomBar;