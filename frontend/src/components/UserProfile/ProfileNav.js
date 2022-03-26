import './style/userprofile.css';
import { useState, useEffect } from 'react';
import SongContainer from './SongContainer';
import PlaylistContainer from './PlaylistContainer';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../../store/playlists';
import { UploadPage } from '../UploadPage';
import DiscoverPage from '../DiscoverPage';
import SongPage from '../SongPage';

const ProfileNav = ({userId, sessionUser, setStyle}) => {
    const [allActive, setAllActive] = useState('all');
    const [visible, setVisible] = useState(false);
    const [newPlaylistTitle, setNewPlaylistTitle] = useState(null);
    const [errors, setErrors] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
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
            setNewPlaylistTitle("");
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
                onClick={() => {
                    setAllActive("all")
                    setStyle('profile-banner-container')}}
                >My Music</div>
            <div
                className={allActive === "upload" ? 'profile-nav-button selected' : 'profile-nav-button'}
                onClick={() => {
                    setAllActive("upload")
                    setStyle('profile-banner-container')}}
                >Upload</div>
            <div
                className={allActive === "discover" ? 'profile-nav-button selected' : 'profile-nav-button'}
                onClick={() => {
                    setAllActive("discover")
                    setStyle('profile-banner-transition')}}>
                Discover
            </div>
            <div
                className={allActive === "song" ? 'profile-nav-button selected' : 'hidden'}
                onClick={() => {
                    setAllActive("song")
                    setStyle('profile-banner-container')}}
                >
                Song
            </div>
            <div
                className={allActive === "playlist" ? 'profile-nav-button selected playlist' : 'profile-nav-button'}
                onClick={() => {
                    setAllActive("playlist")
                    setStyle('profile-banner-container')}}
                >Playlists</div>
            <div
                onClick={() => setVisible(!visible)}
                style={{cursor: "pointer"}}> + </div>
            <div className={visible ? "playlist-entry" : "hidden"}>
                <input
                    type="text"
                    className='new-playlist-input'
                    placeholder="New Playlist Name"
                    value={newPlaylistTitle}
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
            <div
                className={allActive === "all" ? 'profile-nav-button selected' : 'profile-nav-button'}
                onClick={() => {
                    setAllActive("all")
                    setStyle('profile-banner-container')}}
            >
                All Music
            </div>
            <div
                onClick={() => {
                    setAllActive('backToDiscover')
                    setStyle('profile-banner-transition')
                }}
                className={allActive === "backToDiscover" ? 'profile-nav-button selected' : 'profile-nav-button'}
            >
                Back to Discover
            </div>
            <div
                className={allActive === "song" ? 'profile-nav-button selected' : 'hidden'}
                onClick={() => {
                    setAllActive("song")
                    setStyle('profile-banner-container')}}
                >
                Song
            </div>
            <div
                className={allActive === "playlist" ? 'profile-nav-button selected playlist' : 'profile-nav-button'}
                onClick={() => {
                    setAllActive("playlist")
                    setStyle('profile-banner-container')}}
                >Playlists</div>
            <div
                onClick={() => setVisible(!visible)}
                style={{cursor: "pointer"}}> + </div>
            <div className={visible ? "playlist-entry" : "hidden"}>
                <input
                    type="text"
                    className='new-playlist-input'
                    placeholder="New Playlist Name"
                    value={newPlaylistTitle}
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
    }

    return(
        <>
            <div className="profile-nav-wrapper">
                {links}
            </div>
            {allActive === "all" ?
                <SongContainer
                    setAllActive={setAllActive}
                    setSelectedSong={setSelectedSong}/> : allActive === "playlist" ?
                <PlaylistContainer sessionUser={sessionUser}/> :
                allActive === "upload" ?
                <UploadPage setAllActive={setAllActive}/> :
                allActive === "discover" ?
                <DiscoverPage setAllActive={setAllActive} setStyle={setStyle}/> :
                allActive === "backToDiscover" ?
                <DiscoverPage setAllActive={setAllActive} setStyle={setStyle}/> :
                allActive === "song" ?
                <SongPage selectedSong={selectedSong}/> :
                null
            }
        </>
    )
};

export default ProfileNav;
