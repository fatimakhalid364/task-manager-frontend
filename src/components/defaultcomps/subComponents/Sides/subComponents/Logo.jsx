import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function Logo() {
    return (
        <div className='tasks-page-logo-div'>
            <MenuOutlinedIcon sx={{fontSize: '20px', color: 'var(--quinary-font-color)', marginLeft: '14.6px', marginTop: '21px', cursor: 'pointer' }} />
        </div>
    )
}
export default Logo;