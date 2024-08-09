import { NavLink } from "react-router-dom";
import "src/components/BottomBar/BottomBar.css";

const BottomBarComponents = ({ route, icon }) => {
    const activeStyles = {
        color: 'var(--primary-background-color)', 
        backgroundColor: 'var(--active-background-color)',
        textDecoration: 'none',
        display: 'flex',
        fontSize: 'var(--tertiary-font-size)',
        gap: '12px',
        padding: '8px 12px',
      
        width: '80%',
        fontFamily: 'var(--primary-font-family)',
        fontWeight: '400',
        borderRadius: '8px',
     
        alignItems: 'center'
    };
    
    const inactiveStyles = {
        textDecoration: 'none',
        display: 'flex',
        fontSize: 'var(--tertiary-font-size)',
        gap: '12px',
        padding: '8px 12px',
        width: '80%',
        color: 'var( --quaternary-font-color)',
        fontFamily: 'var(--primary-font-family)',
        fontWeight: '400',
        alignItems: 'center'
    };

    return (
        <NavLink 
                className='navigation-icon'
                
                to={ route }
                style={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}
            >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={icon} alt='route-icon' />
            </div>
        </NavLink>
    )
}

export default BottomBarComponents;