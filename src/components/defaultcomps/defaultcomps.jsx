import Sides from "src/components/defaultcomps/subComponents/Sides/Sides";
import UpperBar from 'src/components/defaultcomps/subComponents/UpperBar/upperbar';
import BellIcon from 'src/assets/bell.svg';
import { useState } from "react";



function DefaultComps(){

    const [page, setPage] = useState('');

    function handleRouteClick(event) {
        const {value} = event.target;
        setPage(value);
        console.log(value);
    }

   

    return(
        <div>
            <Sides clickfunction = {handleRouteClick} />
            <UpperBar 
                PageName={page === 'Tasks' ? 'Tasks' : page === 'Dashboard' ? 'Dashboard' : page === 'Notes' ? 'Notes' : page === 'Calendar' ? 'Calendar' : page === 'Settings' ? 'Settings' : null} 
                BellIcon={BellIcon} 
            />
        </div>
    )
}

export default DefaultComps;