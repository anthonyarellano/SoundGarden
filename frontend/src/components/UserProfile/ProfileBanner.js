import './style/userprofile.css';

const ProfileBanner = ({userProfile}) => {
    let user;
    if (userProfile) {
        user = userProfile.user
        console.log(user);
    };

    return (
        <div className='profile-banner-container'>
            <div className='profile-banner-img'>
                {user &&
                <>
                    <img
                        className='profile-banner-img-file'
                        src={user.bannerUrl}></img>
                    <div>
                        <img
                            src={user.imgUrl}
                            className='profile-profile-pic'></img>
                            <p className='profile-banner-name'>{user.username}</p>
                    </div>
                </>
                }
            </div>
        </div>
    )
};


export default ProfileBanner;
