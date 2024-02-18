import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { HeartOverlayComponent } from '../heart-overlay/heart-overlay.component';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeartOverlayComponent,
    YouTubePlayer
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class MainPageComponent {

  showContent: boolean = false;
  videoId: string = 'osmzwWw4RYM';
  playerVars = { autoplay: 0 }

  topImgSrc: string = 'https://c4.wallpaperflare.com/wallpaper/500/740/43/4k-beautiful-background-wallpaper-preview.jpg';
  firstRowImgSrc: string = 'https://c4.wallpaperflare.com/wallpaper/500/740/43/4k-beautiful-background-wallpaper-preview.jpg';
  secondRowImgSrc: string = 'https://c4.wallpaperflare.com/wallpaper/500/740/43/4k-beautiful-background-wallpaper-preview.jpg';
  thirdRowImgSrc: string = 'https://c4.wallpaperflare.com/wallpaper/500/740/43/4k-beautiful-background-wallpaper-preview.jpg';

  playVideo() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe!.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    this.showContent = true;
  }

  constructor(
    private router: Router
  ) { }

  openEditPage() {
    this.router.navigate(['/edit']);
  }

}
