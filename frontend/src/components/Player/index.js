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
      >
      </AudioPlayer>
    </div>
  );
};

export default Player;
