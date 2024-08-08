
import { useState } from 'react';
import Priority from "src/components/defaultcomps/subComponents/Sides/subComponents/Priority/Priority";
import Routes from "src/components/defaultcomps/subComponents/Sides/subComponents/Routes/Routes";
import 'src/components/defaultcomps/subComponents/Sides/subComponents/sides.css';
import { useResponsive } from 'src/constants/media_queries';

function Sides({clickfunction, burgerMenuClicked }){
    const [hamburgerClicked, setHamburgerClicked] = useState(false);

    const {
        isAdaptableScreen,
        expandBar,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    return (
        <div>
            { isAdaptableScreen && (<div className='tasks-page-side' style={{width: (expandBar && burgerMenuClicked) ? '255px' : '50px' }}>
                <Routes clickfunction = {clickfunction} burgerMenuClicked={ burgerMenuClicked }/>
                <Priority burgerMenuClicked={ burgerMenuClicked } />
            </div>)}
        </div>
    )
}

export default Sides;