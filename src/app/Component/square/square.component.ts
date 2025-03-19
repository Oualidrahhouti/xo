import { Component, HostListener, Input } from '@angular/core';
import { GameService, Player } from '../../Service/game.service';

@Component({
  selector: 'square',
  standalone: true,
  imports: [],
  templateUrl: './square.component.html',
})
export class Square {
  @Input() index!: number;
  player: Player = '';

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.board$.subscribe((board) => {
      if (this.index !== undefined) {
        this.player = board[this.index];
      }
    });
  }
  @HostListener('click')
  onClick() {
    if (this.index !== undefined) {
      this.gameService.makeMove(this.index);
    }
  }
}
