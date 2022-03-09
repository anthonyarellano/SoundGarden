import './style/playlistcard.css'

const PlaylistCard = ({songs}) => {
    console.log(songs);
    return (
        <div className="playlist-card-container">
            {songs?.map((song) => (
            <div className='playlist-card-wrapper'>
                <div className='playlist-card'>
                    <img src={song?.imgUrl} style={{height: "25px"}}></img>
                    <p className='playlist-card-song-title'>{song?.title}</p>
                </div>
            </div>
            ))}
        </div>
    )
};

export default PlaylistCard;
