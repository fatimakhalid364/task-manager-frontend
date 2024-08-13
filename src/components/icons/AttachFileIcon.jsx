import PropTypes from 'prop-types';

const AttachFileIcon = ({ color }) => (
<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='attach-file'>
<path d="M11.6165 8.53055L6.30444 14.0537C5.09098 15.3154 3.12356 15.3154 1.9101 14.0537C0.696634 12.792 0.696634 10.7464 1.9101 9.48473L9.46371 1.63085C10.2727 0.789717 11.5843 0.789718 12.3933 1.63085C13.2022 2.47198 13.2022 3.83572 12.3933 4.67685L4.83339 12.5372M4.83966 12.5307C4.83758 12.5329 4.83549 12.535 4.83339 12.5372M8.76806 5.40006L3.37488 11.0077C2.97039 11.4283 2.97039 12.1102 3.37488 12.5307C3.77729 12.9491 4.42843 12.9513 4.83339 12.5372" 
    stroke= {color} 
    stroke-linecap="round" 
    stroke-linejoin="round"
    className='attach-file-path'/>
</svg>

);

AttachFileIcon.propTypes = {
    color: PropTypes.string,
};

export default AttachFileIcon;
