import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { IListAttributes } from '@npm-bbta/bbog-dig-dt-sherpa-lib';
import { ReservationService } from '../../services/reservation/reservation.service';
import { ReservationReq } from '../../models/reservation-req.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-reservations',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './your-reservations.component.html',
  styleUrl: './your-reservations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YourReservationsComponent {

  public submitValid: boolean = false;
  public reservationsList: IListAttributes[] = [];
  private emailProvided: string = '';
  public messageNoReservations: string = '';

  private reservationsService = inject(ReservationService);
  private router = inject(Router);

  validateEmail(event: CustomEventInit) {
    if (event.detail.valid) {
      this.submitValid = true;
    } else {
      this.submitValid = false;
    }
    this.emailProvided = event.detail.value;
  }

  onConfirmClick() {
    this.loadReservations();
  }

  onBackClick() {
    this.router.navigate(['/movies']);
  }

  private loadReservations() {
    this.reservationsService.getReservationsByEmail(this.emailProvided).subscribe({
      next: (reservations) => {
        console.log(reservations.length);
        
        if(reservations.length === 0) {
          this.messageNoReservations = 'No hay reservas registradas';
        }
        
        this.reservationsList = reservations.map((reservation: ReservationReq, index: number) => ({
          id: index.toString(),
          subTitle: 'Reserva:',
          section: [
            { text: 'Película', value: reservation.movie, bold: true },
            { text: 'Sala', value: reservation.room, bold: true },
            { text: 'Horario', value: reservation.schedule, bold: true },
            { text: 'Asientos seleccionados', value: reservation.seats, bold: true },
            { text: 'Correo electrónico', value: reservation.email, bold: true }
          ]
        }));
      },
      error: (err) => console.error('Error cargando reservas', err)
    });
  }

}
