import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setMessage('Login successful!');
      return navigate("/Homepage");
    } else {
      setMessage('Invalid username or password');
    }
  };

  const handleClickHere = () => {
    return navigate("/register");
  }

  return (
    <div className='login-page'>
      <h1 className='title'>Authentication</h1>
      <form onSubmit={handleLogin} className='form'>
        <div className='form__username'>
          <label htmlFor="username" className='label-username'>Username: </label>
          <input 
          type="text"
          value={username} 
          className='input-username' 
          onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='form__password'>
          <label htmlFor="password" className='label-password'>Password: </label>
          <input 
          type="password" 
          value={password} 
          className='input-password' 
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type='submit' className='form__button'>Log In</button>
      </form>
      <p>Don't have an account?</p>
      <p className='clickHere' onClick={handleClickHere}> Click Here!</p>
      {<p className="login-message">{message}</p>}
    </div>
  );
}

export default LogIn;