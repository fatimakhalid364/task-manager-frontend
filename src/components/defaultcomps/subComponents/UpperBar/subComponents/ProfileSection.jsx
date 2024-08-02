import { useSelector } from 'react-redux';
import drop from 'src/assets/drop.svg';
import { useMediaQuery } from 'react-responsive';
import { useResponsive } from 'src/constants/media_queries';




function ProfileSection() {
    const user = useSelector(state => state.auth?.user);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const {
        isBp2,
        isBp3,
        isBp4,
        isBp5,
        isBp7,
        isAdaptableScreen,
        isBp6,
        isBp8,
        isSmallScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();




    const formatUserName = () => {
        if (user) {
            let fullName = `${user?.firstName} ${user?.lastName}`;

            fullName = fullName.split(' ').map(name => capitalizeFirstLetter(name)).join(' ');

            if (fullName.length > 12) {
                fullName = fullName.slice(0, 12) + '...';
            }

            return fullName;
        }
        return '';
    }

    return (
        <div>
        { isAdaptableScreen ? (<div className='profile-div'>

            <div className='profile-img'>
                <img />
            </div>
            <div className='profile-details'>
               <div className='profile-name' style={{
                width: isBp2 ? '96px' : 
                isBp3 ? '93px' : 
                isBp4 ? '90px' :
                isBp5 || isBp6 || isBp7 || isBp8 ? '83px' :
                '110.4px' }}>
               
                    { formatUserName()}
                
                    <img src={drop} alt='drop-icon' className='dropdown' />
                </div>
                <div className='profile-email' style={{
                    width: isBp2 ? '98px'  : 
                    isBp3 ? '96px': 
                    isBp4 ? '92px' :
                    isBp5 || isBp6 || isBp7 || isBp8 ? '85px' :
                    '112px'}}>
                    { user?.email}
                </div>
            </div>
           
        </div>) : (<div className='profile-img' style={{marginLeft: '30px', width: !isAdaptableScreen && '30px', height: !isAdaptableScreen && '30px' }}>
                <img />
            </div>)}
        </div>
    )
}

export default ProfileSection;