import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { HeartOverlayComponent } from './heart-overlay/heart-overlay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    YouTubePlayer,
    HeartOverlayComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  videoId: string = 'osmzwWw4RYM';

  playerVars = { autoplay: 0 }

  playVideo() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe!.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
  }

}
