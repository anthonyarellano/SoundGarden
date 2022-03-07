import AudioPlayer from 'react-h5-audio-player';
import './style/player.css';

const Player = () => {
    return (
        <div>
            <AudioPlayer
              autoPlay
              // src={currentSong}
              onPlay={e => console.log("onPlay")}
              // onEnded={playlist}
              header="artist - song"
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
