import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { IListAttributes } from '@npm-bbta/bbog-dig-dt-sherpa-lib';
import { MoviesService } from '../../services/movies/movies.service';
import { RoomsService } from '../../services/rooms/rooms.service';
import { ReservationService } from '../../services/reservation/reservation.service';

@Component({
  selector: 'app-summary',
  imports: [],
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SummaryComponent implements OnInit{

  private movieSelected: string = '';
  private roomSelected: string = '';
  private timeSelected: string = '';
  private seatsSelectedArray: string[] = [];
  private emailProvided: string = '';

  private moviesService = inject(MoviesService);
  private roomsService = inject(RoomsService);
  private reservationService = inject(ReservationService);

  ngOnInit(): void {
    this.moviesService.movieSelected$.subscribe((movie) => this.movieSelected = movie);
    this.roomsService.roomSelected$.subscribe((room) => this.roomSelected = room);
    this.reservationService.timeSelected$.subscribe((time) => this.timeSelected = time);
    this.reservationService.seatsSelectedArray$.subscribe((seats) => this.seatsSelectedArray = seats);
    this.reservationService.emailProvided$.subscribe((email) => this.emailProvided = email);
    this.getSummaryList();
  }

  public getSummaryList(): IListAttributes[] {
		return [
			{
				id: '0',
				subTitle: 'Confirma la información de tu reserva:',
				section: [
					{
						text: 'Película',
						value: this.movieSelected,
						bold: true,
					},
					{
						text: 'Sala',
						value: this.roomSelected,
            bold: true
					},
					{
						text: 'Horario',
						value: this.timeSelected,
            bold: true
					},
					{
						text: 'Asientos seleccionados',
            value: this.seatsSelectedArray.join(', '),
            bold: true
					},
          {
            text: 'Correo electrónico',
            value: this.emailProvided,
            bold: true
          }
				],
			},
		];
	}

}
