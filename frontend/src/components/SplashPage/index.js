import './style/splashpage.css';
import { Link } from 'react-router-dom';

const SplashPage = () => {
    return (
        <div className='splash-page'>
            <div className='splash-page-header'>
                <h1>Soundgarden</h1>
            </div>
            <div className='splash-page-text-container'>
                <p id="splash-page-text">Local music lives here</p>
                <div className='splash-page-button-container'>
                    <Link className='splash-page-link' to='/login'>Login /</Link>
                    <Link className='splash-page-link' to='/signup'> Sign up</Link>
                </div>
            </div>
            <img
                src={require("./style/splashRing.png")}
                className="splash-page-img">
            </img>
        </div>
    )
};

export default SplashPage;
