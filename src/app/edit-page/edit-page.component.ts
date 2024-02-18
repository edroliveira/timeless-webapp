import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    SignupComponent
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent {

}
