import 'src/components/maindiv/main_div.css';
import { useResponsive } from 'src/constants/media_queries';

function MainDiv({ children }) {
    const {
        isAdaptableScreen,
        isLessScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();
    return (
        <main className='changing-component-div' style={{left: isAdaptableScreen ? '25.74rem' : '6.8rem', width: isAdaptableScreen ? '83.26vw' : '95vw'}}>
            <div className='changing-component'>
                {children}
            </div>
        </main>
    )
}

export default MainDiv;