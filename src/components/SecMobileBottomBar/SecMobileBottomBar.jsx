import 'src/components/SecMobileBottomBar/SecMobileBottomBar.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchGlass from 'src/components/icons/SearchGlass'

const SecMobileBottomBar = ({ handleBurgerMenuClick, handleShowSearchBarClick, BellIcon  }) => {
    
    return (
       
            
            <div className="sec-mobile-bottom-bar">
                
                <MenuOutlinedIcon sx={{marginLeft: '10px', color: 'var(--primary-background-color)'}} onClick={ handleBurgerMenuClick} />
                    
               
               
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>   
                    <BellIcon color='var(--primary-background-color)'/>
                
                    <div onClick={handleShowSearchBarClick} style={{  cursor: 'pointer', marginTop: '1px', marginRight: '13px'}}>
                        <SearchGlass color='var(--primary-background-color)'/>
                    </div>
                </div> 
               
                 
               
            
            </div>
           
           
       
    )
}

export { SecMobileBottomBar };