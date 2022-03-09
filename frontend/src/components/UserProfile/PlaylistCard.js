import './style/playlistcard.css'
import { useSong } from '../../Context/SongContext';

const PlaylistCard = ({songs}) => {
    const { setCurrentSong } = useSong();
    console.log(songs);

    return (
        <div className="playlist-card-container">
            {songs?.map((song) => (
                <div
                    className='playlist-card'
                    onClick={() => setCurrentSong([song?.title, song?.url, "Song"])}>
                    <img src={song?.imgUrl} style={{height: "25px"}}></img>
                    <p className='playlist-card-song-title'>{song?.title}</p>
                </div>
            ))}
        </div>
    )
};

export default PlaylistCard;
