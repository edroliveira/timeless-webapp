import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { HeartOverlayComponent } from './heart-overlay/heart-overlay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    YouTubePlayer,
    HeartOverlayComponent,
    MainPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  showContent: boolean = false;
  videoId: string = 'osmzwWw4RYM';
  playerVars = { autoplay: 0 }

  playVideo() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe!.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    this.showContent = true;
  }

}
