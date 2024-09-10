import 'src/components/MobileBottomBar/MobileBottomBar.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchGlass from 'src/components/icons/SearchGlass'

const MobileBottomBar = ({ handleBurgerMenuClick, handleShowSearchBarClick, BellIcon  }) => {
    
    return (
       
            
            <div className="mobile-bottom-bar">
                <div className="box-1">
                    <MenuOutlinedIcon sx={{marginLeft: '10px', color: 'var(--primary-background-color)'}} onClick={ handleBurgerMenuClick} />
                    <div className="item2"></div>
                    <div className="item3"></div>
                </div>
                <div className="box-2">
               
                    
                    <BellIcon color='var(--primary-background-color)'/>
               
                <div onClick={handleShowSearchBarClick} style={{  cursor: 'pointer', marginTop: '2px'}}>
                    <SearchGlass color='var(--primary-background-color)'/>
                </div>
               
                    <div className="item-a3"></div>
                </div>
            
            </div>
           
           
       
    )
}

export { MobileBottomBar };