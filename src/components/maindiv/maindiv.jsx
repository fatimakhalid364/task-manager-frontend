import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BellIcon from "src/assets/bell.svg";
import Sides from "src/components/defaultcomps/subComponents/Sides/Sides";
import UpperBar from "src/components/defaultcomps/subComponents/UpperBar/upperbar";
import "src/components/maindiv/main_div.css";
import { useResponsive } from "src/constants/media_queries";



function MainDiv({ children }) {
    const [burgerMenuClicked, setBurgerMenuClicked] = useState(true);

    const handleBurgerMenuClick = () => {
        setBurgerMenuClicked((prevValue) => !prevValue);
    };
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
                />
            </div>

            <div style={{ display: 'block', justifyContent: 'space-between', gap: '20px' }}>
                <Sides
                    clickfunction={handleRouteClick}
                    burgerMenuClicked={burgerMenuClicked}
                />

                <div
                    className='changing-component'
                    style={{
                        width: (!expandBar && !onWholeScreen) || ( expandBar && !burgerMenuClicked) ? '96%' : (onWholeScreen) ? '100%' :  '81%', 
                        height: (onWholeScreen ) && '100%', 
                        marginTop: (onWholeScreen) && '0',
                        marginLeft: (expandBar && burgerMenuClicked) ? '276px': (onWholeScreen && isAdaptableScreen) ? '57px' : !isAdaptableScreen ? '0px' : '67px',
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
