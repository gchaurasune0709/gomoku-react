import React from "react";
import Log from "../components/log";


function getHistory() {
    const hist = []
    let history = localStorage.getItem('history');
    if (history === null) return null
    history = JSON.parse(history);
    const allKeys = Object.keys(history);
    for (let i = 0; i < allKeys.length; i++) {
        hist.push(<Log count={i + 1} key={i + 1} id={allKeys[i]} history={history}></Log>)
    }
    return hist;
}
const Games = () => {
    return (
        <>
            { getHistory() }
        </>
    )
}

export default Games;