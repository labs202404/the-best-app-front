import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadComponent: () => import('./sign-up/sign-up.component').then(m => m.SignUpComponent),
  },
  {
    path: 'signin',
    loadComponent: () => import('./sign-in/sign-in.component').then(m => m.SignInComponent),
  },
  {
    path: 'files',
    loadComponent:() => import('./files/files.component').then(m => m.FilesComponent),
  },
  {
    path: 'files/edit',
    loadComponent:() => import('./files/edit/edit.component').then(m => m.FilesEditComponent),
  },
];
