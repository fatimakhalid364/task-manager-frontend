import ProfileSection from "src/components/defaultcomps/subComponents/UpperBar/subComponents/ProfileSection";
import SearchBar from "src/components/defaultcomps/subComponents/UpperBar/subComponents/SearchBar";
import 'src/components/defaultcomps/subComponents/UpperBar/subComponents/upper_bar.css';
import { useResponsive } from 'src/constants/media_queries';
import { useState } from 'react';
import SearchGlass from "src/assets/search glass.svg";
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { searchThunk } from "src/store/thunks/searchThunk";
import cross from 'src/assets/cross.svg';


function UpperBar({ PageName, BellIcon }) {

    const {
        isAdaptableScreen,
        isLessScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    const [showSearchBar, setShowSearchBar] = useState(false);

    const handleShowSearchBarClick = () => {
        setShowSearchBar(prevValue=> !prevValue);
    }

    const handleChange = (event) => {
        const {value} = event.target;
        setSearchInput(value);
    }

    const [searchInput, setSearchInput] = useState('');

    const handleClick = async () => {
        try{
                let thunkToDispatch = searchThunk(searchInput);
                if (thunkToDispatch) {
                    setSpinner(true);
                    const response = await dispatch(thunkToDispatch).unwrap();
                    setSpinner(false); 
                    console.log('Dispatched thunk response:', response);
                    successToast(response.message, 'search-results-success');
                }
            }catch (error) {
                setSpinner(false);
                console.error('Error occurred while dispatching thunk:', error);
                errorToast(error.message, 'search-results-error')
            }
    }


    return (
            
           <div className='upper-bar-div' style={{left: isAdaptableScreen ? '257px' : '68px', justifyContent: !isAdaptableScreen && 'space-between', width: !isAdaptableScreen && '99vw'}}>
           { !showSearchBar && (<div className='page-title'>
                    {PageName}
                </div>)}
                    {/* { !isAdaptableScreen && !showSearchBar ? (
                        <img 
                        src={SearchGlass} 
                        alt='magnifying-glass' 
                        className='search-glass-image' 
                        onClick={handleShowSearchBarClick} 
                        style={{marginLeft: '73%', marginTop: '3.3px', cursor: 'pointer'}} />): ( */}
                        { isAdaptableScreen && (<div className='upper-bar-search'>
                            <SearchBar showSearchBar={showSearchBar} handleShowSearchBarClick={handleShowSearchBarClick} /> 
                        </div>)}
                        {!isAdaptableScreen && showSearchBar && (
                <Modal open={showSearchBar} sx={{ '& .MuiPaper-root': {outline: 'none'}}}>
                    <div className='search-bar' style={{marginTop: '13px', width: '75%', marginLeft: '14.5%', height: '4%'}}>
                        <form>
                            <input type="search" placeholder="Search here..." className='search-input' onChange={handleChange} value={searchInput} />
                            <button type="submit" className='search-button' onClick={handleClick}>
                                <img src={SearchGlass} alt='magnifying-glass' className='search-glass-image' />
                            </button>
                            <img src={cross} alt='cross' style={{position: 'absolute', left: '97%', top: '36%', cursor: 'pointer' }} onClick={handleShowSearchBarClick} />
                        </form>
                    </div>
                </Modal>)}
                        { !showSearchBar && (
            <div style={{
                display: 'flex', 
                marginLeft: isAdaptableScreen && 'calc(100vw - 66vw)', 
                marginRight: !isAdaptableScreen && '60px',
                width: !isAdaptableScreen && '100px',
               }}>
                {!isAdaptableScreen && (
                <img 
                    src={SearchGlass} 
                    alt='magnifying-glass' 
                    className='search-glass-image' 
                    onClick={handleShowSearchBarClick} 
                    style={{ marginTop: '3.3px', cursor: 'pointer', marginLeft: !isAdaptableScreen && '10px'}} 
                />
            )}
                <div className='bell-icon' style={{marginLeft: !isAdaptableScreen && '10px'}}>
                    <img src={BellIcon} alt='bell-icon' />
                </div>
                <ProfileSection />
            </div>
    )
}
            </div>
    )
}

export default UpperBar;