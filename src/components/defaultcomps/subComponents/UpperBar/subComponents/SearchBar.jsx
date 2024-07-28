import SearchGlass from "src/assets/search glass.svg";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchThunk } from "src/store/thunks/searchThunk";
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import { errorToast, successToast } from 'src/components/toasters/toast.js';
import { useResponsive } from 'src/constants/media_queries';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import cross from 'src/assets/cross.svg';

function SearchBar({ showSearchBar, handleShowSearchBarClick }){

    const {
        isAdaptableScreen,
        isLessScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
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
        { isAdaptableScreen && (<div className='search-bar-div'>
            <SpinnerLoader showSpinner={spinner} />
           <div className='search-bar'>
                <form>
                    <input type="search" placeholder="Search here..." className='search-input' onChange={handleChange} value={searchInput} />
                    <button type="submit" className='search-button' onClick={handleClick}>
                        <img src={SearchGlass} alt='magnifying-glass' className='search-glass-image' />
                    </button>
                </form>

            </div>
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
        </div>
    )
}

SearchBar.propTypes = {
    showSearchBar: PropTypes.bool.isRequired,
    handleShowSearchBarClick: PropTypes.func.isRequired,
};

export default SearchBar;