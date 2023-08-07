import React from "react";

const checkLogin = (e) => {
    e.preventDefault();
}


const LoginDetails = () => {
    return (
        <>
            <form onSubmit={checkLogin} className="loginForm">
                <label htmlFor="username">username</label>
                <input type="text" placeholder="username" id="username"></input>
                <label htmlFor="password">password</label>
                <input type="password" placeholder="password" id="password"></input>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginDetails;