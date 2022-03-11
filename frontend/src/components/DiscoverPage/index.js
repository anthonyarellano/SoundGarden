import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpinningRing from '../UserProfile/SpinningRing';

const DiscoverPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            <SpinningRing />
            <h1>Welcome to Discover Page</h1>
        </>
    )
};

export default DiscoverPage;
