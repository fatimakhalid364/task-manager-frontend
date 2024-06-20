import { Screen } from "src/constants/constants";
import LoadingStatus from "src/components/loading-screens/subComponents/loading-status";

function PleaseWait(){
    return(
        <div>
        <LoadingStatus currentScreen = {Screen.LOADING} />
        </div>
    );
}

export default PleaseWait;