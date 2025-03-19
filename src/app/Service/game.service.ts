import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Player = 'X' | 'O' | '';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private boardSubject = new BehaviorSubject<Player[]>(Array(9).fill(''));
  public board$ = this.boardSubject.asObservable();

  private currentPlayerSubject = new BehaviorSubject<Player>('X');
  public currentPlayer$ = this.currentPlayerSubject.asObservable();

  private winnerSubject = new BehaviorSubject<Player | null>(null);
  public winner$ = this.winnerSubject.asObservable();

  private gameOverSubject = new BehaviorSubject<boolean>(false);
  public gameOver$ = this.gameOverSubject.asObservable();

  private winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  constructor() {}

  makeMove(index: number): void {
    if (this.boardSubject.value[index] || this.gameOverSubject.value) {
      return; // Square already taken or game is over
    }

    const currentBoard = [...this.boardSubject.value];
    const currentPlayer = this.currentPlayerSubject.value;

    currentBoard[index] = currentPlayer;
    this.boardSubject.next(currentBoard);

    if (this.checkWinner()) {
      this.winnerSubject.next(currentPlayer);
      this.gameOverSubject.next(true);
      return;
    }

    if (this.checkDraw()) {
      this.gameOverSubject.next(true);
      return;
    }

    this.currentPlayerSubject.next(currentPlayer === 'X' ? 'O' : 'X');
  }

  private checkWinner(): boolean {
    const board = this.boardSubject.value;
    const player = this.currentPlayerSubject.value;

    return this.winningCombinations.some((combination) =>
      combination.every((index) => board[index] === player)
    );
  }

  private checkDraw(): boolean {
    return this.boardSubject.value.every((square) => square !== '');
  }

  resetGame(): void {
    this.boardSubject.next(Array(9).fill(''));
    this.currentPlayerSubject.next('X');
    this.winnerSubject.next(null);
    this.gameOverSubject.next(false);
  }

  getBoardValue(): Player[] {
    return this.boardSubject.value;
  }

  getCurrentPlayer(): Player {
    return this.currentPlayerSubject.value;
  }
}
