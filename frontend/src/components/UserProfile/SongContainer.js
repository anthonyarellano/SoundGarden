import { useParams } from "react-router-dom";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../../store/songs';
import './style/userprofile.css';
import SongButtons from './SongButtons';

const SongContainer = ({playlistSongs}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const { userId } = useParams();
    const dispatch = useDispatch();
    let songsList = useSelector((state) => Object.values(state.songs));
    const [visible, setVisible] = useState(false);
    const [hoveredSong, setHoveredSong] = useState(null);

    if (playlistSongs) {
        songsList = playlistSongs;
    }

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


    return (
        <>
        <div className="song-list-container">
                {songsList?.map((song) => (
                    <div>
                        <div>
                            <p>{song?.title}</p>
                            <div className="image-button-container">
                                <img
                                id={song?.id}
                                className="album-artwork"
                                src={song?.imgUrl}
                                onMouseEnter={(e) => {
                                    setVisible(true)
                                    setHoveredSong(e.target.id)}}
                                ></img>
                                <SongButtons
                                    song={song}
                                    visible={visible}
                                    id={song?.id}
                                    hoveredSong={hoveredSong}
                                    currentUser={currentUser}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};


export default SongContainer;
