import './style/playlistcard.css'
import { useSong } from '../../Context/SongContext';
import { removeFromPlaylist } from '../../store/playlists';
import { useDispatch } from 'react-redux';

const PlaylistCard = ({songs, playlistId, toggle}) => {
    const { setCurrentSong } = useSong();
    const dispatch = useDispatch();

    console.log(songs);

    const handleRemove = (songId, playlistId) => {
        if (songId && playlistId) {
            dispatch(removeFromPlaylist(songId, playlistId))
            return;
        }
    };

    return (
        <div className="playlist-card-container">
            {songs?.map((song) => (
            <>
                <div
                    className='playlist-card'
                    onClick={() => setCurrentSong([song?.title, song?.url, "Song"])}>
                    <img src={song?.imgUrl} style={{height: "25px"}}></img>
                    <p className='playlist-card-song-title'>{song?.title}</p>
                    <div
                        className={!toggle ? 'playlist-song-remove-button' : 'hidden'}
                        onClick={() => handleRemove(song?.id, playlistId)}>
                        &nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;
                        -
                    </div>
                </div>
            </>
            ))}
        </div>
    )
};

export default PlaylistCard;
