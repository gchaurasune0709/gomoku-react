import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../assets/styles/login.css';

function Login({ history }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.33.10:3000/api/login', formData);
      console.log('User logged in successfully');
      console.log(response)

      // Set the token as an HTTP cookie
      Cookies.set('token', response.data.token, { expires: 24 }); // Adjust the expiration as needed

      // Redirect the user to the game board or another route
      navigate('/')
      navigate(0);
    } catch (error) {
        console.error(error)
      console.error('Login failed:', error.response.data.message);
      document.querySelector('.error-msg').textContent ='* username or password is incorrect';
        setTimeout(() => {
            document.querySelector('.error-msg').textContent ='';
        }, 2000)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='loginForm'>
        <div className='details'>
            <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            />
            <p>First time? <a href='/register' className='register'>register</a></p>
            <p className="error-msg"></p>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;