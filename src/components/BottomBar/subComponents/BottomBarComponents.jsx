import { NavLink, useLocation } from "react-router-dom";
import "src/components/BottomBar/BottomBar.css";
import { useSelector } from "react-redux";

const BottomBarComponents = ({ route, icon: IconComponent, currentPage }) => {
    const location = useLocation();
    const pathname = location.pathname.split('/').pop().toUpperCase();
    // const pathname = 'NOTES'
    const accentColor = useSelector((state) => state.appearance.color);
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
                   <IconComponent  color={currentPage == pathname ?  'var(--primary-background-color)' : 'var(--quaternary-font-color)'} />
            </div>
        </NavLink>
    )
}

export default BottomBarComponents;