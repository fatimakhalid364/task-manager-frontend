import { useSearchParams } from 'react-router-dom';
import BellIcon from 'src/assets/bell.svg';
import Sides from "src/components/defaultcomps/subComponents/Sides/Sides";
import UpperBar from 'src/components/defaultcomps/subComponents/UpperBar/upperbar';
import { useResponsive } from 'src/constants/media_queries';
import { useState } from 'react';
import {useEffect} from 'react';





function DefaultComps(){

    const [searchParams] = useSearchParams();
    const title = searchParams.get('page');
    const [burgerMenuClicked, setBurgerMenuClicked] = useState(true);
    const handleBurgerMenuClick = () => {
        setBurgerMenuClicked(prevValue => !prevValue);
    }

    const {
        isBp2,
        isBp3,
        isBp4,
        isBp5,
        isBp7,
        isAdaptableScreen,
        expandBar,
        isBp1,
        isBp6,
        isSmallScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
        onWholeScreen,
        
    } = useResponsive();

    function handleRouteClick() {
        console.log('clicked route');
    }

    // console.log('expandBar:', expandBar);
    // console.log('isBp1:', isBp1);
    // console.log('isBp2:', isBp2);
    // console.log('isBp3:', isBp3);
    // console.log('isBp4:', isBp4);
    // console.log('isBp5:', isBp5);
    // console.log('isBp6:', isBp6);
    // console.log('isBp7:', isBp7);
    // console.log('isAdaptableScreen:', isAdaptableScreen);
    // console.log('onWholeScreen:', onWholeScreen);
    // console.log(':', );
    // console.log('isSmallScreen:', isSmallScreen);
    // console.log('isSmallerScreen:', isSmallerScreen);
    // console.log('isMobileScreen:', isMobileScreen);
    // console.log('isMicroScreen:', isMicroScreen);
    useEffect(() => {
        console.log('burgerMenuClicked inside defaultcomps', burgerMenuClicked);
      }, [burgerMenuClicked]);
    
    
   
    return(
        
        // <ResponsiveContext.Provider value={{width: 500}}>
        <div className='default-components'>
            <Sides clickfunction = {handleRouteClick} burgerMenuClicked = { burgerMenuClicked } />
            <UpperBar 
                PageName={title}
                BellIcon={BellIcon}
                handleBurgerMenuClick = { handleBurgerMenuClick}
            />
        </div>
        // </ResponsiveContext.Provider>
        )
}

export default DefaultComps;