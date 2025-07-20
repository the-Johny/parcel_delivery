import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './login-modal.component';
import { SignUpModalComponent } from './sign-up-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoginModalComponent, SignUpModalComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  showLoginModal = false;
  showSignUpModal = false;

  openLoginModal() {
    this.showLoginModal = true;
    this.showSignUpModal = false;
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  openSignUpModal() {
    this.showSignUpModal = true;
    this.showLoginModal = false;
  }

  closeSignUpModal() {
    this.showSignUpModal = false;
  }

  switchToSignUp() {
    this.openSignUpModal();
  }

  switchToLogin() {
    this.openLoginModal();
  }
} 