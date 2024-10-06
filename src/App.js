import {useState} from 'react';

function Square({value, onSquareClick}) {
  //const [value, setValue] = useState(null);

  // function handleClick() {
  //   setValue('X')
  //   console.log('clicked');
  // }

  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares){
  // winning possibilities
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // check for every line
  for (let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[b] == squares[a] && squares[a] == squares[c]){
      return squares[a];
    }
  }

  return null;
}

function Board({xIsNext, squares, onPlay}) {
  // const [xIsNext, setValue] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  // variable declaration
  let status;

  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player: " + (xIsNext ? "X": "O");
  }

  function handleClick(i) {
    // check if the value is not null
    if (squares[i] || calculateWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = 'X';
      // setValue(false);
    }
    else {
      nextSquares[i] = 'O';
      // setValue(true);
    }
    // setSquares(nextSquares);
    onPlay(nextSquares)
    console.log('clicked');
  }


  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game(){
  // const [xIsNext, setValue] = useState(true);
  // array with all the previous turns
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // const currentSquares = history[history.length - 1];
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    }
    else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setHistory([...history, nextSquares]);
    // setValue(!xIsNext);
  }

  function jumpTo(nextMove){
      setCurrentMove(nextMove);
      // setValue(nextMove % 2 === 0);
  }

  return (
    <div className="game">
      <div className="game_board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game_info">
        <ol>{moves}</ol>
      </div>
    </div>
  )

}
