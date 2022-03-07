import { useParams } from "react-router-dom";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import PageNotFound from "../404Page";
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../../store/songs';
import { useSong } from "../../Context/SongContext";
import './style/userprofile.css';

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const { userId } = useParams();
    const dispatch = useDispatch();
    const songsList = useSelector((state) => Object.values(state.songs));
    const { currentSong, setCurrentSong } = useSong();
    const sessionUser = useSelector((state) => state.session.user);

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
            <h1>Welcome to {currentUser.user.username}'s profile, </h1>}
            <div className="song-list-container">
             {songsList?.map((song)=> (
                 <div>
                    <p>{song?.title}</p>
                    <img className="album-artwork" src={song?.imgUrl}></img>
                    <button
                        onClick={() => setCurrentSong([song.title, song.url])}
                    >
                        Play
                    </button>
                    {song?.userId === sessionUser?.id && (
                        <div>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>)
                    }
                </div>
             ))};
             </div>
            {!currentUser &&
            <PageNotFound />}
        </>
    )
};

export default UserProfile;
