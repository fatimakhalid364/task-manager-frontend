import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import MainDiv from "src/components/maindiv/maindiv";
import 'src/components/settings/settings.css';
import { General } from 'src/components/settings/subComponents/General';
import { Account } from 'src/components/settings/subComponents/Account';
import SettingsFooter from 'src/components/settings/subComponents/SettingsFooter';
import SettingsHeader from 'src/components/settings/subComponents/SettingsHeader';
import { SettingsScreen } from "src/constants/constants";
import BottomBar from 'src/components/BottomBar/BottomBar';
import { useResponsive } from 'src/constants/media_queries';
import { setColor } from 'src/store/slices/appearanceSlice';
import { setDateFormat, setTimeFormat } from 'src/store/slices/formatSlice';



function Settings({ currentSettingsScreen }) {

    const { isAdaptableScreen } = useResponsive();
    const [isGeneralClicked, setIsGeneralClicked] = useState (true);
    const [isAccountClicked, setIsAccountClicked] = useState (false);
    const [isNotificationClicked, setIsNotificationClicked] = useState (false);
    const [isLogoutClicked, setIsLogoutClicked] = useState (false);
    const handleGeneralClick = () => {
        setIsGeneralClicked(true);
       
        setIsAccountClicked(false);
        setIsNotificationClicked(false);
        setIsLogoutClicked(false);
      
    }
    const handleNotificationClick = () => {
        setIsGeneralClicked(false);
       
        setIsAccountClicked(false);
        setIsNotificationClicked(true);
        setIsLogoutClicked(false);
      
    }
    const handleAccountClick = () => {
        setIsGeneralClicked(false);
       
        setIsAccountClicked(true);
        setIsNotificationClicked(false);
        setIsLogoutClicked(false);
      
    }
    const handleLogoutClick = () => {
        setIsGeneralClicked(false);
       
        setIsAccountClicked(false);
        setIsNotificationClicked(false);
        setIsLogoutClicked(true);
      
    }
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const [isBlueClicked, setIsBlueClicked] = useState(false);
    const [isPinkClicked, setIsPinkClicked] = useState(false);
    const [isGreenClicked, setIsGreenClicked] = useState(false);
    const [isOrangeClicked, setIsOrangeClicked] = useState(false);
    const [allFalse, setAllFalse] = useState(true);
    const [selectedColor, setSelectedColor] = useState('');
    const [timeFormatLocal, setTimeFormatLocal] = useState(useSelector((state) => state.format.timeFormat));
    const [dateFormatLocal, setDateFormatLocal] = useState(useSelector((state) => state.format.dateFormat));

    const handleDateFormat = (value) => {
        console.log(value)
        setDateFormatLocal(value);
    }
    const handleTimeFormat = (value) => {
        console.log(value)

        setTimeFormatLocal(value);
    }
    const handleBlueClick = () => {
        setIsBlueClicked(prevValue=> !prevValue);
        setSelectedColor('blue');
        setAllFalse(false);
        setIsPinkClicked(false);
        setIsGreenClicked(false);
        setIsOrangeClicked(false);
      
    }

    const handlePinkClick = () => {
        setIsPinkClicked(prevValue=> !prevValue);
        setSelectedColor('pink');
        setAllFalse(false);
        setIsBlueClicked(false);
        setIsGreenClicked(false);
        setIsOrangeClicked(false);
    }

    const handleGreenClick = () => {
        setIsGreenClicked(prevValue=> !prevValue);
        setSelectedColor('green');
        setAllFalse(false);
        setIsPinkClicked(false);
        setIsBlueClicked(false);
        setIsOrangeClicked(false);
    }

    const handleOrangeClick = () => {
        setIsOrangeClicked(prevValue=> !prevValue);
        setSelectedColor('orange');
        setAllFalse(false);
        setIsPinkClicked(false);
        setIsGreenClicked(false);
        setIsBlueClicked(false);
    }
    const handleSave = () => {
        dispatch(setColor(selectedColor));
        dispatch(setDateFormat(dateFormatLocal))
        dispatch(setTimeFormat(timeFormatLocal))
        setAllFalse(true);
        setIsOrangeClicked(false);
        setIsPinkClicked(false);
        setIsGreenClicked(false);
        setIsBlueClicked(false);


    }


    return (
        <MainDiv>
            <div className='settings-page-div'>
                <SettingsHeader handleGeneralClick={handleGeneralClick} 
                handleNotificationClick={handleNotificationClick}
                handleAccountClick={handleAccountClick}
                handleLogoutClick={handleLogoutClick}
                isGeneralClicked = {isGeneralClicked}
                isAccountClicked = {isAccountClicked}
                isNotificationClicked = {isNotificationClicked}
                isLogoutClicked = {isLogoutClicked} />
              
                    { isGeneralClicked ? (<General
                        allFalse={allFalse}
                        handleDateFormat={handleDateFormat}
                        dateFormat={dateFormatLocal}
                        handleTimeFormat={handleTimeFormat}
                        timeFormat={timeFormatLocal}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        isBlueClicked = {isBlueClicked}
                        handleBlueClick = {handleBlueClick}
                        isPinkClicked = {isPinkClicked}
                        handlePinkClick = {handlePinkClick}
                        isOrangeClicked = {isOrangeClicked}
                        handleOrangeClick = {handleOrangeClick}
                        isGreenClicked = {isGreenClicked}
                        handleGreenClick = {handleGreenClick}/>
                    ) : isAccountClicked ? (<Account />) : (<div></div>)
                }
                   
                <SettingsFooter
                    handleSave={handleSave}
                isBlueClicked = {isBlueClicked}
                handleBlueClick = {handleBlueClick}
                isPinkClicked = {isPinkClicked}
                handlePinkClick = {handlePinkClick}
                isOrangeClicked = {isOrangeClicked}
                handleOrangeClick = {handleOrangeClick}
                isGreenClicked = {isGreenClicked}
                handleGreenClick = {handleGreenClick}/>
            </div>
            {!isAdaptableScreen && <BottomBar  />}
        </MainDiv>
    )
}

export default Settings;