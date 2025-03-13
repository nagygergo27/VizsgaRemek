import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  constructor(private authService: AuthService) {}

  register() {
    if (this.password !== this.passwordConfirm) {
      alert("A jelszavak nem egyeznek!");
      return;
    }

    this.authService.signUpMailPassword(this.email, this.password);
  }
}
