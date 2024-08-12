import propTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { useResponsive } from 'src/constants/media_queries';

function RoutesComponents({ icon: IconComponent, route, currentPage, clickfunction, burgerMenuClicked = { burgerMenuClicked }, page }) {
    const location = useLocation();
    const pathname = location.pathname.split('/').pop().toUpperCase();
    const {
        isAdaptableScreen,
        expandBar,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    const activeStyles = {
        color: 'var(--primary-background-color)', 
        backgroundColor: 'var(--active-background-color)',
        textDecoration: 'none',
        display: 'flex',
        fontSize: 'var(--tertiary-font-size)',
        marginLeft: (!expandBar || !burgerMenuClicked) ? '0' : '9%' ,
        gap: '12px',
        padding: '8px 12px',
        paddingRight: (!expandBar || !burgerMenuClicked) && '40px',
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
        marginLeft: (!expandBar || !burgerMenuClicked) ? '0' : '9%' ,
        gap: '12px',
        padding: '8px 12px',
        paddingRight: (!expandBar || !burgerMenuClicked) && '40px',
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
                { (expandBar && burgerMenuClicked) ? (<div style={{display: 'flex', alignItems: 'center', gap: '9px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <IconComponent color={currentPage == pathname ? '#3B8AFF' : '#6B7280'} />
                </div>
                <div  onClick={ clickfunction }  className='tasks-page-route-name'>{page}</div>
                </div>) : (<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <IconComponent color={currentPage == pathname ? '#3B8AFF' : '#6B7280'} />

                </div>) } 
            </NavLink>

        
    )
}

RoutesComponents.propTypes = {
    icon: propTypes.string.isRequired,
    route: propTypes.string.isRequired,
    page: propTypes.string.isRequired
}

export default RoutesComponents;