import Sides from "src/components/defaultcomps/subComponents/Sides/Sides";
import UpperBar from 'src/components/defaultcomps/subComponents/UpperBar/upperbar';
import BellIcon from 'src/assets/bell.svg';
import { renderToString } from 'react-dom/server'
import { useState } from "react";
import {useNavigate, useSearchParams } from 'react-router-dom';
import SpinnerLoader from "src/components/LoadingScreens/SpinnerLoader";
import AddTask from "src/components/tasks/sub_components/add_task";
import { Context as ResponsiveContext } from 'react-responsive';
import { render } from '@testing-library/react'





function DefaultComps(){

    const [searchParams] = useSearchParams();
    const title = searchParams.get('page');

    function handleRouteClick() {
        console.log('clicked route');
    }

   
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