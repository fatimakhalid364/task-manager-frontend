import SearchGlass from "src/assets/search glass.svg";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchThunk } from "src/store/thunks/searchThunk";
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import { errorToast, successToast } from 'src/components/toasters/toast.js';

function SearchBar(){

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
        <div className='search-bar-div'>
            <SpinnerLoader showSpinner={spinner} />
            <div className='search-bar'>
                <form>
                    <input type="search" placeholder="Search here..." className='search-input' onChange={handleChange} value={searchInput} />
                    <button type="submit" className='search-button' onClick={handleClick}>
                        <img src={SearchGlass} alt='magnifying-glass' className='search-glass-image' />
                    </button>
                </form>

            </div>
        </div>
    )
}

export default SearchBar;