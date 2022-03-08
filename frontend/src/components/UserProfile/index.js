import { useParams } from "react-router-dom";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import PageNotFound from "../404Page";
import { useDispatch } from 'react-redux';
import { getSongs } from '../../store/songs';
import './style/userprofile.css';
import ProfileBanner from "./ProfileBanner";
import SongContainer from "./SongContainer";

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const { userId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const retrive = async () => {
            const user = getUser(userId);
            const userInfo = await user();
            setCurrentUser(userInfo)
        };
        retrive();
        dispatch(getSongs(userId));
    }, [userId]);

    return (
        <div className="user-profile-container">
        <ProfileBanner userProfile={currentUser}/>
        <SongContainer />
            {!currentUser &&
                <PageNotFound />}
        </div>
    )
};

export default UserProfile;
