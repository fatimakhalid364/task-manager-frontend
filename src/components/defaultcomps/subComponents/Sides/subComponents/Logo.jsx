import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function Logo() {
    return (
        <div className='tasks-page-logo-div'>
            <MenuOutlinedIcon sx={{fontSize: '2rem', color: 'var(--quinary-font-color)', marginLeft: '1.46rem', marginTop: '2.1rem', cursor: 'pointer' }} />
        </div>
    )
}
export default Logo;