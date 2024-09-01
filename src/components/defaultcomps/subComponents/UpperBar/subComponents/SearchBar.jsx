
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchThunk } from "src/store/thunks/searchThunk";
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { useResponsive } from 'src/constants/media_queries';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import cross from 'src/assets/cross.svg';
import SearchGlass from 'src/components/icons/SearchGlass';
import { useSelector } from 'react-redux';

function SearchBar({ showSearchBar, handleShowSearchBarClick }){
    const accentColor = useSelector((state) => state.appearance.color);
    const [hovered, setHovered] = useState(false);
    const handleMouseEnter = () => {
       setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };
    const {
        isAdaptableScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
        expandBar,
    } = useResponsive();

    const [searchInput, setSearchInput] = useState('');
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false);
    

    const handleChange = (event) => {
        const {value} = event.target;
        setSearchInput(value);
    }

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
        <div>
        { isAdaptableScreen && (<div className='search-bar-div' style={{ marginLeft: !expandBar && '16rem'}}>
            <SpinnerLoader showSpinner={spinner} />
           <div className='search-bar'>
                <form>
                <input 
                type="search" 
                placeholder="Search here..." 
                className={`search-input ${(hovered && accentColor === 'pink') ? 'search-pink-input' : (hovered && accentColor === 'green') ? 'search-green-input' : (hovered && accentColor === 'orange') ? 'search-orange-input' : (hovered && accentColor === 'blue') ? 'search-blue-input'  : ''}`}  
                onChange={handleChange} 
                value={searchInput} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                />
                    <button type="submit" className='search-button' onClick={handleClick}>
                        <SearchGlass color={accentColor === 'pink'
                            ? 'var(--pink-accent-color)'
                            : accentColor === 'green'
                            ? 'var(--green-accent-color)'
                            : accentColor === 'orange'
                            ? 'var(--orange-accent-color)'
                            : 'var(--primary-background-color)'} />
                    </button>
                </form>

            </div>
            </div>)} 
            {!isAdaptableScreen && showSearchBar && (
                <Modal open={showSearchBar} sx={{ '& .MuiPaper-root': {outline: 'none'}}}>
                    <div className='search-bar' style={{marginTop: '13px', width: '75%', marginLeft: '14.5%', height: '4%'}}>
                        <form>
                            <input 
                                type="search" 
                                placeholder="Search here..." 
                                className={`search-input ${(hovered) ? 'search-pink-input' 
                                    : '' }`}  
                                onChange={handleChange} 
                                value={searchInput} 
                                onMouseEnter={handleMouseEnter} 
                                onMouseLeave={handleMouseLeave}
                                style={{borderColor: hovered ?
                                    (accentColor === 'pink'
                                        ? 'var(--pink-accent-color)'
                                        : accentColor === 'green'
                                        ? 'var(--green-accent-color)'
                                        : accentColor === 'orange'
                                        ? 'var(--orange-accent-color)'
                                        : accentColor === 'blue'
                                        ? 'var(--primary-background-color)'
                                        : 'var(--quaternary-font-color)') : '', outline: hovered ? 'none' : '' }} />
                            <button type="submit" className='search-button' onClick={handleClick}>
                                <SearchGlass color={accentColor === 'pink'
                                    ? 'var(--pink-accent-color)'
                                    : accentColor === 'green'
                                    ? 'var(--green-accent-color)'
                                    : accentColor === 'orange'
                                    ? 'var(--orange-accent-color)'
                                    : 'var(--primary-background-color)'} />
                            </button>
                            <img src={cross} alt='cross' style={{position: 'absolute', left: '97%', top: '36%', cursor: 'pointer' }} onClick={handleShowSearchBarClick} />
                        </form>
                    </div>
                </Modal>)}
        </div>
    )
}

SearchBar.propTypes = {
    showSearchBar: PropTypes.bool.isRequired,
    handleShowSearchBarClick: PropTypes.func.isRequired,
};

export default SearchBar;