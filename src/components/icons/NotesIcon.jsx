import PropTypes from 'prop-types';

const NotesIcon = ({ color, marginLeft = -1, marginRight = 0 }) => {
    return (
        <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft, marginRight }}>
            <path d="M14.1667 1.6665V3.33317M9.99999 1.6665V3.33317M5.83333 1.6665V3.33317" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.91667 13.3333V7.5C2.91667 5.14298 2.91667 3.96447 3.64891 3.23223C4.38114 2.5 5.55965 2.5 7.91667 2.5H12.0833C14.4403 2.5 15.6188 2.5 16.3511 3.23223C17.0833 3.96447 17.0833 5.14298 17.0833 7.5V10C17.0833 13.9283 17.0833 15.8926 15.8629 17.1129C14.6426 18.3333 12.6783 18.3333 8.75001 18.3333H7.91667C5.55965 18.3333 4.38114 18.3333 3.64891 17.6011C2.91667 16.8688 2.91667 15.6903 2.91667 13.3333Z" stroke={color} />
            <path d="M6.66667 12.5002H10M6.66667 8.3335H13.3333" stroke={color} strokeLinecap="round" />
            <path d="M17.0833 12.0835C17.0833 13.2341 16.1506 14.1668 15 14.1668C14.5839 14.1668 14.0933 14.0939 13.6887 14.2023C13.3292 14.2987 13.0485 14.5794 12.9522 14.9389C12.8437 15.3435 12.9167 15.8341 12.9167 16.2502C12.9167 17.4007 11.9839 18.3335 10.8333 18.3335" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

NotesIcon.propTypes = {
    color: PropTypes.string,
};

NotesIcon.defaultProps = {
    color: '#6B7280',
};

export default NotesIcon;
