import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-heart-overlay',
  standalone: true,
  imports: [],
  templateUrl: './heart-overlay.component.html',
  styleUrl: './heart-overlay.component.css',
  animations: [
    fadeOutOnLeaveAnimation()
  ]
})
export class HeartOverlayComponent {

  @Input() isLoading!: boolean;
  @Output() playSong: EventEmitter<any> = new EventEmitter();

  dismiss: boolean = false;

  dismissOverlay() {
    this.dismiss = true;
    this.playSong.emit();
  }

}
