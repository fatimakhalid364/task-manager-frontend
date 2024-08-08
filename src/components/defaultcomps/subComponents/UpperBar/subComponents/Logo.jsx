import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function Logo() {
    return (
        <div className='page-logo-div'>
            <MenuOutlinedIcon sx={{fontSize: '20px', color: 'var(--quinary-font-color)', cursor: 'pointer' }} />
        </div>
    )
}
export default Logo;