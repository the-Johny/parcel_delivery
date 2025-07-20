import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AuthModalType = 'login' | 'register';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  private modalTypeSubject = new BehaviorSubject<AuthModalType>('login');

  public modalOpen$ = this.modalOpenSubject.asObservable();
  public modalType$ = this.modalTypeSubject.asObservable();

  openLoginModal(): void {
    this.modalTypeSubject.next('login');
    this.modalOpenSubject.next(true);
  }

  openRegisterModal(): void {
    this.modalTypeSubject.next('register');
    this.modalOpenSubject.next(true);
  }

  closeModal(): void {
    this.modalOpenSubject.next(false);
  }

  switchToLogin(): void {
    this.modalTypeSubject.next('login');
  }

  switchToRegister(): void {
    this.modalTypeSubject.next('register');
  }

  getModalOpen(): boolean {
    return this.modalOpenSubject.value;
  }

  getModalType(): AuthModalType {
    return this.modalTypeSubject.value;
  }
} 