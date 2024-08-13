import PropTypes from 'prop-types';

const TagIcon = ({ color }) => (
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='tag'>
<path d="M6.00034 1H2.71296C1.76692 1 1 1.76692 1 2.71296V6.00033C1 6.45464 1.18047 6.89034 1.50171 7.21158L8.79597 14.5058C9.32787 15.0377 10.1509 15.1694 10.7803 14.7574C12.3642 13.7204 13.7204 12.3642 14.7574 10.7803C15.1694 10.1509 15.0377 9.32786 14.5058 8.79596L7.21158 1.50171C6.89034 1.18047 6.45464 1 6.00034 1Z" 
    stroke={ color }
    stroke-linecap="round" 
    stroke-linejoin="round"
    className='tag-path'/>
<path d="M3.28395 3.28395H3.28966V3.28966H3.28395V3.28395Z" 
    stroke={ color } 
    stroke-linecap="round" 
    stroke-linejoin="round"
    className='tag-path'/>
</svg>

);

TagIcon.propTypes = {
    color: PropTypes.string,
};

export default TagIcon;
