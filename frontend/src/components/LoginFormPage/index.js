import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './style/loginform.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to={`/users/${sessionUser.id}`} />
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const handleDemo = (e) => {
    setErrors([]);
    return dispatch(sessionActions.loginDemo({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='form-container'>
        <p
          className='login-text'>Username or Email</p>
          <input
            type="text"
            className='login-form-text-input'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <p
            className='login-text'>Password</p>
          <input
            type="password"
            value={password}
            className='login-form-text-input'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <div
          className='login-button'
          onClick={handleSubmit}
        >
          Login
        </div>

        {/* <button
          type="submit"
          className='login-button'
        >Log In</button> */}
        <div
          className='login-button'
          onClick={(e) => {
            setCredential("VarianWrynn");
            setPassword("dualwield")
            handleDemo()}}
        >
          Demo User
        </div>
      </div>
    </form>
  );
}

export default LoginFormPage;
