import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sides from "src/components/defaultcomps/subComponents/Sides/Sides";
import UpperBar from "src/components/defaultcomps/subComponents/UpperBar/upperbar";
import "src/components/maindiv/main_div.css";
import { useResponsive } from "src/constants/media_queries";
import BellIcon from "src/components/icons/BellIcon";
import { MobileBottomBar } from 'src/components/MobileBottomBar/MobileBottomBar';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SecMobileBottomBar } from 'src/components/SecMobileBottomBar/SecMobileBottomBar';
import { useNavigate } from "react-router-dom";



function MainDiv({ children }) {
    const {
        isAdaptableScreen,
        expandBar,
        onWholeScreen,

        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();
    const [burgerMenuClicked, setBurgerMenuClicked] = useState(isMicroScreen ? false : true);
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    const handleBurgerMenuClick = (e, path) => {
        if (isMicroScreen) {
            e.preventDefault();
            
        };
        setBurgerMenuClicked((prevValue) => !prevValue);
        isMicroScreen && setTimeout(() => navigate(path), 200);
       
        console.log('burgermenuclick handled');
    };

    const [showSearchBar, setShowSearchBar] = useState(false);

    const handleShowSearchBarClick = () => {
        setShowSearchBar(prevValue=> !prevValue);
    }

    useEffect(() => {
       console.log('value of burgermenuclicked is ///////////////////// ' + burgerMenuClicked);
    }, [])
    const [searchParams] = useSearchParams();
    const title = searchParams.get("page");
    function handleRouteClick() {
        console.log("clicked route");
    }
    
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
            { (isMicroScreen && !isAdaptableScreen && (pathname == '/notes' || pathname == '/tasks')) && (<MobileBottomBar handleBurgerMenuClick={handleBurgerMenuClick} handleShowSearchBarClick={handleShowSearchBarClick} BellIcon={BellIcon}/>)}
            { (isMicroScreen && !isAdaptableScreen && (pathname == '/settings' || pathname == '/calendar' || pathname == '/dashboard')) && (<SecMobileBottomBar handleBurgerMenuClick={handleBurgerMenuClick} handleShowSearchBarClick={handleShowSearchBarClick} BellIcon={BellIcon}/>)}

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
