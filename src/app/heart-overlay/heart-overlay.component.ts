import { Component, EventEmitter, Output } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-heart-overlay',
  standalone: true,
  imports: [],
  templateUrl: './heart-overlay.component.html',
  styleUrl: './heart-overlay.component.css',
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class HeartOverlayComponent {

  @Output() playSong: EventEmitter<any> = new EventEmitter();

  dismiss: boolean = false;

  dismissOverlay() {
    this.dismiss = true;
    this.playSong.emit();
  }

}
