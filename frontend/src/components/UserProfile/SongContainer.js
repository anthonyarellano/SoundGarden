import { useParams } from "react-router-dom";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSongs } from '../../store/songs';
import SongButtons from './SongButtons';
import CommentContainer from "./CommentContainer";

import './style/userprofile.css';

const SongContainer = ({playlistSongs, setAllActive, setSelectedSong, selectedSong, comments}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const { userId } = useParams();
    const dispatch = useDispatch();
    let songsList = useSelector((state) => Object.values(state.songs));
    const [visible, setVisible] = useState(false);
    const [hoveredSong, setHoveredSong] = useState(null);

    if (playlistSongs) {
        songsList = playlistSongs;
    }

    let bypass;
    if (selectedSong) {
        songsList = [selectedSong];
        bypass = true;
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
                    <div
                        key={`${song?.id}`}>
                        <div
                            id={song?.id}
                            style={{margin: "0px 5px 0px 5px"}}
                            onMouseEnter={(e) => {
                                console.log('ENTER!')
                                setVisible(true);
                                setHoveredSong(e.target.id);
                            }}
                            onMouseLeave={(e) => {
                                console.log("EXIT!")
                                setVisible(false);
                                setHoveredSong(false);
                            }}>
                            <p>{song?.title}</p>
                            <div className="image-button-container">
                                <img
                                id={song?.id}
                                className="album-artwork"
                                src={song?.imgUrl}
                                onClick={() => {
                                    setAllActive('song')
                                    setSelectedSong(song)}}
                                ></img>
                                <SongButtons
                                    song={song}
                                    visible={visible}
                                    id={song?.id}
                                    hoveredSong={hoveredSong}
                                    currentUser={currentUser}
                                    bypass={bypass}
                                />
                            </div>
                        </div>
                        {comments &&
                        <CommentContainer />}
                    </div>
                ))}
            </div>
        </>
    )
};


export default SongContainer;
