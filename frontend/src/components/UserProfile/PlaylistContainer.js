import { useEffect, useState } from 'react';
import { getPlaylists, deletePlaylist } from '../../store/playlists';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistCard from './PlaylistCard';
import './style/playlistcard.css'
import { usePlaylist } from '../../Context/PlaylistContext';

const PlaylistContainer = ({sessionUser}) => {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => Object.values(state.playlists));
    const [toggle, setToggle] = useState(true);
    const { setCurrentPlaylist } = usePlaylist();
    let alteredPlaylist;

    useEffect(() => {
        dispatch(getPlaylists(sessionUser.id))
    }, [dispatch])



    const handleDelete = (playlistId) => {
        if (playlistId) {
            dispatch(deletePlaylist(playlistId))
        }
    };

    if (playlists?.length) {
        playlists?.forEach((playlist) => {
            if (playlist) {
                playlist.urls = [];
            }
        })
        playlists?.forEach((playlist, i) => {

            playlist?.Songs?.forEach((song) => {
                playlist?.urls?.push([song.title, song.url, playlist.title])
            })
        })
        alteredPlaylist = [...playlists];
    }

    return (
        <div>
            {alteredPlaylist?.map((playlist) => (
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
                     {/* <div onClick={() => setCurrentPlaylist(playlist.urls)}>
                         play
                     </div> */}
                     <img
                        src={require('./style/images/playlist-play-button.png')}
                        className={"playlist-edit"}
                        onClick={() => setCurrentPlaylist(playlist.urls)}
                        >
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
