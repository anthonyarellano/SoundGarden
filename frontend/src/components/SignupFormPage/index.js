import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/discover" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className="form-container">
        <p
          className='login-text'>Email</p>
          <input
            type="text"
            className='login-form-text-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <p
          className='login-text'>Username</p>
          <input
            type="text"
            className='login-form-text-input'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <p
            className='login-text'>Password</p>
          <input
            type="password"
            className='login-form-text-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p
            className='login-text'>Confirm Password</p>
          <input
            type="password"
            className='login-form-text-input'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div
          className='login-button'
          onClick={handleSubmit}
        >
          Sign Up
        </div>
      </div>
    </form>
  );
}

export default SignupFormPage;
