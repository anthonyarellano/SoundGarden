import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import PageNotFound from "../404Page";

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
       const retrive = async () => {
            const user = getUser(userId);
            const userInfo = await user();
            setCurrentUser(userInfo)
        };
        retrive();
    }, []);

    return (
        <>
            {currentUser &&
            <h1>Welcome to user {currentUser.user.username}'s profile, </h1>
            }
            {!currentUser &&
            <PageNotFound />}
        </>
    )
};

export default UserProfile;
