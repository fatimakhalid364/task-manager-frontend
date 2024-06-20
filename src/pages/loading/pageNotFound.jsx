import { Screen } from "src/constants/constants";
import LoadingStatus from "src/components/loading-screens/subComponents/loading-status";
import React from 'react';

function PageNotFound(){
    return(
        <div>
        <LoadingStatus currentScreen = {Screen.PAGE_NOT_FOUND} />
        </div>
    );
}

export default PageNotFound;