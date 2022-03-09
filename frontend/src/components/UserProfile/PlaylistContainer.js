import { useEffect } from 'react';
import { getPlaylists } from '../../store/playlists';
import { useDispatch, useSelector } from 'react-redux';
import SongContainer from './SongContainer';

const PlaylistContainer = ({sessionUser}) => {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => Object.values(state.playlists));

    console.log("HERE1", playlists);
    const songList = playlists[0].Songs;
    console.log(playlists);
    useEffect(() => {
        dispatch(getPlaylists(sessionUser.id))
    }, [dispatch])

    return (
        <div>
            {playlists?.map((playlist) => (
            <>
                <p
                    id={playlist?.id}
                >
                    {playlist.title}
                </p>
                <SongContainer playlistSongs={playlist.Songs ? playlist.Songs : null}/>
            </>
            ))}
        </div>
    )
}

export default PlaylistContainer;
