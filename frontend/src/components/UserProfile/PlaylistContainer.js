import { useEffect, useState } from 'react';
import { getPlaylists, deletePlaylist } from '../../store/playlists';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistCard from './PlaylistCard';
import './style/playlistcard.css'

const PlaylistContainer = ({sessionUser}) => {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => Object.values(state.playlists));
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        dispatch(getPlaylists(sessionUser.id))
    }, [dispatch])

    const handleDelete = (playlistId) => {
        if (playlistId) {
            dispatch(deletePlaylist(playlistId))
        }
    };
    let alteredPlaylist;
    if (playlists) {
        playlists.forEach((playlist) => {
            playlist.urls = [];
        })
        playlists.forEach((playlist, i) => {

            playlist.Songs.forEach((song) => {
                playlist.urls.push(song.url)
            })
        })
        alteredPlaylist = [...playlists];
    }

    return (
        <div>
            {playlists?.map((playlist) => (
            <>
                {/* TODO component that will rnder a collage of the pictures */}
                <div className='playlist-title-wrapper'>
                    <p className='playlist-title'>{playlist?.title}</p>
                    <img
                        className={!toggle ? "playlist-delete" : "hidden"}
                        src={require('./style/images/delete-button.png')}
                        onClick={() => {
                            handleDelete(playlist?.id)
                            setToggle(!toggle)}}>
                    </img>
                    <img
                        className={"playlist-edit"}
                        src={require("./style/images/playlist-edit-button.png")}
                        onClick={() => setToggle(!toggle)}>
                     </img>
                </div>
                <PlaylistCard
                    songs={playlist?.Songs ? playlist?.Songs : null}
                    playlistId={playlist?.id}
                    toggle={toggle} />
            </>
            ))}
        </div>
    )
}

export default PlaylistContainer;
