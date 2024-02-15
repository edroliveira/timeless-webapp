import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { MainPageComponent } from './main-page/main-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, YouTubePlayer, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timeless-webapp';

  playerVars = {autoplay: 1}
}
