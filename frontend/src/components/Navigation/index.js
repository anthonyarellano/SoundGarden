import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './style/navbar.css';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(sessionActions.logout());
    return <Redirect to="/" />
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/discover">
          <img
            className='navbar-image'
            src={require('./style/images/discover-image.png')}
            alt="discover-image">
          </img>
        </NavLink>
        <NavLink to="/upload">
          <img
            className='navbar-image'
            src={require('./style/images/upload-image.png')}
            alt="upload-image">
          </img>
        </NavLink>
        <NavLink to={`/users/${sessionUser.id}`}>
          <img
            className='navbar-image'
            src={require('./style/images/profile-image.png')}
            alt="profile-image">
          </img>
        </NavLink>
        <div>
          <img
            className='navbar-image'
            src={require('./style/images/logout-image.png')}
            alt="logout-image"
            onClick={logout}></img>
        </div>
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
        <p className='navbar-logo-text-1'>Sound</p>
        <p className='navbar-logo-text-2'>garden</p>
      </div>
      <div className='navbar-lower'>
        <NavLink exact to="/">
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
