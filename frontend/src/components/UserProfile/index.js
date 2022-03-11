import { useParams } from "react-router-dom";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import PageNotFound from "../404Page";
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../../store/songs';
import './style/userprofile.css';
import ProfileBanner from "./ProfileBanner";
import ProfileNav from "./ProfileNav";
import { Redirect } from "react-router-dom";
import SpinningRing from "./SpinningRing";

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [style, setStyle] = useState('profile-banner-container');
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    let user;
    useEffect(() => {
        const retrive = async () => {
            user = getUser(userId);
            const userInfo = await user();
            setCurrentUser(userInfo)
        };
        retrive();
        dispatch(getSongs(userId));
    }, [userId, user]);

    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <>
        <div>
            <div className="user-profile-container">
                <ProfileBanner
                    userProfile={currentUser}
                    setStyle={setStyle}
                    style={style}/>
                <ProfileNav userId={userId} sessionUser={sessionUser} setStyle={setStyle}/>
                    {!currentUser &&
                        <PageNotFound />}
            </div>
            <SpinningRing />
            <SpinningRing identifier={"2"}/>
        </div>
        </>

    )
};

export default UserProfile;
