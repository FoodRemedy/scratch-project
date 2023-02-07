import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
  const { globalUser, setGlobalUser } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log('username before click', username);
    if (event.target.id === 'username') setUsername(event.target.value);
    if (event.target.id === 'password') setPassword(event.target.value);
  };

  const handleSignup = () => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('user created:', data);
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('username', data);
        setGlobalUser(data);
        navigate('/feature');
      })
      .catch((err) => console.log('login error:', err));
  };

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
  }

  return (
    <div className="loginWrapper">
     
    
    <form onSubmit={handleSubmit} className="loginContainer">
      <h1>Food Remedy</h1>
      <label htmlFor="username">
        <b>Username</b>
        <input id="username" type="text" onChange={handleChange} placeholder="Enter Username" name="username" required />
      </label>

        <label htmlFor="password">
          <b>Password</b>
          <input
            id="password"
            type="text"
            onChange={handleChange}
            placeholder="Enter Password"
            name="password"
            required
          />
        </label>

      <button
        type="submit"
        onClick={handleSignup}
      >
        Sign Up
      </button>
      <button type="submit" onClick={handleLogin}>
        Login
        {/* { <Link to={
          // if globalUser === '', link to the current page
          // otherwise, link to /feature
          globalUser ? {
            pathname: '/feature',
          } : {
            pathname: '/',
          }
          }
        >
          Login
        </Link> } */}
      </button>

    </form>
    </div>
  );
}
export default Login;
