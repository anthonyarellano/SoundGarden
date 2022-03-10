import './style/userprofile.css';
import { useState, useEffect } from 'react';
import SongContainer from './SongContainer';
import PlaylistContainer from './PlaylistContainer';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../../store/playlists';
import { UploadPage } from '../UploadPage';

const ProfileNav = ({userId, sessionUser}) => {
    const [allActive, setAllActive] = useState('all');
    const [visible, setVisible] = useState(false);
    const [newPlaylistTitle, setNewPlaylistTitle] = useState(null);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        const errors = [];
        if (!newPlaylistTitle) {
            errors.push('Please enter a value for New Playlist Title.')
        };
        setErrors(errors);
    }, [newPlaylistTitle])

    const handleSubmit = () => {
        if (!errors.length) {
            const playlist = {
                title: newPlaylistTitle,
                userId: sessionUser.id
            };
            dispatch(createPlaylist(playlist));
            setErrors([]);
            setNewPlaylistTitle(null);
            return;
        }
        return alert(errors)
    };

    let links;
    if (parseInt(userId) === sessionUser.id) {
        links = (
        <>
            <div
                className={allActive === "all" ? 'profile-nav-button selected' : 'profile-nav-button'}
                onClick={() => setAllActive("all")}>All Music</div>
            <div
                className={allActive === "upload" ? 'profile-nav-button selected' : 'profile-nav-button'}
                onClick={() => setAllActive("upload")}
                >Upload</div>
            <div
                className={allActive === "playlist" ? 'profile-nav-button selected' : 'profile-nav-button'}
                onClick={() => setAllActive("playlist")}>Playlists</div>
            <div
                onClick={() => setVisible(!visible)}
                style={{cursor: "pointer"}}> + </div>
            <div className={visible ? "playlist-entry" : "hidden"}>
                <input
                    type="text"
                    className='new-playlist-input'
                    placeholder="New Playlist Name"
                    onChange={(e) => setNewPlaylistTitle(e.target.value)}>
                </input>
                <div
                    className='playlist-create-button'
                    onClick={handleSubmit}
                >
                    create
                </div>
            </div>
        </>
        )
    } else {
        links = (
        <>
            <div className='profile-nav-button'>All Music</div>
        </>
        )
    }

    return(
        <>
            <div className="profile-nav-wrapper">
                {links}
            </div>
            {allActive === "all" ?
                <SongContainer /> : allActive === "playlist" ?
                <PlaylistContainer sessionUser={sessionUser}/> :
                allActive === "upload" ?
                <UploadPage setAllActive={setAllActive}/> : null
            }
        </>
    )
};

export default ProfileNav;
