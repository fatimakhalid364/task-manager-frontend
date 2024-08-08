import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useResponsive } from 'src/constants/media_queries';

function Logo({ handleBurgerMenuClick }) {
    const {
        isAdaptableScreen

    } = useResponsive();
    return (
        <div>
            { isAdaptableScreen && (<div className='page-logo-div'>
                <MenuOutlinedIcon sx={{fontSize: '20px', color: 'var(--quinary-font-color)', cursor: 'pointer' }} onClick={ handleBurgerMenuClick } />
            </div>)}
        </div>
    )
}
export default Logo;