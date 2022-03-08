import { useDispatch, useSelector } from 'react-redux';

const ProfileBanner = ({userProfile}) => {
    let user;
    if (userProfile) {
        user = userProfile.user
        console.log(user);
    };

    return (
        <div className='profile-banner-container'>
            {user &&
            <img src={user.bannerUrl}></img>}
        </div>
    )
};


export default ProfileBanner;
