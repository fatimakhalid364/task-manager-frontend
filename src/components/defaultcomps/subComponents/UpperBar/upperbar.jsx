import ProfileSection from "src/components/defaultcomps/subComponents/UpperBar/subComponents/ProfileSection";
import SearchBar from "src/components/defaultcomps/subComponents/UpperBar/subComponents/SearchBar";
import 'src/components/defaultcomps/subComponents/UpperBar/subComponents/upper_bar.css';
import { useResponsive } from 'src/constants/media_queries';
import { useState } from 'react';
import SearchGlass from 'src/components/icons/SearchGlass'
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { searchThunk } from "src/store/thunks/searchThunk";
import cross from 'src/assets/cross.svg';
import Logo from "src/components/defaultcomps/subComponents/UpperBar/subComponents/Logo";
import { useSelector } from "react-redux";




function UpperBar({ PageName, BellIcon, handleBurgerMenuClick, showSearchBar, handleShowSearchBarClick }) {
    const accentColor = useSelector((state) => state.appearance.color);

    const {
        isBp6,
        isBp2,
        isBp1,
        isBp5,
        isBp3,
        isAdaptableScreen,
        isBp4,
        isBp7,
        isBp8,
        expandBar,
        isSmallScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    // const [showSearchBar, setShowSearchBar] = useState(false);

    // const handleShowSearchBarClick = () => {
    //     setShowSearchBar(prevValue=> !prevValue);
    // }

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
            
           <div className='upper-bar-div' style={{ justifyContent: !isAdaptableScreen && 'space-between', zIndex: isMicroScreen && '999'}}>
           { !showSearchBar && (<div className='page-title' style={{ marginLeft: !isAdaptableScreen && '18px' }}>
                    { isAdaptableScreen && (<Logo handleBurgerMenuClick={ handleBurgerMenuClick }/>)}
                    <div>
                        {/* <img src={appLogo} alt='app-logo' style={{height: '25px', width: '25px'}}/> */}
                        Manageria
                    </div>
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
                                <SearchGlass color='var(--primary-background-color)'/>
                            </button>
                            <img src={cross} alt='cross' style={{position: 'absolute', left: '97%', top: '36%', cursor: 'pointer' }} onClick={handleShowSearchBarClick} />
                        </form>
                    </div>
                </Modal>)}
                        { !showSearchBar && (
            <div style={{
                display: 'flex', 
                marginLeft: (isBp1 || isBp2 || isBp3 || isBp4 || isBp5) ? 'calc(100vw - 54vw)' : 
                            isBp6 ? 'calc(100vw - 54vw)': 
                            isBp7 ? 'calc(100vw - 55vw)': 
                            isBp8 ? 'calc(100vw - 56vw)' :
                            isMicroScreen ? 'calc(100vw - 52vw)' : 'calc(100vw - 48vw)', 
                marginRight:  !isAdaptableScreen && '40px',
                width: !isAdaptableScreen && '100px',
               }}>
                {!isAdaptableScreen && !isMicroScreen && (
                // <img 
                //     src={SearchGlass} 
                //     alt='magnifying-glass' 
                //     className='search-glass-image' 
                //     onClick={handleShowSearchBarClick} 
                //     style={{ marginTop: '1px', cursor: 'pointer', marginLeft: !isAdaptableScreen && '10px'}} 
                // 
                <div onClick={handleShowSearchBarClick} style={{ marginTop: '10px', cursor: 'pointer', marginLeft: !isAdaptableScreen && '10px' }}>
                    <SearchGlass color='var(--primary-background-color)'/>
                </div>
            )}
                { !isMicroScreen && (<div className='bell-icon' style={{marginLeft: !isAdaptableScreen && '20px', marginTop: !isAdaptableScreen && '11px'}}>
                    
                    <BellIcon color='var(--primary-background-color)'/>
                </div>)}
                <ProfileSection />
            </div>
    )
}
            </div>
    )
}

export default UpperBar;