import { Component } from '@angular/core';

@Component({
  selector: 'square',
  standalone: true,
  imports: [],
  templateUrl: './square.component.html',
})
export class Square {
  mark: string = '';
}
