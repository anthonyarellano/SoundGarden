import React from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style/navbar.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
    <>
        <NavLink to="/upload">
          <img className='navbar-image'
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
        {/* <button
          onClick={() => history.push(`/users/${sessionUser.id}`)}>Profile</button> */}
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
