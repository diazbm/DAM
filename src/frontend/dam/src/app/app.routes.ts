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
    path: 'logs/:deviceId/:electrovalveId',
    title: 'logs',
    loadComponent: () => import('./logs/irrigation-logs.page').then( m => m.IrrigationLogsPage)
  },
  {
    path: '',
    redirectTo: 'home',
    title: 'home',
    pathMatch: 'full',
  },
];
