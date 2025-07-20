import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { LoginRequest } from './core/models/auth.model';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() switchToSignUp = new EventEmitter<void>();

  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMsg = '';
    const loginData: LoginRequest = { email: this.email, password: this.password };
    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.close.emit();
        if (res.user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        this.errorMsg = err?.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  onClose() {
    this.close.emit();
  }

  onSwitchToSignUp() {
    this.switchToSignUp.emit();
  }
} 