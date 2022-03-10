import './style/splashpage.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import Modal from 'react-modal';

const SplashPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [toggle, setToggle] = useState(false);

    let sessionLinks;
    const openModal = () => {
        setIsOpen(true);
        return;
    }

    const closeModal = () => {
        setIsOpen(false);
        setToggle(false); 
        return
    }

    if (sessionUser) {
        sessionLinks = (
        <>
            <div className='splash-page-button-container'>
                <NavLink className='splash-page-link' exact to='/login'>{`Enter, ${sessionUser.username}`}</NavLink>
            </div>
        </>
        )
    } else {
        sessionLinks = (
        <>
            <div
                className='splash-page-button-container'
                onClick={() => {
                    openModal()
                    setToggle(true)
                }}
            >
                <p className={toggle ? "hidden" : 'login-text'}>Login</p>
                {/* <NavLink className='splash-page-link' exact to='/login'>Login /</NavLink>
                <NavLink className='splash-page-link' exact to='/signup'> Sign up</NavLink> */}
            </div>
        </>
        )
    }


    return (
        <>
            <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="playlist-modal">


            </Modal>
            <div className='splash-page'>
                <div className='splash-page-header'>
                    <h1>Soundgarden</h1>
                </div>
                <div className='splash-page-text-container'>
                    <p id="splash-page-text">Local music lives here</p>
                    {sessionLinks}
                </div>
                <img
                    src={require("./style/splashRing.png")}
                    className="splash-page-img">
                </img>
                <p className='splash-page-link'>ReactJS - Redux - Express - PostgreSQL - Sequelize - AWS - CSS </p>
            </div>
        </>
    )
};

export default SplashPage;
