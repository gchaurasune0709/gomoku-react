import React from "react";
import { useNavigate } from "react-router-dom";

let navigate = '';
const checkLogin = (e) => {
    e.preventDefault();
    const ob = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    if (ob.username !== 'admin' || ob.password !== 'admin') {
        document.querySelector('.error-msg').textContent ='* username or password is incorrect';
        setTimeout(() => {
            document.querySelector('.error-msg').textContent ='';
        }, 2000)
        return
    }
    localStorage.removeItem('loginDetails');
    localStorage.setItem('loginDetails', JSON.stringify(ob));
    console.log(ob);
    navigate('/');
    navigate(0);
}


const LoginDetails = () => {
    navigate = useNavigate();
    return (
        <>
            <form onSubmit={checkLogin} className="loginForm">
                <label htmlFor="username">username</label>
                <input type="text" placeholder="username" id="username"></input>
                <label htmlFor="password">password</label>
                <input type="password" placeholder="password" id="password"></input>
                <p className="error-msg"></p>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginDetails;