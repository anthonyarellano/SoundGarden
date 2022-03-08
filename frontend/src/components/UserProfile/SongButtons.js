import { useSong } from "../../Context/SongContext";
import { useDispatch, useSelector } from 'react-redux';

const SongButtons = ({visible, id, hoveredSong, song}) => {
    const sessionUser = useSelector((state) => state.session.user);
    const { setCurrentSong } = useSong();
    console.log(song);
    return (
        <div
            id={id}
            className={visible && id === parseInt(hoveredSong) ? 'song-button-container' : 'hidden'}
        >
            <div className="song-play-button">
                <img
                    className="song-image"
                    src={require('./style/images/play-button.png')}
                    onClick={() => setCurrentSong([song?.title, song?.url])}></img>
            </div>
            <div className="create-playlist-button">
                <img
                    className="song-image playlist"
                    src={require('./style/images/playlist-button.png')}></img>
            </div>
            {song?.userId === sessionUser?.id &&
            <>
                <div className="song-edit-button">
                    <img
                        className="song-image edit"
                        src={require('./style/images/edit-button.png')}></img>
                </div>
                <div className="song-delete-button">
                    <img
                        className="song-image delete"
                        src={require('./style/images/delete-button.png')}></img>
                </div>
            </>
            }
        </div>
    )
};

export default SongButtons;
