import PropTypes from 'prop-types';

const GearIcon = ({ color }) => (
    <svg
        width="25"
        height="25"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.99464 3.28338C8.06998 2.83132 8.46109 2.5 8.91938 2.5H11.081C11.5393 2.5 11.9304 2.83132 12.0058 3.28338L12.1837 4.35092C12.2356 4.66262 12.4439 4.92226 12.7204 5.0753C12.7822 5.10952 12.8433 5.14486 12.9037 5.18131C13.1746 5.34487 13.504 5.39572 13.8003 5.28471L14.8144 4.90481C15.2435 4.74404 15.726 4.91709 15.9552 5.31398L17.036 7.18601C17.2651 7.5829 17.1737 8.08728 16.8199 8.37855L15.983 9.06756C15.7392 9.26823 15.6184 9.5781 15.6242 9.89377C15.6249 9.9291 15.6252 9.96451 15.6252 10C15.6252 10.0355 15.6249 10.0709 15.6242 10.1062C15.6184 10.4219 15.7392 10.7318 15.983 10.9324L16.8199 11.6214C17.1737 11.9127 17.2651 12.4171 17.036 12.814L15.9552 14.686C15.726 15.0829 15.2435 15.256 14.8144 15.0952L13.8003 14.7153C13.504 14.6043 13.1746 14.6551 12.9037 14.8187C12.8433 14.8551 12.7822 14.8905 12.7204 14.9247C12.4439 15.0777 12.2356 15.3374 12.1837 15.6491L12.0058 16.7166C11.9304 17.1687 11.5393 17.5 11.081 17.5H8.91938C8.46109 17.5 8.06998 17.1687 7.99464 16.7166L7.81671 15.6491C7.76476 15.3374 7.55645 15.0777 7.27998 14.9247C7.21817 14.8905 7.15707 14.8551 7.09671 14.8187C6.82585 14.6551 6.4964 14.6043 6.2001 14.7153L5.18604 15.0952C4.75688 15.256 4.27439 15.0829 4.04525 14.686L2.96443 12.814C2.73529 12.4171 2.82666 11.9127 3.18048 11.6215L4.01744 10.9324C4.2612 10.7318 4.38203 10.4219 4.37618 10.1062C4.37553 10.0709 4.3752 10.0355 4.3752 10C4.3752 9.96452 4.37553 9.92911 4.37618 9.89379C4.38203 9.57811 4.2612 9.26824 4.01744 9.06758L3.18048 8.37856C2.82666 8.08729 2.73529 7.58291 2.96443 7.18602L4.04525 5.31399C4.27439 4.9171 4.75688 4.74405 5.18604 4.90483L6.20009 5.28472C6.49639 5.39573 6.82583 5.34487 7.0967 5.18132C7.15706 5.14487 7.21816 5.10952 7.27998 5.0753C7.55645 4.92226 7.76476 4.66262 7.81671 4.35092L7.99464 3.28338Z"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12.5 9.99993C12.5 11.3806 11.3807 12.4999 10 12.4999C8.61929 12.4999 7.50001 11.3806 7.50001 9.99993C7.50001 8.61922 8.61929 7.49993 10 7.49993C11.3807 7.49993 12.5 8.61922 12.5 9.99993Z"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

GearIcon.propTypes = {
    color: PropTypes.string,
};

export default GearIcon;