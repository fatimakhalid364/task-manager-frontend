import 'src/components/settings/settings.css';
import MainDiv from "src/components/maindiv/maindiv";
import SettingsHeader from 'src/components/settings/subComponents/SettingsHeader';
import {useState} from 'react';
import SettingsFooter from 'src/components/settings/subComponents/SettingsFooter';
import { useLocation } from "react-router-dom";
import {General} from 'src/components/settings/subComponents/General';
import { SettingsScreen } from "src/constants/constants";

function Settings({ currentSettingsScreen }) {
    const [isGeneralClicked, setIsGeneralClicked] = useState (false);
    const location = useLocation();
    const [isBlueClicked, setIsBlueClicked] = useState(false);
    const [isPinkClicked, setIsPinkClicked] = useState(false);
    const [isGreenClicked, setIsGreenClicked] = useState(false);
    const [isOrangeClicked, setIsOrangeClicked] = useState(false);

    const handleBlueClick = () => {
        setIsBlueClicked(prevValue=> !prevValue);
        setIsPinkClicked(false);
        setIsGreenClicked(false);
        setIsOrangeClicked(false);
      
    }

    const handlePinkClick = () => {
        setIsPinkClicked(prevValue=> !prevValue);
        setIsBlueClicked(false);
        setIsGreenClicked(false);
        setIsOrangeClicked(false);
    }

    const handleGreenClick = () => {
        setIsGreenClicked(prevValue=> !prevValue);
        setIsPinkClicked(false);
        setIsBlueClicked(false);
        setIsOrangeClicked(false);
    }

    const handleOrangeClick = () => {
        setIsOrangeClicked(prevValue=> !prevValue);
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
                isBlueClicked = {isBlueClicked}
                handleBlueClick = {handleBlueClick}
                isPinkClicked = {isPinkClicked}
                handlePinkClick = {handlePinkClick}
                isOrangeClicked = {isOrangeClicked}
                handleOrangeClick = {handleOrangeClick}
                isGreenClicked = {isGreenClicked}
                handleGreenClick = {handleGreenClick}/>
            </div>
        </MainDiv>
    )
}

export default Settings;