import AudioPlayer from 'react-h5-audio-player';
import './style/player.css';
import { useSong } from '../../Context/SongContext';

const Player = () => {
  const { currentSong, setCurrentSong } = useSong();

    return (
        <div>
            <AudioPlayer
              autoPlay
              src={currentSong && currentSong[1]}
              onPlay={e => console.log("onPlay")}
              // onEnded={playlist}
              header={currentSong && currentSong[0]}
              // onClickNext={playlist}
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