import SongButtons from "../UserProfile/SongButtons"

const SongPage = ({selectedSong}) => {

    return (
        <div>
            <h1>{selectedSong?.title}</h1>
            <img
                className="album-artwork"
                src={selectedSong?.imgUrl}/>
            <SongButtons
                song={selectedSong}
                visible={true}
                id={selectedSong?.id}
                hoveredSong={selectedSong}
                ></SongButtons>
        </div>
    )
}

export default SongPage
