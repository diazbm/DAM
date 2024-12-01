import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'device/:id',
    title: 'device',
    loadComponent: () => import('./dispositivo/dispositivo.page').then( m => m.DispositivoPage)
  },
  {
    path: '',
    redirectTo: 'home',
    title: 'home',
    pathMatch: 'full',
  },
];
