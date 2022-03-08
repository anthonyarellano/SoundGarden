import { useEffect } from 'react';
import { getPlaylists } from '../../store/playlists';
import { useDispatch, useSelector } from 'react-redux';

const PlaylistContainer = ({sessionUser}) => {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => Object.values(state.playlists));

    useEffect(() => {
        dispatch(getPlaylists(sessionUser.id))
    }, [dispatch])

    return (
        <div>
            {playlists?.map((playlist) => (
                <p>{playlist.title}</p>
            ))}
        </div>
    )
}

export default PlaylistContainer;
