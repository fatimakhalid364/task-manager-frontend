import PropTypes from 'prop-types';

const EyeIcon = ({ color }) => (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.8291 8C12.8291 9.65685 11.5623 11 9.99958 11C8.43687 11 7.17004 9.65685 7.17004 8C7.17004 6.34315 8.43687 5 9.99958 5C11.5623 5 12.8291 6.34315 12.8291 8Z" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 7.99997C2.20187 3.94288 5.77678 1 9.99999 1C14.2232 1 17.7982 3.94291 19 8.00004C17.7981 12.0571 14.2232 15 10 15C5.77678 15 2.20185 12.0571 1 7.99997Z" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

EyeIcon.propTypes = {
    color: PropTypes.string,
};

export default EyeIcon;