import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sides from "src/components/defaultcomps/subComponents/Sides/Sides";
import UpperBar from 'src/components/defaultcomps/subComponents/UpperBar/upperbar';
import { useResponsive } from 'src/constants/media_queries';






function DefaultComps(){

    const [searchParams] = useSearchParams();
    const title = searchParams.get('page');
    const [burgerMenuClicked, setBurgerMenuClicked] = useState(false);
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

   
    useEffect(() => {
        console.log('burgerMenuClicked inside defaultcomps', burgerMenuClicked);
      }, [burgerMenuClicked]);
    
    
   
    return(
        
       
        <div className='default-components'>
            <Sides clickfunction = {handleRouteClick} burgerMenuClicked = { burgerMenuClicked } />
            <UpperBar 
                PageName={title}
                BellIcon={BellIcon}
                handleBurgerMenuClick = { handleBurgerMenuClick}
            />
        </div>
       
        )
}

export default DefaultComps;