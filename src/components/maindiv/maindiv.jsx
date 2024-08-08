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

        <main className='changing-component-div' style={{   left: expandBar ? '0' : '0', 
                                                            width: expandBar ? '100vw' : '100vw',
                                                            backgroundColor: onWholeScreen && 'var(--neutral-background-color)'
                                                        }}>
            <DefaultComps />

            <div className='changing-component' style={{
                width: (!expandBar && !onWholeScreen) ? '96%' : (onWholeScreen) ? '100%' : '81%', 
                height: (onWholeScreen ) && '100%', 
                marginTop: (onWholeScreen) && '0',
                marginLeft: expandBar ? '273px': (onWholeScreen && isAdaptableScreen) ? '55px' : !isAdaptableScreen ? '0px' : '60px',
                display: (onWholeScreen && isAdaptableScreen) && 'block',
                }}>
                {children}
            </div>
        </main>
    )
}

export default MainDiv;