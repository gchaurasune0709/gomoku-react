import React, { useState } from 'react';
import axios from 'axios';

function Register({ history }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.33.10:3000/api/users', formData);
      // Optionally, you can redirect the user to a login page
      history.push('/login');
    } catch (error) {
        console.error(error);
      console.error('Registration failed:', error.response.data.message);
      document.querySelector('.error-msg').textContent ='something went wrong';
        setTimeout(() => {
            document.querySelector('.error-msg').textContent ='';
        }, 2000)
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        </div>
        <p className='error-msg'></p>
        <a href='/login' className='register'>Login?</a>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;