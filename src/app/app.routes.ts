import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./main-page/main-page.component').then((c) => c.MainPageComponent)
    },
    {
        path: 'edit',
        loadComponent: () => import('./edit-page/edit-page.component').then((c) => c.EditPageComponent)
    }
];
