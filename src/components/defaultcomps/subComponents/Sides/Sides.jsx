import Logo from "src/components/defaultcomps/subComponents/Sides/subComponents/Logo";
import Routes from "src/components/defaultcomps/subComponents/Sides/subComponents/Routes/Routes";
import Priority from "src/components/defaultcomps/subComponents/Sides/subComponents/Priority/Priority";
import 'src/components/defaultcomps/subComponents/Sides/subComponents/sides.css';
import { useState } from 'react';
import { useResponsive } from 'src/constants/media_queries';

function Sides({clickfunction}){
    const [hamburgerClicked, setHamburgerClicked] = useState(false);

    const {
        isAdaptableScreen,
        expandBar,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    return (
        <div className='tasks-page-side' style={{width: expandBar ? '255px' : '50px' }}>
            <Logo  />
            <Routes clickfunction = {clickfunction} />
            <Priority />
        </div>
    )
}

export default Sides;