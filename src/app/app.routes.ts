import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
    },
    {
        path: 'movies',
        loadComponent: () => import('./screens/reservation/reservation.component').then((c) => c.ReservationComponent),
    },
    {
        path: 'rooms',
        loadComponent: () => import('./screens/rooms/rooms.component').then((c) => c.RoomsComponent),
    },
    {
        path: 'summary',
        loadComponent: () => import('./screens/summary/summary.component').then((c) => c.SummaryComponent),
    },
    {
        path: '**',
        redirectTo: 'movies'
    },
];
