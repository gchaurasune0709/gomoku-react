import React from "react";
import Auth from '../utils/auth';
import { useNavigate } from "react-router-dom";

let navigate = '';

const gotoGame = () => {
    const auth = new Auth();
    if (!auth.isLoggedIn()) {
        navigate('/login');
        return
    }
    const bsize = document.getElementById('size').value
    console.log(bsize)
    localStorage.removeItem('boardSize');
    localStorage.setItem('boardSize', bsize)
    navigate('/game');
}


const GameConfig = ({ size }) => {
    navigate = useNavigate();
    return (
        <section className="boardConfig">
            <label for='size'>Board Size</label>
            <select id='size' name="size">
                <option disabled value="boardSize" >Board Size</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
            </select>

            <button onClick={gotoGame}>start</button>
        </section>
    )
}


export default GameConfig