import './style/userprofile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'
import { addNewPic } from '../../store/session';
import { useEffect } from 'react'

const ProfileBanner = ({ userProfile, style, setStyle }) => {
    const sessionUser = useSelector((state) => state.session.user);

    let user;
    if (userProfile) {
        user = userProfile.user
    };

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
    const [newBanner, setNewBanner] = useState(null);
    const [newProfile, setNewProfile] = useState(null);
    const [editBannerToggle, setEditBannerToggle] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    // const style =
    //     "profile-banner-transition";


    // if (user?.imgUrl === null && sessionUser?.id === user?.id) {
    //     proEdit = true;
    // }
    // let bannerEdit;
    // if (user?.bannerUrl === null & sessionUser?.id === user?.id) {
    //     bannerEdit = true;
    // }


    const handleNewProPic = () => {
        const newPic = {
            userId: sessionUser.id,
            imgUrl
        };
        dispatch(addNewPic(newPic));
        setNewProfile(imgUrl);
    };

    const handleNewBanner = () => {
        const newBanner = {
            userId: sessionUser.id,
            bannerUrl
        };
        dispatch(addNewPic(newBanner));
        setNewBanner(bannerUrl);
    };

    return (
        <div
            className={style}
        >
            <div className='profile-banner-img'>
                {user &&
                    <>
                        <div className={editBannerToggle ? "user-profile-prompts" : "hidden"}>
                            <div
                                className={proEdit ? 'add-profile-pic' : "hidden"}
                                // onClick={() => setStyle('profile-banner-transition')}
                            >
                                Edit Profile Picture
                            </div>
                            <input
                                className={profilePicToggle ? "profile-picture-input" : "hidden"}
                                type='text'
                                placeholder={"Profile Picture Url"}
                                onChange={(e) => setImgUrl(e.target.value)}
                            />
                            <div
                                className={profilePicToggle ? "profile-picture-input" : "hidden"}
                                style={{ marginLeft: "20px" }}
                                id="profile-submit-button"
                                onClick={handleNewProPic}>Submit</div>
                            <div
                                className={bannerEdit ? 'add-profile-pic' : "hidden"}
                                onClick={() => setBannerPicToggle(!bannerPicToggle)}>
                                Edit Banner Image
                            </div>
                            <input
                                className={bannerPicToggle ? "profile-picture-input" : "hidden"}
                                type='text'
                                placeholder={"Banner Url"}
                                onChange={(e) => setBannerUrl(e.target.value)}
                            />
                            <div
                                className={bannerPicToggle ? "profile-picture-input" : "hidden"}
                                style={{ marginLeft: "20px" }}
                                id="profile-submit-button"
                                onClick={handleNewBanner}>Submit</div>
                        </div>
                        <div
                            onClick={() => setEditBannerToggle(!editBannerToggle)}
                            className={proEdit ? "profile-edit-button" : "hidden"}
                        >
                            <img
                                className='profile-edit-button'
                                src={require('./style/images/edit-button.png')}
                            />
                        </div>
                        <img
                            className='profile-banner-img-file'
                            src={newBanner ? newBanner : user?.bannerUrl}></img>
                        <div>
                            <img
                                className={style === "profile-banner-container" ? 'profile-profile-pic' : 'img-transition'}
                                src={newProfile ? newProfile : user?.imgUrl}
                            />
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
