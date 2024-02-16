import { Component, Input } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class MainPageComponent {

  @Input() showContent!: boolean;

}
