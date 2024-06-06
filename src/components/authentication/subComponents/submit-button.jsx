import { getButtonText, getRoutingStatement, getRoutingText } from "src/utils/basicUtils";
function SubmitButton({ currentScreen }) {

    return(
        <div className='submit-div'>
            <input type='submit' value={getButtonText(currentScreen)} className='submit-button' />
            <div className='prompt-to-signin'>{getRoutingStatement(currentScreen)}<a href='https://localhost:5173/authentication/signin'>{getRoutingText(currentScreen)}</a></div>
        </div>
    )
}

export default SubmitButton;