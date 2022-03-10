import AudioPlayer from 'react-h5-audio-player';
import './style/player.css';
import { useSong } from '../../Context/SongContext';
import { usePlaylist } from '../../Context/PlaylistContext';
import { useEffect } from 'react';

const Player = () => {
  const { currentSong, setCurrentSong } = useSong();
  const { currentPlaylist } = usePlaylist();

  useEffect(() => {
    playlist(); 
  }, [currentPlaylist])

  const playlist = () => {
    if (currentPlaylist) {
      let song = currentPlaylist.shift()
      console.log(song[0], song[1], 'YEEEEEEEEEEEEEEEEE');
      console.log("SONG!!", song);
      setCurrentSong([song[0], song[1], `Playing from playlist: ${song[2]}`]);
    }
  };


  return (
    <div>
      <AudioPlayer
        autoPlay
        src={currentSong ? currentSong[1] : null}
        onPlay={e => console.log("onPlay")}
        onEnded={playlist}
        header={currentSong && `${currentSong[2]} - ${currentSong[0]}`}
        onClickNext={playlist}
        showSkipControls={true}
      //   footer={
      //       <div className='playbackContainer'>
      //           <img className="albumPhoto" src="https://picsum.photos/200/300"></img>
      //           <div className='pBox'>
      //             <p>songName</p>
      //           </div>
      //       </div>}
      // other props here
      >
      </AudioPlayer>
    </div>
  );
};

export default Player;
