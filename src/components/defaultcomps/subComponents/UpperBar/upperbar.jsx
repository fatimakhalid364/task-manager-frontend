import ProfileSection from "src/components/defaultcomps/subComponents/UpperBar/subComponents/ProfileSection";
import SearchBar from "src/components/defaultcomps/subComponents/UpperBar/subComponents/SearchBar";
import 'src/components/defaultcomps/subComponents/UpperBar/subComponents/upper_bar.css';
import { useResponsive } from 'src/constants/media_queries';


function UpperBar({ PageName, BellIcon }) {

    const {
        isBiggerScreen,
        isBigScreen,
        isLessScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    return (
        <div className='upper-bar-div'>
            <div className='page-title'>
                {PageName}
            </div>
            <div className='upper-bar-search'>
                <SearchBar />
            </div>
            <div className='bell-icon'style={{marginLeft: isBigScreen && 'calc(100vw - 60vw)' }} >
                <img src={BellIcon} alt='bell-icon' />
            </div>
            <ProfileSection />
        </div>
    )
}

export default UpperBar;