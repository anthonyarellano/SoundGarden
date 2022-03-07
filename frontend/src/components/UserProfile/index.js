import { useParams } from "react-router-dom";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import PageNotFound from "../404Page";
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../../store/songs';
import { useSong } from "../../Context/SongContext";

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const { userId } = useParams();
    const dispatch = useDispatch();
    const songsList = useSelector((state) => Object.values(state.songs));
    const { currentSong, setCurrentSong } = useSong();

    useEffect(() => {
       const retrive = async () => {
            const user = getUser(userId);
            const userInfo = await user();
            setCurrentUser(userInfo)
        };
        retrive();
    }, [userId]);

    useEffect(() => {
        dispatch(getSongs(userId));
    }, [dispatch]);

    return (
        <>
            {currentUser &&
            <h1>Welcome to user {currentUser.user.username}'s profile, </h1>}
             {songsList?.map((song)=> (
                <div>
                    <p>{song?.title}</p>
                    <img src={song?.imgUrl}></img>
                    <button
                        onClick={() => setCurrentSong([song.title, song.url])}>Play</button>
                </div>
             ))};
            {!currentUser &&
            <PageNotFound />}
        </>
    )
};

export default UserProfile;
