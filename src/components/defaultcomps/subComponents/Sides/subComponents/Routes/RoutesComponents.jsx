import { NavLink } from "react-router-dom";
import propTypes from "prop-types";


function RoutesComponents({ icon, route, page, clickfunction }){
    const activeStyles = {
        color: 'var(--primary-background-color)', 
        backgroundColor: 'var(--active-background-color)',
        textDecoration: 'none',
        display: 'flex',
        fontSize: 'var(--tertiary-font-size)',
        marginLeft: '10%',
        gap: '12px',
        padding: '8px 12px',
        marginBottom: '12px',
        width: '80%',
        fontFamily: 'var(--primary-font-family)',
        fontWeight: '400',
        borderRadius: '8px'
    };
    
    const inactiveStyles = {
        textDecoration: 'none',
        display: 'flex',
        fontSize: 'var(--tertiary-font-size)',
        marginLeft: '10%',
        gap: '12px',
        padding: '8px 12px',
        marginBottom: '12px',
        width: '80%',
        color: 'var( --quaternary-font-color)',
        fontFamily: 'var(--primary-font-family)',
        fontWeight: '400'
    };
    
    return (
            <NavLink 
                className='tasks-page-route'
                to={ route }
                style={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}

            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={icon} alt='route-icon' />
                </div>
              
                    <input type='submit' value={page} onClick={ clickfunction } className='tasks-page-route-name' />  
            </NavLink>

        
    )
};

RoutesComponents.propTypes = {
    icon: propTypes.string.isRequired,
    route: propTypes.string.isRequired,
    page: propTypes.string.isRequired
}

export default RoutesComponents;