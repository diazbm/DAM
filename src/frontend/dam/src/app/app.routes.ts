import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'device/:deviceId',
    title: 'device',
    loadComponent: () => import('./device/device.page').then( m => m.DevicePage)
  },
  {
    path: 'measurements/:deviceId',
    title: 'measurements',
    loadComponent: () => import('./measurements/measurements.page').then( m => m.MeasurementsPage)
  },
  {
    path: '',
    redirectTo: 'home',
    title: 'home',
    pathMatch: 'full',
  },
];
