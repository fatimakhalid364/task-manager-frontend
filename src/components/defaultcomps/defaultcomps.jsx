import Sides from "src/components/defaultcomps/subComponents/Sides/Sides";
import UpperBar from 'src/components/defaultcomps/subComponents/UpperBar/upperbar';
import BellIcon from 'src/assets/bell.svg';
import { renderToString } from 'react-dom/server'
import { useState } from "react";
import {useNavigate, useSearchParams } from 'react-router-dom';
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import AddTask from "src/components/tasks/sub_components/add_task";
import { Context as ResponsiveContext } from 'react-responsive';
import { render } from '@testing-library/react';
import { useResponsive } from 'src/constants/media_queries';





function DefaultComps(){

    const [searchParams] = useSearchParams();
    const title = searchParams.get('page');

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

    console.log('expandBar:', expandBar);
    console.log('isBp1:', isBp1);
    console.log('isBp2:', isBp2);
    console.log('isBp3:', isBp3);
    console.log('isBp4:', isBp4);
    console.log('isBp5:', isBp5);
    console.log('isBp6:', isBp6);
    console.log('isBp7:', isBp7);
    console.log('isAdaptableScreen:', isAdaptableScreen);
    console.log('onWholeScreen:', onWholeScreen);
    console.log(':', );
    console.log('isSmallScreen:', isSmallScreen);
    console.log('isSmallerScreen:', isSmallerScreen);
    console.log('isMobileScreen:', isMobileScreen);
    console.log('isMicroScreen:', isMicroScreen);
   
    return(
        
        // <ResponsiveContext.Provider value={{width: 500}}>
        <div className='default-components'>
            <Sides clickfunction = {handleRouteClick} />
            <UpperBar 
                PageName={title}
                BellIcon={BellIcon} 
            />
        </div>
        // </ResponsiveContext.Provider>
        )
}

export default DefaultComps;