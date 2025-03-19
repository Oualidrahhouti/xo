import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Square } from './Component/square/square.component';
import { GameService, Player } from './Service/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Square, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'xo';
  currentPlayer: Player = 'X';
  winner: Player | null = null;
  gameOver: boolean = false;
  squares = Array(9).fill(null);

  constructor(private gameSerivce: GameService) {
    this.gameSerivce.currentPlayer$.subscribe((player) => {
      this.currentPlayer = player;
    });

    this.gameSerivce.winner$.subscribe((winner) => {
      this.winner = winner;
    });

    this.gameSerivce.gameOver$.subscribe((gameOver) => {
      this.gameOver = gameOver;
    });
  }

  resetGame(): void {
    this.gameSerivce.resetGame();
  }
}
