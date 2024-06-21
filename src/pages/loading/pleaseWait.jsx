import { Screen } from "src/constants/constants";
import LoadingStatus from "src/components/loading-screens/subComponents/loading-status";
import Loader from "src/components/loading-screens/subComponents/loader";

function PleaseWait(){
    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Loader />
            <LoadingStatus currentScreen = {Screen.LOADING} />
        </div>
    );
}

export default PleaseWait;