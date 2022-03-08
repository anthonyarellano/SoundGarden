import './style/userprofile.css';

const ProfileNav = ({userId, sessionUser}) => {
    console.log(sessionUser.id, userId);
    let links;
    if (parseInt(userId) === sessionUser.id) {
        links = (
        <>
            <div className='profile-nav-button'>All Music</div>
            <div className='profile-nav-button'>Playlists</div>
        </>
        )
    } else {
        links = (
        <>
            <div className='profile-nav-button'>All Music</div>
        </>
        )
    }
    return(
        <div className="profile-nav-wrapper">
            {links}
        </div>
    )
};

export default ProfileNav;
