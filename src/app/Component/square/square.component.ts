import { Component, HostListener, Input } from '@angular/core';
import { GameService } from '../../Service/game.service';

@Component({
  selector: 'square',
  standalone: true,
  imports: [],
  templateUrl: './square.component.html',
})
export class Square {
  @Input() index!: number;
  mark: string = '';

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.board$.subscribe((board) => {
      if (this.index !== undefined) {
        this.mark = board[this.index];
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
