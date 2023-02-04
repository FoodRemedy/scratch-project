import React from 'react';

function Login() {
  return (
    <div className="loginContainer">
      <label htmlFor="username">
        <b>Username</b>
        <input type="text" placeholder="Enter Username" name="username" required />
      </label>

      <label htmlFor="password">
        <b>Password</b>
        <input type="text" placeholder="Enter Password" name="password" required />
      </label>

      <button type="submit">Login</button>

    </div>
  );
}
export default Login;
