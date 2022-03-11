import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArtistCard from './ArtistCard';

const DiscoverPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            <ArtistCard />
        </>
    )
};

export default DiscoverPage;
