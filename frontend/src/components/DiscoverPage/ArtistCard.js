import { getArtists, searchArtists } from "../../store/artists";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import './style/discoverpage.css';
import { Link } from 'react-router-dom';
import { useState } from "react";

const ArtistCard = ({setAllActive, setStyle}) => {
    const artists = useSelector((state) => Object.values(state.artists));
    const [term, setTerm] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArtists());
        console.log(artists);
    }, [dispatch])

    const handleSearch = (e) => {
        setTerm(e.target.value)
        const tempTerm = e.target.value

        if (tempTerm) {
            dispatch(searchArtists(tempTerm))
        } else {
            dispatch(getArtists());
        }


    };

    return (
        <>
            <input
                className="new-playlist-input"
                type="text"
                placeholder="Search SoundGarden"
                value={term}
                onChange={(e) => {
                    // console.log(e.target.value);
                    // setTerm(e.target.value)
                    handleSearch(e)}}
            />
            <p
                className="discover-page-header"
                >Browse our Artists</p>
            <div
                className="artist-card-container">
               {!artists &&
               <h1
                className="discover-page-header">Loading Artists...</h1>}
               {artists?.map((artist) => (
                   <Link
                    to={`/users/${artist?.id}`}
                    onClick={() => {
                        setAllActive('all')
                        setStyle('profile-banner-container')}}>
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
                   </Link>
               ))}
            </div>
        </>
    )
};

export default ArtistCard;
