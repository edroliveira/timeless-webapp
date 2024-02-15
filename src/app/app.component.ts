import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, YouTubePlayer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timeless-webapp';

  playerVars = {autoplay: 1}
}
