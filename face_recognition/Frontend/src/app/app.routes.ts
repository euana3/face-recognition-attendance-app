import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./components/gallery/gallery').then((m) => m.Gallery),
  },
  {
    path: 'enroll',
    loadComponent: () =>
      import('./components/enroll/enroll').then((m) => m.Enroll),
  },
  {
    path: 'identify',
    loadComponent: () =>
      import('./components/identify/identify').then((m) => m.Identify),
  },
  {
    path: 'meeting-records',
    loadComponent: () =>
      import('./components/meeting-records/meeting-records').then(
        (m) => m.MeetingRecords
      ),
  },
];