import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  imports: [MovieListComponent],
  standalone: true,
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservationComponent {

  private router = inject(Router);
  
  public goToYourReservations(){
    this.router.navigate(['/your-reservations']);
  }

}
