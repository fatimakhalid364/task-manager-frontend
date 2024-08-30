import Settings from "../../components/settings/settings";
import { SettingsScreen } from "src/constants/constants";

const GeneralPage = () => {
    return (
        <>
            <Settings currentSettingsScreen = {SettingsScreen.GENERAL} />
        </>
    )
}

export default GeneralPage;