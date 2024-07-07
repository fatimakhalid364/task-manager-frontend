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
            <img className='profile-img' />
            <div className='profile-name'>
                {formatUserName()}
            </div>
            <div className='dropdown'>
                <img src={drop} alt='drop-icon' />
            </div>
        </div>
    )
}

export default ProfileSection;