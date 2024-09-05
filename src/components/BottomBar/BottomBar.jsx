import { Outlet } from "react-router-dom";
import BottomBarComponents from "src/components/BottomBar/subComponents/BottomBarComponents";
import "src/components/BottomBar/BottomBar.css";
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import BottomButtons from "src/components/BottomButtons";
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import CalendarIcon from "src/components/icons/CalendarIcon";
import DashboardIcon from "src/components/icons/DasboardIcon";
import GearIcon from "src/components/icons/GearIcon";
import NotesIcon from "src/components/icons/NotesIcon";
import TaskIcon from "src/components/icons/TaskIcon";

import filter from 'src/assets/filter.svg';
import PlusIcon from "src/components/icons/PlusIcon";
import { useLocation } from "react-router-dom";


function BottomBar({ handleDoubleArrowClicked, doubleArrowClicked, handleOpen, handleFilterOpen }) {
    const location = useLocation();
    const pathname = location.pathname.split('/').pop().toUpperCase();
    return (
        <div className='bottom-bar-div'>
        <div  className= 'navigation-icon-div'>
            <BottomBarComponents icon={DashboardIcon}  route='/dashboard' currentPage='DASHBOARD'   />
            <BottomBarComponents icon={TaskIcon}  route='/tasks' currentPage='TASKS'  />
            <BottomBarComponents icon={NotesIcon}  route='/notes' currentPage='NOTES'  />
            <BottomBarComponents icon={CalendarIcon} route='/calendar' currentPage='CALENDAR'  />
            <BottomBarComponents icon={GearIcon} route='/settings/general' currentPage='GENERAL'  />
            <Outlet />
            {(pathname === 'TASKS' || pathname === 'NOTES') && (<img src={filter} alt='filter-sign' className='filter-sign' style={{marginLeft: '10px', cursor: 'pointer'}} onClick={handleFilterOpen} />)}
            {(pathname === 'TASKS' || pathname === 'NOTES') && (
            <div style={{height: '30px', width: '30px', display: 'flex', alignItems: 'center', marginLeft: '20px', cursor: 'pointer'}} onClick={handleOpen}
            >
                <PlusIcon color='var(--quaternary-font-color)' />
            </div>)}
        </div>
       
        </div>
    )
}

export default BottomBar;