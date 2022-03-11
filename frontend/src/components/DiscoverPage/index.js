import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DiscoverPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            <h1>Welcome to Discover Page</h1>
        </>
    )
};

export default DiscoverPage;
