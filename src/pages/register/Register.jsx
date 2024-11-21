import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleRegister = (e) => {
    e.preventDefault();
    if(username === ''){
      setMessage('The username cannot be an empty string!')
    } else if(password === '' || confirmPassword === ''){
      setMessage('The password cannot be an empty string!');
    } else if(password === confirmPassword) {
      setMessage('Register successful!');
      return navigate("/");
    } else {
      setMessage('The passwords do not match');
    }
  };

  const handleClickHere = () => {
    return navigate("/");
  }

  return (
    <div className='registration-page'>
      <h1 className='title'>Registration</h1>
      <form onSubmit={handleRegister} className='form'>
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
        <div className='form__password'>
          <label htmlFor="password" className='label-password'>Confirm password: </label>
          <input 
          type="password" 
          value={confirmPassword} 
          className='input-password' 
          onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>
        <button type='submit' className='form__button'>Sign In</button>
      </form>
      <p>Do you have an account?</p>
      <p className='clickHere' onClick={handleClickHere}> Click Here!</p>
      {<p className="login-message">{message}</p>}
    </div>
  );
}

export default Register;