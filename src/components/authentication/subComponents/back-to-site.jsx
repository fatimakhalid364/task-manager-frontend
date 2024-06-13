import leftArrow from 'src/assets/Vector (Stroke).svg';
import { Box, Grid } from '@mui/material';

function BackToSite() {
    return (
       
            <button className='backtosite-button'>
                <img className='leftarrow-img' src={leftArrow} alt='left arrow' />
                <div className='backtosite-text'>Back to site</div>
            </button>
     
        
    )
}

export default BackToSite;