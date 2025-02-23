import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-reservation',
  imports: [MovieListComponent],
  standalone: true,
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservationComponent {
  
}
