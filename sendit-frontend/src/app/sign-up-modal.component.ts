import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  fullName = '';
  email = '';
  password = '';

  onSubmit() {
    // Placeholder: handle sign up logic here
    alert(`Full Name: ${this.fullName}\nEmail: ${this.email}\nPassword: ${this.password}`);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }
} 