import React from "react";
import { Link } from "react-router-dom";

function HeaderComponent() {
    return (
    <div className="header">
        <ul className="nav">
            <Link to="/"><li className="logo">Gomoku</li></Link>
            <Link to='/login' className="login"><li>Login</li></Link>
            <Link to="#" className="prev"><li>Previous Games</li></Link>
        </ul>
    </div>
    )
}

export default HeaderComponent;