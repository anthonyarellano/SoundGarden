
const UserProfile = () => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <h1>Welcome to user profile</h1>
    )
};

export default UserProfile;
