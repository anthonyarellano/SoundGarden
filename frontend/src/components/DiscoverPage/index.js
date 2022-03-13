import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArtistCard from './ArtistCard';
import { useState } from 'react';

const DiscoverPage = ({setAllActive, setStyle}) => {
    const sessionUser = useSelector(state => state.session.user);
    const [term, setTerm] = useState("");

    if (!sessionUser) {
        return <Redirect to="/" />
    }

    const handleSearch = (e) => {


    };


    return (
        <>
            <input
                type="text"
                placeholder="Search SoundGarden"
                value={term}
                onChange={(e) => {
                    setTerm(e.target.value)
                    handleSearch()}}/>
            <ArtistCard setAllActive={setAllActive} setStyle={setStyle}/>
        </>
    )
};

export default DiscoverPage;
