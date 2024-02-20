import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { HeartOverlayComponent } from '../heart-overlay/heart-overlay.component';
import { YouTubePlayer } from '@angular/youtube-player';
import { MatDividerModule } from '@angular/material/divider';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeartOverlayComponent,
    YouTubePlayer,
    MatDividerModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class MainPageComponent implements OnInit {

  storage = inject(Storage);
  filePath: string = '/images/';
  showContent: boolean = false;
  videoId: string = 'osmzwWw4RYM';
  playerVars = { autoplay: 0 }

  topImgSrc!: string;
  firstRowImgSrc!: string;
  secondRowImgSrc!: string;
  thirdRowImgSrc!: string;
  loremIpsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget ex eu lacus tincidunt ultrices id imperdiet ante. Ut vitae mi lectus. Vestibulum ut ex maximus tortor elementum volutpat. Nunc pretium semper aliquam. Nullam id eleifend tellus. Praesent hendrerit augue ac mi suscipit, vel tempor arcu vestibulum. Nam laoreet laoreet lorem et tempus. Vestibulum consectetur sit amet tortor ultrices rhoncus. Sed vehicula sem id iaculis mattis. Sed quis tellus sit amet nulla tincidunt lobortis et a elit. Vivamus dapibus sem orci, eget imperdiet felis feugiat in. In varius ante sit amet risus hendrerit gravida. Praesent in efficitur velit. Nulla elit augue, eleifend nec mauris et, consectetur tincidunt nunc.';

  playVideo() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe!.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    this.showContent = true;
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDataFromStorage();
  }

  openEditPage() {
    this.router.navigate(['/edit']);
  }

  getDataFromStorage() {
    const storageRefTop = ref(this.storage, this.filePath + 'top');
    getDownloadURL(storageRefTop).then(resp => this.topImgSrc = resp);

    const storageRefFirst = ref(this.storage, this.filePath + 'first');
    getDownloadURL(storageRefFirst).then(resp => this.firstRowImgSrc = resp);

    const storageRefSecond = ref(this.storage, this.filePath + 'second');
    getDownloadURL(storageRefSecond).then(resp => this.secondRowImgSrc = resp);

    const storageRefThird = ref(this.storage, this.filePath + 'third');
    getDownloadURL(storageRefThird).then(resp => this.thirdRowImgSrc = resp);
  }

}
