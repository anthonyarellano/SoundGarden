import { getArtists } from "../../store/artists";
import { useDispatch } from "react-redux";

const ArtistCard = () => {
    const dispatch = useDispatch();

    return (
        <>
            <h1>Artist Card</h1>
            <div className="artist-card-container">
                <p
                    onClick={() => dispatch(getArtists())}>click</p>
            </div>
        </>
    )
};

export default ArtistCard;
