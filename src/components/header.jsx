import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

function HeaderComponent() {
    const auth = new Auth();
    return (
    <div className="header">
        <ul className="nav">
            <Link to="/"><li className="logo">Gomoku</li></Link>
            { auth.isLoggedIn()?
                    <Link to="/games" className="prev auth-page"><li>Previous Games</li></Link>
                    :
                    <Link to='/login' className="login auth-page"><li>Login</li></Link>
            }
        </ul>
    </div>
    )
}

export default HeaderComponent;