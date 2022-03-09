import { useEffect } from 'react';
import { getPlaylists, deletePlaylist } from '../../store/playlists';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistCard from './PlaylistCard';
import './style/playlistcard.css'

const PlaylistContainer = ({sessionUser}) => {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => Object.values(state.playlists));

    useEffect(() => {
        dispatch(getPlaylists(sessionUser.id))
    }, [dispatch])

    const handleDelete = (playlistId) => {
        if (playlistId) {
            dispatch(deletePlaylist(playlistId))
        }
    };

    return (
        <div>
            {playlists?.map((playlist) => (
            <>
                {/* TODO component that will rnder a collage of the pictures */}
                <div className='playlist-title-wrapper'>
                    <p className='playlist-title'>{playlist?.title}</p>
                    <img
                        className="playlist-delete"
                        src={require('./style/images/delete-button.png')}
                        onClick={() => handleDelete(playlist?.id)}></img>
                </div>
                <PlaylistCard
                    songs={playlist?.Songs ? playlist?.Songs : null}
                    playlistId={playlist?.id} />
            </>
            ))}
        </div>
    )
}

export default PlaylistContainer;
