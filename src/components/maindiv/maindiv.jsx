import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sides from "src/components/defaultcomps/subComponents/Sides/Sides";
import UpperBar from "src/components/defaultcomps/subComponents/UpperBar/upperbar";
import "src/components/maindiv/main_div.css";
import { useResponsive } from "src/constants/media_queries";
import BellIcon from "src/components/icons/BellIcon";
import { MobileBottomBar } from 'src/components/MobileBottomBar/MobileBottomBar';
import { useEffect } from "react";



function MainDiv({ children }) {
    const [burgerMenuClicked, setBurgerMenuClicked] = useState(true);

    const handleBurgerMenuClick = () => {
        setBurgerMenuClicked((prevValue) => !prevValue);
    };

    const [showSearchBar, setShowSearchBar] = useState(false);

    const handleShowSearchBarClick = () => {
        setShowSearchBar(prevValue=> !prevValue);
    }

    // useEffect(() => {
    //     isMicroScreen && setBurgerMenuClicked(false); 
    // }, [])
    const [searchParams] = useSearchParams();
    const title = searchParams.get("page");
    function handleRouteClick() {
        console.log("clicked route");
    }
    const {
        isAdaptableScreen,
        expandBar,
        onWholeScreen,

        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();
    return (
        <main
            className='changing-component-div'
            style={{
                left: expandBar ? "0" : "0",
                width: expandBar ? "100vw" : "100vw",
                backgroundColor: onWholeScreen && "var(--neutral-background-color)",
            }}
        >
            <div className='default-components'>
                <UpperBar
                    PageName={title}
                    BellIcon={BellIcon}
                    handleBurgerMenuClick={handleBurgerMenuClick}
                    showSearchBar={showSearchBar}
                    handleShowSearchBarClick={handleShowSearchBarClick}
                />
            </div>
            { (isMicroScreen && !isAdaptableScreen) && (<MobileBottomBar handleBurgerMenuClick={handleBurgerMenuClick} handleShowSearchBarClick={handleShowSearchBarClick} BellIcon={BellIcon}/>)}

            <div style={{ display: 'block', justifyContent: 'space-between', gap: '20px' }}>
                <Sides
                    clickfunction={handleRouteClick}
                    burgerMenuClicked={burgerMenuClicked}
                    handleBurgerMenuClick={handleBurgerMenuClick}
                />


                <div
                    className='changing-component'
                    style={{
                        width: (!expandBar && !onWholeScreen) || ( expandBar && !burgerMenuClicked) ? '96%' : (onWholeScreen) ? '100%' :  '81%', 
                        height: (onWholeScreen ) && '100%', 
                        marginTop: (onWholeScreen) && '0',
                        marginLeft: (expandBar && burgerMenuClicked) ? '262px': (onWholeScreen && isAdaptableScreen) ? '57px' : !isAdaptableScreen ? '0px' : '55px',
                        display: (onWholeScreen && isAdaptableScreen) && 'block',
                        transition: 'marginLeft 0.4s ease-in'
                    }}
                >
             
               
                    {children}
                </div>
            </div>
        </main>
    );
}

export default MainDiv;
