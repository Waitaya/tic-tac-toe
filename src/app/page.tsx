"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Square from "./components/Square";
import { calculateWinner } from "@/utils/calculateWinner";

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Function to handle square click
  const handleClick = (i: number) => {
    if (xIsNext && !squares[i] && !calculateWinner(squares)) {
      handle(i);
    }
  };

  // Function to handle player move
  const handle = (i: number) => {
    const newSquares = [...squares];
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  // Function to reset the board
  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Use Effect to handle bot's move
  useEffect(() => {
    const onHandleBot = async () => {
      try {
        const response = await axios.post("/api", { squares });
        const botMove = response.data.botMove;

        if (botMove !== null) {
          setTimeout(() => {
            handle(botMove);
          }, 1000); // Delay to simulate bot's "thinking"
        }
      } catch (error) {
        console.error("Error fetching bot's move:", error);
      }
    };

    if (!xIsNext) {
      onHandleBot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xIsNext, squares]);

  // Determine game status
  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // Render the board
  return (
    <div className="game">
      <div className="game-board">
        <div className="flex justify-between">
          <div className="status">{status}</div>
          {(!squares.includes(null) || winner) && (
            <p className="text-blue-600 cursor-pointer" onClick={resetBoard}>
              Play again
            </p>
          )}
        </div>

        <div className="board-row">
          {[0, 1, 2].map((i) => (
            <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
          ))}
        </div>
        <div className="board-row">
          {[3, 4, 5].map((i) => (
            <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
          ))}
        </div>
        <div className="board-row">
          {[6, 7, 8].map((i) => (
            <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
