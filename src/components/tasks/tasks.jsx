import Sides from "src/components/tasks/subComponents/Sides/Sides";
import { useState } from "react";
import UpperBar from 'src/components/UpperBar/upperbar';
import BellIcon from 'src/assets/bell.svg';



function Tasks(){

    //const [comp, setComp] = useState('');

    

    function handleRouteClick() {
        console.log('clicked');
    }

   

    return(
        <div>
           <Sides clickfunction = {handleRouteClick} />
           <UpperBar PageName='Tasks' BellIcon={BellIcon} />
        </div>
    )
}

export default Tasks;