import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthModalService } from '../../../../core/services/auth-modal.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private authModalService: AuthModalService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    // Split full name into first and last name
    const fullName = this.registerForm.value.fullName;
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    const registerData = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      firstName: firstName,
      lastName: lastName
    };
    
    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.loading = false;
        // Navigate to dashboard on successful registration
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 409) {
          this.error = 'An account with this email already exists.';
        } else if (error.status === 0) {
          this.error = 'Unable to connect to server. Please check your connection.';
        } else {
          this.error = error.error?.message || 'An error occurred during registration. Please try again.';
        }
      }
    });
  }

  goToLogin(): void {
    this.authModalService.switchToLogin();
  }
} 