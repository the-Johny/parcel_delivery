import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <div class="admin-dashboard-layout">
      <aside class="admin-sidebar">
        <div class="admin-sidebar-header">SendIT Admin</div>
        <nav class="admin-sidebar-nav">
          <a class="admin-nav-link active"><span class="icon">🏠</span> Dashboard</a>
          <a class="admin-nav-link"><span class="icon">📦</span> Parcels</a>
          <a class="admin-nav-link"><span class="icon">👥</span> Users</a>
          <a class="admin-nav-link"><span class="icon">📊</span> Reports</a>
        </nav>
        <div class="admin-sidebar-footer">
          <a class="admin-logout"><span class="icon">↩️</span> Logout</a>
        </div>
      </aside>
      <main class="admin-dashboard-main">
        <header class="admin-main-header">
          <h1>Dashboard</h1>
          <div class="admin-header-actions">
            <input class="admin-search" placeholder="Search..." />
            <span class="admin-welcome">Welcome, Admin!</span>
            <div class="admin-avatar">A</div>
          </div>
        </header>
        <section class="admin-stats-section">
          <div class="admin-stats-grid">
            <div class="admin-stat-card blue">
              <div class="admin-stat-icon">📬</div>
              <div class="admin-stat-label">Total Parcels</div>
              <div class="admin-stat-value">6</div>
            </div>
            <div class="admin-stat-card blue-light">
              <div class="admin-stat-icon">⏲️</div>
              <div class="admin-stat-label">In Transit</div>
              <div class="admin-stat-value">2</div>
            </div>
            <div class="admin-stat-card green">
              <div class="admin-stat-icon">✅</div>
              <div class="admin-stat-label">Delivered</div>
              <div class="admin-stat-value">2</div>
            </div>
            <div class="admin-stat-card yellow">
              <div class="admin-stat-icon">👤</div>
              <div class="admin-stat-label">Total Users</div>
              <div class="admin-stat-value">4</div>
            </div>
          </div>
        </section>
        <section class="admin-activity-section">
          <div class="admin-activity-card">
            <div class="admin-activity-title">Recent Activity</div>
            <table class="admin-activity-table">
              <thead>
                <tr>
                  <th>Parcel ID</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SIT001</td>
                  <td>Alice</td>
                  <td>Bob</td>
                  <td><span class="admin-status delivered">Delivered</span></td>
                  <td>2025-07-19</td>
                </tr>
                <tr>
                  <td>SIT002</td>
                  <td>Jane</td>
                  <td>Mike</td>
                  <td><span class="admin-status in-transit">In Transit</span></td>
                  <td>2025-07-18</td>
                </tr>
                <tr>
                  <td>SIT003</td>
                  <td>Sam</td>
                  <td>Chris</td>
                  <td><span class="admin-status delivered">Delivered</span></td>
                  <td>2025-07-17</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .admin-dashboard-layout {
      display: flex;
      min-height: 100vh;
      background: #f8fafc;
    }
    .admin-sidebar {
      width: 260px;
      background: #fff;
      border-right: 1px solid #ececec;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: 16px;
    }
    .admin-sidebar-header {
      padding: 32px 0 24px 0;
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      color: #7dd3fc;
      letter-spacing: 1px;
    }
    .admin-sidebar-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0;
    }
    .admin-nav-link {
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
    .admin-nav-link.active, .admin-nav-link:hover {
      background: #f3fafd;
      border-left: 4px solid #7dd3fc;
      color: #38bdf8;
    }
    .admin-sidebar-footer {
      padding: 0 32px;
    }
    .admin-logout {
      width: 100%;
      background: none;
      color: #23213d;
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
      text-decoration: none;
    }
    .admin-logout:hover {
      background: #f3fafd;
      color: #38bdf8;
    }
    .admin-dashboard-main {
      flex: 1;
      padding: 0 32px 32px 32px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .admin-main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px 0 0 0;
    }
    .admin-header-actions {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .admin-search {
      padding: 8px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      background: #f8fafc;
      outline: none;
    }
    .admin-welcome {
      font-size: 1.08rem;
      color: #23213d;
      font-weight: 500;
    }
    .admin-avatar {
      width: 38px;
      height: 38px;
      background: #bae6fd;
      color: #23213d;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
    }
    .admin-stats-section {
      margin-top: 18px;
    }
    .admin-stats-grid {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }
    .admin-stat-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      padding: 24px 32px;
      min-width: 200px;
      text-align: center;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .admin-stat-card.blue {
      border-left: 6px solid #7dd3fc;
    }
    .admin-stat-card.blue-light {
      border-left: 6px solid #bae6fd;
    }
    .admin-stat-card.green {
      border-left: 6px solid #bbf7d0;
    }
    .admin-stat-card.yellow {
      border-left: 6px solid #fef08a;
    }
    .admin-stat-icon {
      font-size: 2.2rem;
      margin-bottom: 6px;
    }
    .admin-stat-label {
      color: #6c6c80;
      font-size: 1.08rem;
      margin-bottom: 2px;
    }
    .admin-stat-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: #23213d;
    }
    .admin-activity-section {
      margin-top: 0;
    }
    .admin-activity-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      padding: 20px 28px 18px 28px;
    }
    .admin-activity-title {
      font-weight: 600;
      font-size: 1.15rem;
      margin-bottom: 10px;
      color: #23213d;
    }
    .admin-activity-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
    }
    .admin-activity-table th, .admin-activity-table td {
      padding: 10px 8px;
      text-align: left;
      border-bottom: 1px solid #f0f0f0;
      font-size: 1.05rem;
    }
    .admin-activity-table th {
      color: #6c6c80;
      font-weight: 600;
      background: #f8fafc;
    }
    .admin-status {
      display: inline-block;
      padding: 2px 12px;
      border-radius: 12px;
      font-size: 0.98rem;
      font-weight: 600;
      color: #fff;
    }
    .admin-status.delivered {
      background: #4ade80;
    }
    .admin-status.in-transit {
      background: #38bdf8;
    }
    @media (max-width: 900px) {
      .admin-dashboard-layout {
        flex-direction: column;
      }
      .admin-sidebar {
        width: 100%;
        flex-direction: row;
        border-right: none;
        border-bottom: 1px solid #ececec;
        padding-bottom: 0;
      }
      .admin-sidebar-header {
        padding: 16px;
        font-size: 1.2rem;
      }
      .admin-sidebar-nav {
        flex-direction: row;
        gap: 4px;
        padding: 0 8px;
      }
      .admin-nav-link {
        padding: 8px 12px;
        font-size: 1rem;
      }
      .admin-sidebar-footer {
        padding: 0 8px;
      }
    }
    @media (max-width: 600px) {
      .admin-dashboard-main {
        padding: 0 4px 16px 4px;
      }
      .admin-stats-grid {
        flex-direction: column;
        gap: 12px;
      }
      .admin-stat-card {
        min-width: unset;
        padding: 16px 8px;
      }
      .admin-activity-card {
        padding: 10px 2px 10px 2px;
      }
    }
  `]
})
export class AdminDashboardComponent {} 