import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import MainDiv from "src/components/maindiv/maindiv";
import 'src/components/settings/settings.css';
import { General } from 'src/components/settings/subComponents/General';
import SettingsFooter from 'src/components/settings/subComponents/SettingsFooter';
import SettingsHeader from 'src/components/settings/subComponents/SettingsHeader';
import { SettingsScreen } from "src/constants/constants";
import { setColor } from 'src/store/slices/appearanceSlice';
import { setDateFormat, setTimeFormat } from 'src/store/slices/formatSlice';


function Settings({ currentSettingsScreen }) {
    const { isAdaptableScreen } = useResponsive();
    const [isGeneralClicked, setIsGeneralClicked] = useState (false);
    const dispatch = useDispatch();
    const location = useLocation();
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
                <SettingsHeader />
                    { currentSettingsScreen = SettingsScreen.GENERAL ? (
                        <General
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

                    ) : (<div></div>) }
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