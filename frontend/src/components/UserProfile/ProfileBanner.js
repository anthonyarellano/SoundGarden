import './style/userprofile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'
import { addNewPic } from '../../store/session';
import { useEffect } from 'react'

const ProfileBanner = ({userProfile}) => {
    let user;
    if (userProfile) {
        user = userProfile.user
    };
    const sessionUser = useSelector((state) => state.session.user);

    let proEdit;
    if (sessionUser?.id === user?.id) {
        proEdit = true;
    }
    let bannerEdit;
    if (sessionUser?.id === user?.id) {
        bannerEdit = true;
    }
    const [profilePicToggle, setProfilePicToggle] = useState(false);
    const [bannerPicToggle, setBannerPicToggle] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [newbanner, setnewBanner] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();


    // if (user?.imgUrl === null && sessionUser?.id === user?.id) {
    //     proEdit = true;
    // }
    // let bannerEdit;
    // if (user?.bannerUrl === null & sessionUser?.id === user?.id) {
    //     bannerEdit = true;
    // }

    console.log(user);
    const handleNewProPic = () => {
        const newPic = {
            userId: sessionUser.id,
            imgUrl
        };
        dispatch(addNewPic(newPic))
    };

    const handleNewBanner = () => {
        const newBanner = {
            userId: sessionUser.id,
            bannerUrl
        };
        dispatch(addNewPic(newBanner))
        setnewBanner(bannerUrl)
    }

    return (
        <div className='profile-banner-container'>
            <div className='profile-banner-img'>
                {user &&
                <>
                    <div className='user-profile-prompts'>
                        <div
                            className={proEdit ? 'add-profile-pic' : "hidden"}
                            onClick={() => setProfilePicToggle(!profilePicToggle)}>
                                Edit Profile Picture
                        </div>
                        <input
                            type='text'
                            onChange={(e) => setImgUrl(e.target.value)}
                            className={profilePicToggle ? "profile-picture-input" : "hidden"}/>
                        <div
                            className={profilePicToggle ? "profile-picture-input" : "hidden"}
                            onClick={handleNewProPic}>Submit</div>
                        <div
                            className={bannerEdit ? 'add-profile-pic' : "hidden"}
                            onClick={() => setBannerPicToggle(!bannerPicToggle)}>
                                Edit Banner Image
                        </div>
                        <input
                            type='text'
                            onChange={(e) => setBannerUrl(e.target.value)}
                            className={bannerPicToggle ? "profile-picture-input" : "hidden"}/>
                        <div
                            className={bannerPicToggle ? "profile-picture-input" : "hidden"}
                            onClick={handleNewBanner}>Submit</div>
                    </div>
                    <img
                        className='profile-banner-img-file'
                        src={newbanner ? newbanner : user?.bannerUrl}></img>
                    <div>
                        <img
                            src={user.imgUrl}
                            className='profile-profile-pic'></img>
                            <p className='profile-banner-name'>
                                {user.username}
                            </p>
                    </div>
                </>
                }
            </div>
        </div>
    )
};


export default ProfileBanner;
