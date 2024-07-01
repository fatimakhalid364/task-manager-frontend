import SearchBar from "src/components/defaultcomps/subComponents/UpperBar/subComponents/SearchBar";

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
            <div>
                
            </div>
        </div>
    )
}

export default UpperBar;