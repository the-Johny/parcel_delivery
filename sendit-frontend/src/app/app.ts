import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { AuthService } from './core/services/auth.service';
import { AuthModalService, AuthModalType } from './core/services/auth-modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'sendit-frontend';

  modalOpen: boolean = false;
  modalType: AuthModalType = 'login';
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private authModalService: AuthModalService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check authentication state on init
    const user = this.authService.getCurrentUser();
    this.isAuthenticated = !!user;
    if (user) {
      this.closeModal();
    }

    // Subscribe to modal state changes
    this.authModalService.modalOpen$.subscribe(open => {
      this.modalOpen = open;
    });

    this.authModalService.modalType$.subscribe(type => {
      this.modalType = type;
    });
  }

  openLoginModal() {
    if (!this.isAuthenticated) {
      this.authModalService.openLoginModal();
    } else {
      // If already authenticated, navigate to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  openRegisterModal() {
    if (!this.isAuthenticated) {
      this.authModalService.openRegisterModal();
    } else {
      // If already authenticated, navigate to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  closeModal() {
    this.authModalService.closeModal();
  }
}
