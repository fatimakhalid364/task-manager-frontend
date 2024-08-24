import 'src/components/settings/settings.css';
import MainDiv from "src/components/maindiv/maindiv";
import SettingsHeader from 'src/components/settings/subComponents/SettingsHeader';
import {useState} from 'react';
import SettingsFooter from 'src/components/settings/subComponents/SettingsFooter';

function Settings() {
    const [isGeneralClicked, setIsGeneralClicked] = useState (false);

    return (
        <MainDiv>
            <div className='settings-page-div'>
                <SettingsHeader />
                <SettingsFooter />
            </div>
        </MainDiv>
    )
}

export default Settings;