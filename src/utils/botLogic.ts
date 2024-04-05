import { calculateWinner } from "./calculateWinner";

export function makeBotMove(
  squares: (string | null)[],
  depth = 0,
  maximizingPlayer = true
): number | null {
  const winner = calculateWinner(squares);
  if (winner !== null || depth === 5) {
    // Return score based on game state
    if (winner === "X") {
      return 10 - depth;
    } else if (winner === "O") {
      return depth - 10;
    }
    return 0; // Draw
  }

  const availableMoves: number[] = [];
  squares.forEach((square, index) => {
    if (!square) {
      availableMoves.push(index);
    }
  });

  let bestScore: number | null = maximizingPlayer ? -Infinity : Infinity;
  let bestMove: number | null = null;

  availableMoves.forEach((move) => {
    const newSquares = squares.slice();
    newSquares[move] = maximizingPlayer ? "X" : "O";
    const score = makeBotMove(newSquares, depth + 1, !maximizingPlayer);

    if (score !== null) {
      if (maximizingPlayer) {
        if (score > bestScore!) {
          bestScore = score;
          bestMove = move;
        }
      } else {
        if (score < bestScore!) {
          bestScore = score;
          bestMove = move;
        }
      }
    }
  });

  return depth === 0 ? bestMove : bestScore;
}
