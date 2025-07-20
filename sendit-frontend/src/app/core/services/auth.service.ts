import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginRequest, RegisterRequest, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          this.currentUser = JSON.parse(storedUser);
        } catch {
          localStorage.removeItem('currentUser');
        }
      }
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  login(data: LoginRequest): Observable<any> {
    // Dummy login: support admin and user
    if (data.email === 'admin@sendit.com' && data.password === 'admin123') {
      const user: User = {
        id: 'admin-id',
        email: data.email,
        firstName: 'Admin',
        lastName: '',
        token: 'admin-token',
        role: 'admin'
      };
      this.currentUser = user;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return of({ user, access_token: 'admin-token' }).pipe(delay(500));
    } else if (data.email === 'test@example.com' && data.password === 'password123') {
      const user: User = {
        id: 'dummy-id',
        email: data.email,
        firstName: 'Test',
        lastName: 'User',
        token: 'dummy-token',
        role: 'user'
      };
      this.currentUser = user;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return of({ user, access_token: 'dummy-token' }).pipe(delay(500));
    } else {
      return throwError(() => ({
        status: 401,
        error: { message: 'Invalid email or password.' }
      }));
    }
  }

  register(data: RegisterRequest): Observable<any> {
    // Dummy register: always succeed
    const user: User = {
      id: 'dummy-id',
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      token: 'dummy-token',
      role: 'user'
    };
    this.currentUser = user;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return of({ user, access_token: 'dummy-token' }).pipe(delay(500));
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUser = null;
  }

  getAuthToken(): string | null {
    return this.currentUser ? this.currentUser.token : null;
  }
} 