import './style/userprofile.css';
import { useState, useEffect } from 'react';
import SongContainer from './SongContainer';
import PlaylistContainer from './PlaylistContainer';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../../store/playlists';

const ProfileNav = ({userId, sessionUser}) => {
    const [allActive, setAllActive] = useState(true);
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
                className={allActive ? 'profile-nav-button selected' : 'profile-nav-button'}
                onClick={() => setAllActive(!allActive)}>All Music</div>
            <div
                className={!allActive ? 'profile-nav-button selected' : 'profile-nav-button'}
                onClick={() => setAllActive(!allActive)}>Playlists</div>
            <div
                onClick={() => setVisible(!visible)}> + </div>
            <div className={visible ? "playlist-entry" : "hidden"}>
                <input
                    type="text"
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
            {allActive ?
                <SongContainer /> :
                <PlaylistContainer sessionUser={sessionUser}/>
            }
        </>
    )
};

export default ProfileNav;
