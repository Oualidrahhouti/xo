import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Square } from './Component/square/square.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Square],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'xo';
}
