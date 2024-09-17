import { act, useState } from "react";

import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx";
import { WINNING_COMBINATIONS } from "./WINNINGCOMBINATIONS.JS";
import GameOver from "./Components/GameOver.jsx";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [player, setPlayer] = useState({
    'X': 'Player 1',
    'O': 'Player 2',
  })
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActiveplayer] = useState('X');

  const currentActivePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(innerarray => [...innerarray])];

  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
      winner = player[firstSquare];
    }

  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    // setActiveplayer((currentActivePlayer) => (currentActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(gameTurns);


      const updatedTurns = [{square : {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];

      return updatedTurns;
    });
  }

  function handleRematch(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayer(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={currentActivePlayer === 'X'} onplayerName={handlePlayerNameChange}/>
          <Player name="Player 2" symbol="O" isActive={currentActivePlayer === 'O'} onplayerName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} rematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turnsLog={gameTurns}/>
    </main>
  )
}

export default App
