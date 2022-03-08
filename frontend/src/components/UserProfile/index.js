import { useParams } from "react-router-dom";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import PageNotFound from "../404Page";
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../../store/songs';
import { useSong } from "../../Context/SongContext";
import './style/userprofile.css';
import { putSong, deleteSong } from "../../store/songs";
import ProfileBanner from "./ProfileBanner";

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const { userId } = useParams();
    const dispatch = useDispatch();
    const songsList = useSelector((state) => Object.values(state.songs));
    const sessionUser = useSelector((state) => state.session.user);
    const { setCurrentSong } = useSong();
    const [showEdit, setShowEdit] = useState(false);
    const [editSong, setEditSong] = useState(null);
    const [newTitle, setNewTitle] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errors = [];
        if (!newTitle) errors.push('Please provide a value for new Title.')
        if (newTitle) {
            if (newTitle.length > 100) errors.push('Please provide a Title less than 100 characters.');
        };
        setErrors(errors);
    }, [newTitle]);

    useEffect(() => {
        const retrive = async () => {
            const user = getUser(userId);
            const userInfo = await user();
            setCurrentUser(userInfo)
        };
        retrive();
        dispatch(getSongs(userId));
    }, [userId]);

    useEffect(() => {
        dispatch(getSongs(userId));
    }, []);

    const handleEdit = (song) => {
        if (errors.length) {
            return alert('Provide new Title less than 100 characters long.')
        };
        const { userId, url, imgUrl, id } = song;
        const newSong = {
            id,
            userId,
            title: newTitle,
            url,
            imgUrl
        };
        console.log(newSong);
        dispatch(putSong(newSong));
        setShowEdit(false);
        setNewTitle(null);
    };

    const handleDelete = (songId) => {
        if (songId) {
            dispatch(deleteSong(songId));
            return;
        }
    }

    return (
        <div className="user-profile-container">
        <ProfileBanner userProfile={currentUser}/>
            {currentUser &&
                <h1>Welcome to {currentUser.user.username}'s profile, </h1>}
            <div className="song-list-container">
                {songsList?.map((song) => (
                    <div>
                        <div>
                            <p>{song?.title}</p>
                            <img className="album-artwork" src={song?.imgUrl}></img>
                            <button
                                onClick={() => setCurrentSong([song.title, song.url])}
                            >
                                Play
                            </button>
                        </div>
                        {song?.userId === sessionUser?.id && (
                            <div>
                                <button id={song?.id}
                                    onClick={() => {
                                        setShowEdit(!showEdit)
                                        setEditSong(song?.id)
                                        setNewTitle(song?.title)
                                    }}>Edit</button>
                                {showEdit && editSong === song?.id &&
                                    <div>
                                        <input
                                            type="text"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)} />
                                        <button onClick={(e) => handleEdit(song)}>Submit</button>
                                    </div>
                                }
                                <button
                                    id={song?.id}
                                    onClick={(e) => handleDelete(e.target.id)}>Delete</button>
                            </div>)
                        }
                    </div>
                ))}
            </div>
            {!currentUser &&
                <PageNotFound />}
        </div>
    )
};

export default UserProfile;
