import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './style/navbar.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
    <>
        <NavLink to="/upload">
          <img className='navbar-image'
                src={require('./style/images/upload-image.png')}>
          </img>
        </NavLink>
        <ProfileButton user={sessionUser} />
    </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='navbar-link' to="/login">Log In</NavLink>
        <NavLink className='navbar-link' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
        <div>
          <div className='navbar-upper'>
            <p className='navbar-logo-text'>Soundgarden</p>
          </div>
          <div className='navbar-lower'>
            <NavLink className='navbar-link' exact to="/">
              <img
                className='navbar-image'
                src={require('./style/images/home-image.png')}>
              </img>
            </NavLink>
            {isLoaded && sessionLinks}
          </div>
        </div>

  );
}

export default Navigation;
