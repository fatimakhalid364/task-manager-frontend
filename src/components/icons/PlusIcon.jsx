import PropTypes from 'prop-types';

const PlusIcon = ({ color }) => (
<svg width="14" height="14" viewBox="0 0 14 14" fill={color} xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M7 0.125C7.34518 0.125 7.625 0.404822 7.625 0.75V6.375H13.25C13.5952 6.375 13.875 6.65482 13.875 7C13.875 7.34518 13.5952 7.625 13.25 7.625H7.625V13.25C7.625 13.5952 7.34518 13.875 7 13.875C6.65482 13.875 6.375 13.5952 6.375 13.25V7.625H0.75C0.404822 7.625 0.125 7.34518 0.125 7C0.125 6.65482 0.404822 6.375 0.75 6.375H6.375V0.75C6.375 0.404822 6.65482 0.125 7 0.125Z" fill={color}/>
</svg>

);

PlusIcon.propTypes = {
    color: PropTypes.string,
};

export default PlusIcon;
