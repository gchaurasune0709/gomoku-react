import React from "react";
import { useNavigate, useParams } from "react-router-dom";


let navigate;
let params;

function displayHistory(e) {
    const id = e.target.parentNode.id
    navigate(`/game-log/${id}`);
    navigate(0)
}

const Log = ({count, id, history}) => {
    navigate = useNavigate();
    return (
        <div className="log" id={`${id}`}>
            <p className="gameCount">{`Game #${count}`}</p>
            <p className="date">{`@${history[id]['date']}`}</p>
            <p className="status">{history[id]['status']}</p>
            <button className="log-btn" onClick={displayHistory}>view game log</button>
        </div>
    )
}

export default Log;