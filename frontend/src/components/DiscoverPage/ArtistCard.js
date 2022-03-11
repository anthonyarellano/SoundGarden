import { getArtists } from "../../store/artists";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import './style/discoverpage.css';

const ArtistCard = () => {
    const artists = useSelector((state) => Object.values(state.artists));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArtists());
        console.log(artists);
    }, [dispatch])


    return (
        <>
            <p
                className="discover-page-header"
                >Browse our Artists</p>
            <div
                className="artist-card-container">
               {!artists &&
               <h1
                className="discover-page-header">Loading Artists...</h1>}
               {artists?.map((artist) => (
                   <div
                    className="artist-card"
                   >
                       <img
                            className="artist-card-image"
                            src={artist?.imgUrl}
                       />
                       <p
                        className="artist-card-username"
                        >{artist?.username}</p>
                   </div>
               ))}
            </div>
        </>
    )
};

export default ArtistCard;
