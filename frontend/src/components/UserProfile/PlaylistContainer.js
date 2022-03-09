import { useEffect } from 'react';
import { getPlaylists } from '../../store/playlists';
import { useDispatch, useSelector } from 'react-redux';
import SongContainer from './SongContainer';
import PlaylistCard from './PlaylistCard';

const PlaylistContainer = ({sessionUser}) => {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => Object.values(state.playlists));

    useEffect(() => {
        dispatch(getPlaylists(sessionUser.id))
    }, [dispatch])

    return (
        <div>
            {playlists?.map((playlist) => (
            <>
                
                <PlaylistCard songs={playlist?.Songs ? playlist?.Songs : null} />
                {/* <SongContainer playlistSongs={playlist?.Songs ? playlist?.Songs : null}/> */}
            </>
            ))}
        </div>
    )
}

export default PlaylistContainer;
