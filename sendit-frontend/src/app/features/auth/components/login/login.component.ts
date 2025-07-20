import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthModalService } from '../../../../core/services/auth-modal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private authModalService: AuthModalService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        // Navigate to dashboard on successful login
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 401) {
          this.error = 'Invalid email or password. Please try again.';
        } else if (error.status === 0) {
          this.error = 'Unable to connect to server. Please check your connection.';
        } else {
          this.error = error.error?.message || 'An error occurred during login. Please try again.';
        }
      }
    });
  }

  goToRegister(): void {
    this.authModalService.switchToRegister();
  }
} 