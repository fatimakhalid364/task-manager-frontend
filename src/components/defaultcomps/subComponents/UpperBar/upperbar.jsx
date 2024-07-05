import { useSelector } from 'react-redux';
import SearchBar from "src/components/defaultcomps/subComponents/UpperBar/subComponents/SearchBar";

function UpperBar({ PageName, BellIcon }) {
    const user = useSelector(state => state.auth?.user);

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
            <div>{user?.firstName + " " + user?.lastName}</div>
            <div>
                
            </div>
        </div>
    )
}

export default UpperBar;