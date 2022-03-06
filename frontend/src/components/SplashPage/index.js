import './style/splashpage.css';

const SplashPage = () => {
    return (
        <div className='splash-page'>
            <div className='splash-page-header'>
                <h1>Soundgarden</h1>
            </div>
            {/* <img
                src={require("./style/splashRing.png")}
                className="pic">
            </img> */}
            <img
                src={require("./style/splashRing.png")}
                className="pic2">
            </img>
        </div>
    )
};

export default SplashPage;
