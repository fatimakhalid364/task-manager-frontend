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
        isBiggerScreen,
        isBigScreen,
        isLessScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    

    console.log('isBiggerScreen:', isBiggerScreen);
    console.log('isBigScreen:', isBigScreen);
    console.log('isLessScreen:', isLessScreen);
    console.log('isSmallerScreen:', isSmallerScreen);
    console.log('isMobileScreen:', isMobileScreen);
    console.log('isMicroScreen:', isMicroScreen);


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
        <div className='profile-div' style={{marginLeft: isBigScreen ? '2%' : '3%' }}>
            <div className='profile-img'>
                <img />
            </div>
            { isBiggerScreen && (<div className='profile-details'>
               <div className='profile-name'>
               
                    { formatUserName()}
                
                    <img src={drop} alt='drop-icon' className='dropdown' />
                </div>
                <div className='profile-email'>
                    { user?.email}
                </div>
            </div>)
}
        </div>
    )
}

export default ProfileSection;