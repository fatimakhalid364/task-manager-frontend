import { getButtonText, getRoutingText } from "src/utils/basicUtils";
function SubmitButton({ currentScreen }) {

    const text = getButtonText(currentScreen)
    const routingText = getRoutingText(currentScreen);

    return(
        <div className='submit-div'>
            <input type='submit' value={text} className='submit-button' />
            <div className='prompt-to-signin'>Already have an account? <a href='https://localhost:5173/authentication/signin'>{routingText}</a></div>
        </div>
    )
}

export default SubmitButton;