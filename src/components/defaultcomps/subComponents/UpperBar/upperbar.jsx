import ProfileSection from "src/components/defaultcomps/subComponents/UpperBar/subComponents/ProfileSection";
import SearchBar from "src/components/defaultcomps/subComponents/UpperBar/subComponents/SearchBar";
import 'src/components/defaultcomps/subComponents/UpperBar/subComponents/upper_bar.css';

function UpperBar({ PageName, BellIcon }) {
    return (
        <div className='upper-bar-div'>
            <div className='page-title'>
                {PageName}
            </div>
            <div className='upper-bar-search'>
                <SearchBar />
            </div>
            <div className='bell-icon'>
                <img src={BellIcon} alt='bell-icon' />
            </div>
            <ProfileSection />
        </div>
    )
}

export default UpperBar;