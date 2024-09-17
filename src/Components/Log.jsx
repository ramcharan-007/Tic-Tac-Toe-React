

export default function Log({turnsLog}){

    return (<ol id="log">
        {turnsLog.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row},{turn.square.col}</li>)}
    </ol>)
}