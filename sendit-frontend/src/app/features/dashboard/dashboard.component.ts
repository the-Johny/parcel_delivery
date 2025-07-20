import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-layout">
      <aside class="sidebar">
        <div class="sidebar-header">
          <span class="sidebar-brand">SendIT</span>
        </div>
        <nav class="sidebar-nav">
          <a class="nav-link active"><span class="icon">🏠</span> Dashboard</a>
          <a class="nav-link"><span class="icon">📦</span> My Sent Parcels</a>
          <a class="nav-link"><span class="icon">📥</span> My Received Parcels</a>
          <a class="nav-link"><span class="icon">⚖️</span> Get a Quote</a>
          <a class="nav-link"><span class="icon">👤</span> Profile Settings</a>
        </nav>
        <div class="sidebar-footer">
          <button class="logout-btn" (click)="logout()"><span class="icon">📦</span> Logout</button>
        </div>
      </aside>
      <main class="dashboard-main">
        <header class="main-header">
          <h2>Dashboard</h2>
          <div class="header-actions">
            <span class="notif-icon">🔔</span>
            <div class="user-avatar">{{ userInitials }}</div>
            <span class="user-name">{{ userFullName }}</span>
          </div>
        </header>
        <section class="welcome-section">
          <h3>Welcome, {{ userFirstName }}!</h3>
          <div class="stats-cards">
            <div class="stat-card">
              <div class="stat-label">Parcels Sent</div>
              <div class="stat-value">{{ stats.sent }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Parcels Received</div>
              <div class="stat-value">{{ stats.received }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">In Transit</div>
              <div class="stat-value in-transit">{{ stats.inTransit }}</div>
            </div>
          </div>
        </section>
        <section class="quick-track-section">
          <div class="quick-track-card">
            <div class="quick-track-title">Quick Track</div>
            <form (ngSubmit)="trackParcel()" class="quick-track-form">
              <input type="text" [(ngModel)]="trackId" name="trackId" placeholder="Enter Parcel ID (e.g., IT-917FGH)" class="quick-track-input" />
              <button type="submit" class="track-btn">Track</button>
            </form>
            <div *ngIf="trackResult" class="track-result">{{ trackResult }}</div>
          </div>
        </section>
        <section class="recent-activity-section">
          <div class="recent-activity-card">
            <div class="recent-activity-title">Recent Activity</div>
            <ul class="activity-list">
              <li *ngFor="let activity of recentActivity">
                Parcel <b>{{ activity.parcelId }}</b> updated to <b>{{ activity.status }}</b>
                <span class="activity-time">({{ activity.time }})</span>
                <a class="view-link" href="#">View</a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      display: flex;
      min-height: 100vh;
      background: #f6f7fa;
    }
    .sidebar {
      width: 240px;
      background: #fff;
      border-right: 1px solid #ececec;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 0 16px 0;
    }
    .sidebar-header {
      padding: 32px 0 24px 0;
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      color: #a259ec;
      letter-spacing: 1px;
    }
    .sidebar-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0 0 0 0;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 32px;
      color: #23213d;
      text-decoration: none;
      font-size: 1.08rem;
      border-left: 4px solid transparent;
      transition: background 0.2s, border-color 0.2s;
      cursor: pointer;
    }
    .nav-link.active, .nav-link:hover {
      background: #f3eafd;
      border-left: 4px solid #a259ec;
      color: #7c3aed;
    }
    .sidebar-footer {
      padding: 0 32px;
    }
    .logout-btn {
      width: 100%;
      background: #fff0f0;
      color: #dc3545;
      border: none;
      border-radius: 6px;
      padding: 10px 0;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background 0.2s;
    }
    .logout-btn:hover {
      background: #ffe0e0;
    }
    .dashboard-main {
      flex: 1;
      padding: 0 32px 32px 32px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px 0 0 0;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .notif-icon {
      font-size: 1.3rem;
      color: #a259ec;
      cursor: pointer;
    }
    .user-avatar {
      width: 38px;
      height: 38px;
      background: #ece6fa;
      color: #7c3aed;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
    }
    .user-name {
      font-weight: 600;
      color: #23213d;
      font-size: 1.08rem;
    }
    .welcome-section {
      margin-top: 12px;
    }
    .welcome-section h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #23213d;
      margin-bottom: 18px;
    }
    .stats-cards {
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      padding: 24px 32px;
      min-width: 180px;
      text-align: center;
      flex: 1;
    }
    .stat-label {
      color: #6c6c80;
      font-size: 1.08rem;
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: #23213d;
    }
    .stat-value.in-transit {
      color: #357afd;
    }
    .quick-track-section {
      margin-bottom: 18px;
    }
    .quick-track-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      padding: 20px 28px 18px 28px;
      margin-bottom: 0;
    }
    .quick-track-title {
      font-weight: 600;
      font-size: 1.15rem;
      margin-bottom: 10px;
      color: #23213d;
    }
    .quick-track-form {
      display: flex;
      gap: 12px;
      margin-bottom: 0;
    }
    .quick-track-input {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 1rem;
      background: #fafbfc;
      transition: border-color 0.2s;
    }
    .quick-track-input:focus {
      border-color: #a259ec;
      outline: none;
    }
    .track-btn {
      background: #a259ec;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 10px 24px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .track-btn:hover {
      background: #7c3aed;
    }
    .track-result {
      margin-top: 10px;
      color: #357afd;
      font-weight: 600;
    }
    .recent-activity-section {
      margin-top: 0;
    }
    .recent-activity-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      padding: 20px 28px 18px 28px;
    }
    .recent-activity-title {
      font-weight: 600;
      font-size: 1.15rem;
      margin-bottom: 10px;
      color: #23213d;
    }
    .activity-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .activity-list li {
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      color: #23213d;
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .activity-list li:last-child {
      border-bottom: none;
    }
    .activity-time {
      color: #6c6c80;
      font-size: 0.98rem;
      margin-left: 8px;
    }
    .view-link {
      color: #357afd;
      margin-left: auto;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.98rem;
      transition: color 0.2s;
    }
    .view-link:hover {
      color: #7c3aed;
      text-decoration: underline;
    }
  `]
})
export class DashboardComponent implements OnInit {
  userFirstName = '';
  userFullName = '';
  userInitials = '';
  stats = { sent: 4, received: 2, inTransit: 3 };
  trackId = '';
  trackResult = '';
  recentActivity = [
    { parcelId: 'IT-917FGH', status: 'In Transit', time: '2 min ago' },
    { parcelId: 'IT-123ABC', status: 'Delivered', time: '1 hr ago' },
    { parcelId: 'IT-456XYZ', status: 'Picked Up', time: '3 hrs ago' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userFirstName = user.firstName || '';
      this.userFullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      this.userInitials = (user.firstName?.[0] || '') + (user.lastName?.[0] || '');
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  trackParcel() {
    if (!this.trackId.trim()) {
      this.trackResult = 'Please enter a Parcel ID.';
      return;
    }
    // Simulate a track result
    if (this.trackId.trim().toUpperCase() === 'IT-917FGH') {
      this.trackResult = 'Parcel IT-917FGH is currently In Transit.';
    } else {
      this.trackResult = `No tracking information found for ${this.trackId.trim()}.`;
    }
  }
} 