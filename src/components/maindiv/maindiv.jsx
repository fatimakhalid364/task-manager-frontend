import 'src/components/maindiv/main_div.css';
import { useResponsive } from 'src/constants/media_queries';
import DefaultComps from '../defaultcomps/defaultcomps';


function MainDiv({ children }) {
    const {
        isAdaptableScreen,
        expandBar,
        onWholeScreen,
        
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();
    return (

        <main className='changing-component-div' style={{ left: expandBar ? '257.4px' : '51px', width: expandBar ? '84vw' : '97vw' }}>
            <DefaultComps />

            <div className='changing-component' style={{
                width: (onWholeScreen) && '100%', 
                height: (onWholeScreen ) && '100%', 
                marginTop: (onWholeScreen) && '0',
                display: (onWholeScreen) && 'block',
                }}>
                {children}
            </div>
        </main>
    )
}

export default MainDiv;