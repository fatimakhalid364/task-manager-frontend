import 'src/components/settings/settings.css';
import MainDiv from "src/components/maindiv/maindiv";
import SettingsHeader from 'src/components/settings/subComponents/SettingsHeader';
import {useState} from 'react';
import SettingsFooter from 'src/components/settings/subComponents/SettingsFooter';
import { useLocation } from "react-router-dom";
import General from 'src/components/settings/subComponents/General';
import { SettingsScreen } from "src/constants/constants";

function Settings({ currentSettingsScreen }) {
    const [isGeneralClicked, setIsGeneralClicked] = useState (false);
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <MainDiv>
            <div className='settings-page-div'>
                <SettingsHeader />
                    { currentSettingsScreen = SettingsScreen.GENERAL ? (
                        <General />
                    ) : (<div></div>) }
                <SettingsFooter />
            </div>
        </MainDiv>
    )
}

export default Settings;