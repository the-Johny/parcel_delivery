import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
