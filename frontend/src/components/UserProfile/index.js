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
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        const retrive = async () => {
            const user = getUser(userId);
            const userInfo = await user();
            setCurrentUser(userInfo)
        };
        retrive();
        dispatch(getSongs(userId));
    }, [userId]);

    if (!sessionUser) {
        return <Redirect to="/login" />
    }

    return (
        <>
        <div>
            <div className="user-profile-container">
                <ProfileBanner userProfile={currentUser}/>
                <ProfileNav userId={userId} sessionUser={sessionUser}/>
                    {!currentUser &&
                        <PageNotFound />}
            </div>
            <SpinningRing />
        </div>
        </>

    )
};

export default UserProfile;
