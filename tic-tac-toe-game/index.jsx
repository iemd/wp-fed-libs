/**
 * 13. Build a Tic-Tac-Toe Game (Certification Project)
 */
const { useState } = React;

function checkWinner(board) {
    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const line of winningLines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }
    return null;
}

export function Board() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const winner = checkWinner(board);
    const isDraw = !winner && !board.includes(null);

    const handleClick = (index) => {
        if (board[index] || winner) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";

        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (isDraw) {
        status = "It's a Draw!";
    } else {
        status = `Next Player: ${isXNext ? "X" : "O"}`;
    }

    return (
        <div className="container">
            <h1>Tic-Tac-Toe</h1>
            <div className="status">{status}</div>
            <div className="board">
                {
                    board.map((value, index) => (
                        <button
                            key={index}
                            className="square"
                            onClick={() => handleClick(index)}
                        >
                            {value}
                        </button>
                    ))
                }
            </div>
            <button id="reset" onClick={handleReset}>Reset Game</button>
        </div>
    );
}
