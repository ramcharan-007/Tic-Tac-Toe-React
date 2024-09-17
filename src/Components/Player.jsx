import { useState } from "react";

export default function Player({ name, symbol, isActive, onplayerName }) {
    const [editButtonclicked, setEditbutton] = useState(false);
    const [playerName, setPlayerName] = useState(name)

    function isEditing(){
        if(!playerName){  setPlayerName(name) }
        setEditbutton(editing => !editing)
        if(isEditing){
            onplayerName(symbol, playerName);
        }
    }


    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {
                    editButtonclicked ?
                        <input type="text" required onChange={(e) => setPlayerName(e.target.value)} value={playerName}/> :
                        <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => isEditing()}>{editButtonclicked ? "Save" : "Edit"}</button>
        </li>
    );
}