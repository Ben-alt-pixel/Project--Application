import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignIn() {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value).subscribe({
        next: (response: any) => {
          if (response) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        error: () => {
          this.errorMessage = 'Login failed. Please try again.';
        },
      });
    }
  }
}
