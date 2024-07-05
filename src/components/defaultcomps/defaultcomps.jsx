import Sides from "src/components/defaultcomps/subComponents/Sides/Sides";
import UpperBar from 'src/components/defaultcomps/subComponents/UpperBar/upperbar';
import BellIcon from 'src/assets/bell.svg';
import { useState } from "react";
import {useNavigate, useSearchParams } from 'react-router-dom';
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";




function DefaultComps(){

    const [searchParams] = useSearchParams();
    const title = searchParams.get('page');

    function handleRouteClick() {
        console.log('clicked route');
    }

   
    return(
        <div>
            <Sides clickfunction = {handleRouteClick} />
            <UpperBar 
                PageName={title}
                BellIcon={BellIcon} 
            />
        </div>
    )
}

export default DefaultComps;