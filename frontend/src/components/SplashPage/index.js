import './style/splashpage.css';

const SplashPage = () => {
    return (
        <div className='splashPage'>
            <img
                src={require("./style/splashRing.png")}
                className="pic">
            </img>
        </div>
    )
};

export default SplashPage;
