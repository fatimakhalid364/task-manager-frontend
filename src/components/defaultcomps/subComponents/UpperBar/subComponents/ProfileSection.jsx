import { useSelector } from 'react-redux';
import drop from 'src/assets/drop.svg';

function ProfileSection() {
    const user = useSelector(state => state.auth?.user);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
        <div className='profile-div'>
            <div className='profile-img'>
                <img />
            </div>
            <div className='profile-details'>
                <div className='profile-name'>
                    {formatUserName()}
                    <img src={drop} alt='drop-icon' className='dropdown' />
                </div>
                <div className='profile-email'>
                    {user?.email}
                </div>
            </div>
            
        </div>
    )
}

export default ProfileSection;